# Component Architecture

md3 라이브러리의 컴포넌트 설계 원칙.



## 1. DOM 레이어 구조

컴포넌트는 최대 3가지 레이어로 구성된다. 각 레이어는 역할이 분리되어 독립적으로 제어된다.

```html
<Component>       <!-- 최상위 요소: 크기·이벤트·레이아웃 기준점 -->
  <Container />   <!-- 배경: background-color, border, border-radius -->
  <StateLayer />  <!-- 오버레이: hover/focus/active 색상, ripple 클리핑 -->
  <Content />     <!-- 콘텐츠: 텍스트, 아이콘 등 실제 내용 -->
</Component>
```

#### 최상위 요소

컴포넌트의 루트 DOM 요소. 크기, 레이아웃, 이벤트를 담당한다.

- `position: relative` 필수 — Container와 StateLayer의 절대 위치 기준점
- `overflow` 없음 — focus ring(`outline`)과 최소 터치 타겟(`::after`)이 바깥으로 나갈 수 있어야 함
- 인터랙티브 컴포넌트는 상태(hover/focus/active)의 source이기도 함

#### Container

배경색, 테두리 등 비주얼 표면을 담당한다.

- 구현 방식은 컴포넌트 구조에 따라 결정한다:
  - 최상위 요소가 크기를 결정하고 배경이 덮이는 경우 → `position: absolute; inset: 0` (Button, FAB 등)
  - Container 자체가 레이아웃에 참여하는 경우 → 일반 흐름(normal flow) 요소 (NavigationBar.Item 등)
- `overflow: hidden` — 배경이 border-radius 바깥으로 나가지 않게 클리핑

#### StateLayer

hover/focus/active 오버레이와 ripple 애니메이션을 담당한다. 인터랙티브 컴포넌트에만 포함된다.

```css
.md3-state-layer {
    position: absolute;
    inset: 0;
    overflow: clip;        /* ripple을 shape 안에 가둠 */
    pointer-events: none;
}
```

- focus ring(`outline`)은 `overflow` 영향을 받지 않으므로 StateLayer에 정의해도 바깥으로 나감

#### Content

실제 콘텐츠(텍스트, 아이콘 등). `z-index` 없이도 Container/StateLayer 위에 표시된다 (stacking context 순서).



## 2. 컴포넌트 유형

컴포넌트는 상호작용 여부에 따라 두 가지로 나뉜다.

### 인터랙티브 컴포넌트

사용자가 직접 조작하는 컴포넌트. `<button>`, `<a>` 등 포커스·클릭 가능한 요소가 최상위에 온다.

**포함 레이어**: 최상위 요소 + Container + **StateLayer** + Content

**클래스 구성**:

| 클래스 | 역할 | 필수 |
|---|---|:---:|
| `md3-interactive` | StateLayer 연결, `outline` 제거 등 상호작용 공통 스타일 | ✓ |
| `md3-{name}` | 컴포넌트 전용 스타일 (예: `md3-button`) | ✓ |
| `md3-min-touch-target` | `::after`로 48dp 최소 터치 타겟 확보 | 상황에 따라 |

```tsx
<button className="md3-interactive md3-button md3-min-touch-target">
    <span className="md3-button__container" />
    {children}
    <StateLayer className="md3-button__state-layer" />
</button>
```

예: Button, FAB, IconButton, Chip (action), NavigationBar.Item

#### 상태 표현

JS className 조작 없이 HTML 속성으로 상태를 표현한다.

```tsx
<button
    aria-pressed={isToggle ? selected : undefined}
    aria-disabled={disabled ? "true" : undefined}
    data-size="sm"
    data-shape="round"
    data-color="filled"
/>
```

- `aria-*`: 접근성 의미를 가지는 상태 (pressed, disabled 등)
- `data-*`: 비주얼 변형 (size, shape, color 등)

#### StateLayer 상태 선택자

`md3-interactive` 클래스가 StateLayer 연결의 기준점이 된다. `*:has(> .md3-state-layer)` 대신 명시적인 클래스 선택자를 사용함으로써 의도치 않은 요소에 스타일이 적용되는 것을 방지한다.

```css
.md3-interactive {
    outline: none; /* 브라우저 기본 outline 제거, StateLayer에서 직접 그림 */

    &:hover > .md3-state-layer {
        background-color: color-mix(in oklab, currentcolor 8%, transparent);
    }
    &:focus-visible > .md3-state-layer {
        background-color: color-mix(in oklab, currentcolor 10%, transparent);
        outline: var(--md-sys-color-secondary) solid 3px;
        outline-offset: 3px;
    }
    &:active > .md3-state-layer:not([data-ripple="true"]) {
        background-color: color-mix(in oklab, currentcolor 10%, transparent);
    }
}
```

> `currentcolor` 기반 오버레이는 텍스트 색상(= 대부분 MD3 color role의 "on-" 색상)과 일치하는 경우에만 정확하다. 오버레이 색상이 텍스트 색상과 달라야 하는 케이스에서는 별도 처리가 필요하다.

#### 최소 터치 타겟

48×48dp 최소 터치 타겟은 `::after` 가상 요소로 구현한다. `md3-min-touch-target` 클래스를 추가하면 적용된다.

```css
.md3-min-touch-target::after {
    content: "";
    position: absolute;
    min-width: 48px;
    min-height: 48px;
    inset: 50%;
    translate: -50% -50%;
}
```

최상위 요소에 `overflow` 없으므로 `::after`가 border-radius에 잘리지 않는다.

### 비인터랙티브 컴포넌트

표시만 하는 컴포넌트. 포커스·클릭이 없으므로 StateLayer가 없고, `md3-interactive`도 적용하지 않는다.

**포함 레이어**: 최상위 요소 + (Container) + Content

**클래스 구성**:

| 클래스 | 역할 | 필수 |
|---|---|:---:|
| `md3-{name}` | 컴포넌트 전용 스타일 (예: `md3-badge`) | ✓ |

```tsx
<span className="md3-badge">
    {children}
</span>
```

예: Badge, Divider, Tooltip (plain), ProgressIndicator



## 3. CSS 우선순위 전략: @layer 계층

명시도(specificity) 충돌을 방지하기 위해 CSS를 서브 레이어로 분리한다.
같은 `@layer` 블록 안에서 서브 레이어를 선언하면, **명시도와 무관하게** 선언 순서가 우선순위를 결정한다.

```css
@layer md3-components {
    /* 서브 레이어 순서 선언 — 뒤에 올수록 강함 */
    @layer base, variants, states, group-overrides;

    /* base: 컴포넌트 기본 레이아웃 */
    @layer base {
        .md3-button { position: relative; display: inline-flex; }
    }

    /* variants: data-*/aria-* 속성에 따른 비주얼 변형 */
    @layer variants {
        .md3-button[data-size="sm"] { height: 2.5rem; padding-inline: 1rem; }
        .md3-button[data-color="filled"] { color: var(--md-sys-color-on-primary); }
    }

    /* states: :hover, :active, :focus-visible 등 인터랙션 상태 */
    @layer states {
        .md3-button:active { --_button-radius: var(--md-sys-shape-corner-small); }
    }

    /* group-overrides: 부모 컴포넌트(ButtonGroup 등)가 자식을 덮어쓰는 값 */
    @layer group-overrides {
        /* states보다 항상 강함 — 명시도 무관 */
        .md3-button-group > .md3-button:first-child > .md3-button__container {
            border-start-end-radius: var(--md-sys-shape-corner-extra-small);
            border-end-end-radius:   var(--md-sys-shape-corner-extra-small);
        }
    }
}
```

이 방식을 사용하면:
- `:active`가 아무리 높은 명시도를 가져도 `group-overrides`가 항상 이김
- 새 상태를 추가할 때 명시도 충돌을 계산할 필요 없이 적절한 레이어에 넣으면 끝




## 4. 설계 원칙 요약

1. **DOM 레이어 분리**: Container(배경) / StateLayer(오버레이) / Content(콘텐츠)는 역할이 분리되어 독립적으로 제어 가능
2. **overflow는 레이어별로**: StateLayer는 `overflow: clip`, 최상위 요소는 overflow 없음
3. **상태는 속성으로**: `aria-*`(의미 있는 상태), `data-*`(비주얼 변형), JS className 조작 없음
4. **`md3-interactive` 클래스**: 모든 인터랙티브 컴포넌트 루트에 적용 — StateLayer 연결의 기준점. non-interactive 컴포넌트(Badge, Divider 등)에는 불필요. 새 컴포넌트 추가 시 필수 체크 항목
5. **CSS 우선순위는 서브 레이어로**: `base → variants → states → group-overrides` 순서로 명시도 충돌 없이 계층 관리
6. **전역 @layer 순서**: `md3-tokens → md3-core → md3-components`로 소비자 스타일보다 항상 낮은 우선순위 유지
