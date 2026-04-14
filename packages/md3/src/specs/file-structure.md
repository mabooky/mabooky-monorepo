# File Structure
본 라이브러리(packages/md3 이하의 md3 라이브러리)의 파일 관리 구조에 대해 설명함.

## 공통
이 라이브러리에서는 모든 react 컴포넌트를 data-* 속성 선택자를 사용한 스타일링 방식을 사용함. 따라서 각 컴포넌트에 해당하는 CSS 파일을 컴포넌트 .tsx 파일과 같은 폴더에 함께 배치. 예를 들어 StateLayer.tsx와 state-layer.css를 함께 배치.

## src/components
본 라이브러리는 Material Design 3를 구현한 라이브러리로, 사용자가 직접 가져다 쓸 컴포넌트들(버튼, 체크박스, 모달 팝업 등)을 src/components 디렉터리 밑에 배치.

## src/core
Material Design 3의 기초 개념들(elevation, shape 등)과 컴포넌트들을 구현하기 위한 조립 블록들(State layer 등)을 배치.

## src/index.ts
이 파일은 라이브러리의 내보내기를 정의하며, 사용자가 가져다 쓸 수 있도록 각 파일에 대해 일일이 export 처리를 해야 함.

## src/md3.css
이 파일은 라이브러리 CSS 스타일에 대한 main 진입점이 되는 파일로, 올바른 절차에 따라 각 CSS 파일들을 import 하고 있음.