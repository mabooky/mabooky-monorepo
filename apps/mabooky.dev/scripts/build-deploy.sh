#!/bin/bash
set -euo pipefail

# 작업 디렉터리를 스크립트의 부모 디렉터리(apps/mabooky.dev)로 고정
cd "$(dirname "$0")/.."

# 로그 색상 및 포맷 정의
CYAN='\033[0;36m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

log_step() {
  echo -e "\n${CYAN}====================================================${NC}"
  echo -e "${CYAN}▶ $1${NC}"
  echo -e "${CYAN}====================================================${NC}"
}

log_step "1. Building mabooky.dev (Host)..."
pnpm run build

log_step "2. Building galerie-de-bal (Sub-app)..."
pnpm --filter galerie-de-bal build

log_step "3. Assembling sub-applications into mabooky.dev/out..."

# galerie-de-bal 복사 및 검증
if [ -d "../galerie-de-bal/out" ]; then
  mkdir -p out/works/galerie-de-bal
  cp -r ../galerie-de-bal/out/* out/works/galerie-de-bal/
  echo "✔ galerie-de-bal merged into out/works/galerie-de-bal"
else
  echo -e "${RED}✘ Error: ../galerie-de-bal/out directory not found!${NC}" >&2
  exit 1
fi

# the-mary-run 복사 및 검증
if [ -d "../the-mary-run" ]; then
  mkdir -p out/works/the-mary-run
  cp -r ../the-mary-run/* out/works/the-mary-run/
  echo "✔ the-mary-run merged into out/works/the-mary-run"
else
  echo -e "${RED}✘ Error: ../the-mary-run directory not found!${NC}" >&2
  exit 1
fi

log_step "4. Generating Cloudflare Pages _redirects rules..."
cat << 'EOF' > out/_redirects
/works/galerie-de-bal /works/galerie-de-bal/index.html 200
/works/galerie-de-bal/gallery /works/galerie-de-bal/gallery/index.html 200
/works/the-mary-run /works/the-mary-run/index.html 200
EOF
echo "✔ Cloudflare _redirects file generated"

echo -e "\n${GREEN}====================================================${NC}"
echo -e "${GREEN}✔ Deployment assembly completed in apps/mabooky.dev/out!${NC}"
echo -e "${GREEN}====================================================${NC}\n"
