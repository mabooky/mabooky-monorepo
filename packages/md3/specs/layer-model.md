# Interactive Component Layer Model

md3 라이브러리의 인터랙티브 컴포넌트 설계 원칙.



## 1. 기본 구조

모든 인터랙티브 컴포넌트는 다음 세 레이어로 구성된다.

```
<interactive-element>     ← 최상위, 인터랙션 수신, 상태 source
  <Container />           ← 비주얼 배경 (background-color, border-radius)
  <StateLayer />          ← hover/focus/active/ripple 오버레이
  <Content />             ← 실제 콘텐츠 (icon, label 등)
</interactive-element>
```

각 레이어는 역할이 분리되어 있어 독립적으로 제어 가능하다.



## 2. 레이어별 역할과 CSS 규칙

### 최상위 요소 (interactive element)

- 인터랙션 이벤트를 수신하는 실제 DOM 요소 (`<button>`, `<a>` 등)
- `position: relative` 필수 (Container, StateLayer의 기준점)
- `overflow` 없음 → focus ring(`outline`)과 최소 터치 타겟(`::after`)이 바깥으로 나갈 수 있음
- 상태(hover/focus/active)의 source

### Container

```css
.md3-component__container {
    position: absolute;
    inset: 0;
    /* border-radius는 패턴에 따라 결정 (아래 섹션 참고) */
}
```

- `background-color`, `border` 등 비주얼 배경 담당
- `overflow: hidden`으로 배경이 border-radius 바깥으로 나가지 않게 제한

### StateLayer

```css
.md3-state-layer {
    position: absolute;
    inset: 0;
    overflow: clip;   /* ripple을 shape 안에 가둠 */
}
```

- hover/focus/active 오버레이 색상 표시
- ripple 애니메이션 클리핑
- focus ring(`outline`)은 overflow 영향을 받지 않으므로 StateLayer에 정의해도 바깥으로 나감

### Content

- 일반 흐름(normal flow) 요소
- `z-index` 없이도 Container/StateLayer 위에 표시됨 (stacking context 순서)



## 3. 상태 스타일링 원칙

### data-* / aria-* 속성으로 CSS 제어

JS className 조작 없이 HTML 속성으로 상태를 표현한다.

```tsx
// React
<button
    aria-pressed={isToggle ? selected : undefined}
    aria-disabled={disabled ? "true" : undefined}
    data-size="sm"
    data-shape="round"
    data-color="filled"
>
```

```css
/* CSS */
.md3-button[aria-pressed="true"] { ... }
.md3-button[aria-disabled="true"] { pointer-events: none; ... }
.md3-button[data-size="sm"] { height: 2.5rem; }
```

- `aria-*`: 접근성 의미를 가지는 상태 (pressed, disabled 등)
- `data-*`: 비주얼 변형 (size, shape, color 등)

### StateLayer 상태 선택자

StateLayer는 직계 부모(최상위 요소)의 상태를 읽는다.

```css
*:has(> .md3-state-layer) {
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



## 4. border-radius 공유

Container와 StateLayer가 모두 존재하고 같은 `border-radius`를 가져야 하는 경우, `--_component-radius` 커스텀 프로퍼티를 최상위 요소에서 정의하고 두 레이어가 이를 소비한다.

```css
/* shape 정의: 최상위 요소에서 커스텀 프로퍼티로 */
.md3-button[data-size="sm"][data-shape="round"] {
    --_button-radius: calc(20 / 16 * 1rem);
}
.md3-button[data-size="sm"]:active:not([aria-disabled="true"]) {
    --_button-radius: var(--md-sys-shape-corner-small);
}

/* shape 소비: Container와 StateLayer가 멀티 셀렉터로 동일한 값을 참조 */
.md3-button > .md3-button__container,
.md3-button > .md3-button__state-layer {
    border-radius: var(--_button-radius);
}
```

> `--_` prefix는 라이브러리 내부 전용 변수임을 관례적으로 표시한다.



## 5. 최소 터치 타겟

48×48dp 최소 터치 타겟은 `::after` 가상 요소로 구현한다.

```css
.md3-min-touch-target {
    position: relative;

    &::after {
        content: "";
        position: absolute;
        min-width: 48px;
        min-height: 48px;
        inset: 50%;
        transform: translate(-50%, -50%);
    }
}
```

최상위 요소에 `overflow` 없으므로 `::after`가 border-radius에 잘리지 않는다.



## 6. 설계 원칙 요약

1. **레이어 분리**: Container(배경) / StateLayer(오버레이) / Content(콘텐츠)는 독립적으로 동작
2. **overflow는 레이어별로**: StateLayer는 `overflow: clip`, 최상위 요소는 overflow 없음
3. **상태는 속성으로**: `aria-*`(의미 있는 상태), `data-*`(비주얼 변형)
4. **border-radius 공유**: Container와 StateLayer가 모두 존재하고 같은 `border-radius`를 가져야 하는 경우, `--_component-radius` 커스텀 프로퍼티를 사용한다
5. **CSS @layer**: `@layer md3-core`, `@layer md3-components`로 소비자 스타일보다 항상 낮은 우선순위 유지
