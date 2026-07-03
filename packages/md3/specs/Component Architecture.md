# DOM 레이어 구조
MD3 라이브러리의 컴포넌트는 역할이 엄격하게 분리된 최대 세 개의 DOM 레이어로 구성된다. 최상위 요소는 크기, 레이아웃, 이벤트를 제어하며 포커스 링이나 터치 타겟이 잘리지 않도록 오버플로우 속성을 지정하지 않는다. 컨테이너 레이어는 배경색과 테두리 등의 비주얼 표면을 담당하며 내부 요소가 곡률을 벗어나지 않도록 오버플로우를 제어한다. 상태 레이어는 호버, 포커스, 액티브 상태의 오버레이와 리플 애니메이션을 전담하며 리플 효과가 밖으로 새어나가지 않도록 클리핑 속성을 적용한다. 콘텐츠 레이어는 텍스트나 아이콘 등의 실제 데이터 영역으로 제트 인덱스 지정 없이도 쌓임 문맥에 따라 자연스럽게 최상단에 렌더링된다.

```html
<Component>
  <Container />
  <StateLayer />
  <Content />
</Component>
```

# 인터랙티브 컴포넌트 클래스
사용자가 직접 조작할 수 있는 인터랙티브 컴포넌트는 상태 레이어를 필수적으로 포함하며 특정 클래스 명명 규칙을 따른다. 모든 인터랙티브 컴포넌트의 루트 요소에는 md3-state-source 클래스를 부여하여 상태 레이어와의 연결 및 공통 상호작용 스타일을 지정한다. 이와 함께 컴포넌트 고유의 스타일을 위한 클래스를 추가한다. 모바일 환경을 고려하여 48dp 크기의 최소 터치 타겟 확보가 필요한 경우에는 md3-min-touch-target 클래스를 조합하여 가상 요소로 터치 영역을 확장한다.

```tsx
<button className="md3-state-source md3-button md3-min-touch-target">
    <span className="md3-button__container" />
    {children}
    <StateLayer className="md3-button__state-layer" />
</button>
```

# 상태 표현 속성
상태 변화에 따른 렌더링은 자바스크립트를 통한 클래스 조작을 배제하고 오직 HTML 표준 속성을 통해 제어한다. 컴포넌트의 논리적 의미를 내포하는 활성화 여부나 비활성화 상태 등은 aria 속성을 사용하여 접근성을 확보한다. 반면 크기, 형태, 색상 등 시각적 변형에 관련된 상태는 data 속성을 사용하여 컴포넌트의 구조적 상태와 렌더링 규칙을 명확하게 분리한다.

```tsx
<button
    aria-pressed={isToggle ? selected : undefined}
    aria-disabled={disabled ? "true" : undefined}
    data-size="sm"
    data-shape="round"
    data-color="filled"
/>
```

# 비인터랙티브 컴포넌트
정보를 단순 표시하는 비인터랙티브 컴포넌트는 포커스와 클릭 이벤트를 수신하지 않으므로 상태 레이어를 포함하지 않는다. 따라서 루트 요소에 md3-state-source 클래스를 적용하지 않으며 오직 해당 컴포넌트의 시각적 형태를 정의하는 고유 클래스만을 부여한다. 뱃지나 구분선 등이 이에 해당하며 이들은 부모 요소의 상호작용 상태에 간접적으로 영향을 받을 수는 있으나 스스로 상태를 발산하지는 않는다.

```tsx
<span className="md3-badge">
    {children}
</span>
```

# CSS 서브 레이어와 명시도
CSS 명시도 충돌을 원천 차단하기 위해 모든 컴포넌트 스타일은 레이어 계층으로 엄격히 분리하여 선언한다. 기본 레이아웃은 base 레이어에 선언하고 속성 기반의 시각적 변형은 variants 레이어에 선언한다. 호버나 포커스 등의 인터랙션 상태는 states 레이어에 할당하며 부모 컴포넌트가 자식의 스타일을 덮어써야 하는 특수 상황은 group-overrides 레이어에 선언한다. 이를 통해 명시도와 무관하게 선언 순서만으로 디자인 오버라이딩 우선순위가 결정되도록 설계한다.

```css
@layer md3-components {
    @layer base, variants, states, group-overrides;

    @layer base {
        .md3-button { position: relative; display: inline-flex; }
    }
}
```
