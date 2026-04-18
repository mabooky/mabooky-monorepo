# Button 컴포넌트
Material Design 3의 Button 컴포넌트 구현.



## 1. Overview
Button은 Default button(일반 버튼)과 Toggle button(토글 버튼)으로 구분됨. Button은 Container, Label text, Icon(optional)로 이루어져 있음.

Button에 대해 설정할 수 있는 요소는 Size, Shape, Color이 있음.
Size: XS, S(기본값), M, L, XL
Shape: Round(기본값), Square
Color: Elevated, Filled(기본값), Tonal, Outlined, Text

또한, Color이 Text인 Button은 토글 버튼을 지원하지 않음.(오직 일반 버튼만 지원함)



## 2. Props

| Prop     | Type                                                      | Default value | Description                                                  |
| :------- | --------------------------------------------------------- | ------------- | ------------------------------------------------------------ |
| asChild  | boolean                                                   | false         | HTML 태그 다형성을 지원하기 위한 prop으로, 참인 경우 모든 속성을 자식 컴포넌트에게 위임함. |
| size     | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'                      | 'sm'          |                                                              |
| shape    | 'round' \| 'square'                                       | 'round'       |                                                              |
| color    | 'elevated' \| 'filled' \| 'tonal' \| 'outlined' \| 'text' | 'filled'      |                                                              |
| selected | boolean                                                   | undefined     | 버튼이 선택되었는지 여부. 만약 사용자가 명시하지 않아 undefined 값이 들어올 경우, 일반 버튼으로 간주하고, boolean 값이 들어오면 토글 버튼으로 간주하도록 구현. |
| ripple   | boolean                                                   | false         | Button 내부의 상태 레이어에 ripple 효과를 사용할지 여부.     |



## 3. Example

```tsx
<Button
    asChild
    size="md"
    shape="square"
    color="elevated"
    ripple
>
    <a href="...">
    	<Button.Icon>login</Button.Icon>
        로그인
    </a>
</Button>

<Button
    size="xl"
    shape="round"
    color="filled"
    selected={isPlaying}
    ripple
>
    <Button.Icon>{isPlaying ? "pause" : "play_arrow"}</Button.Icon>
    {isPlaying ? "일시정지" : "재생"}
</Button>
```





## 4. Visual Spec

- Color - Elevated

  |                   | Enabled, Default button            | Enabled, Unselected                | Enabled, Selected       | Disabled                       |
  | ----------------- | ---------------------------------- | ---------------------------------- | ----------------------- | ------------------------------ |
  | 컨테이너 색상     | md.sys.color.surface-container-low | md.sys.color.surface-container-low | md.sys.color.primary    | md.sys.color.on-surface / 0.1  |
  | 그림자            | md.sys.elevation.level1            | md.sys.elevation.level1            | md.sys.elevation.level1 | 없음                           |
  | 라벨, 아이콘 색상 | md.sys.color.primary               | md.sys.color.primary               | md.sys.color.on-primary | md.sys.color.on-surface / 0.38 |


- Color - Filled

  |                   | Enabled, Default button | Enabled, Unselected             | Enabled, Selected       | Disabled                       |
  | ----------------- | ----------------------- | ------------------------------- | ----------------------- | ------------------------------ |
  | 컨테이너 색상     | md.sys.color.primary    | md.sys.color.surface-container  | md.sys.color.primary    | md.sys.color.on-surface / 0.1  |
  | 라벨, 아이콘 색상 | md.sys.color.on-primary | md.sys.color.on-surface-variant | md.sys.color.on-primary | md.sys.color.on-surface / 0.38 |

- Color - Tonal

  |                   | Enabled, Default button             | Enabled, Unselected                 | Enabled, Selected         | Disabled                       |
  | ----------------- | ----------------------------------- | ----------------------------------- | ------------------------- | ------------------------------ |
  | 컨테이너 색상     | md.sys.color.secondary-container    | md.sys.color.secondary-container    | md.sys.color.secondary    | md.sys.color.on-surface / 0.1  |
  | 라벨, 아이콘 색상 | md.sys.color.on-secondary-container | md.sys.color.on-secondary-container | md.sys.color.on-secondary | md.sys.color.on-surface / 0.38 |

- Color - Outlined

  |                   | Enabled, Default button         | Enabled, Unselected             | Enabled, Selected               | Disabled                                                     |
  | ----------------- | ------------------------------- | ------------------------------- | ------------------------------- | ------------------------------------------------------------ |
  | 컨테이너 색상     | 없음                            | 없음                            | md.sys.color.inverse-surface    | Default button, Unselected: 없음<br />Selected: md.sys.color.on-surface / 0.1 |
  | 테두리 색상       | md.sys.color.outline-variant    | md.sys.color.outline-variant    | 없음                            | Default button, Unselected: md.sys.color.outline-variant<br />Selected: 없음 |
  | 라벨, 아이콘 색상 | md.sys.color.on-surface-variant | md.sys.color.on-surface-variant | md.sys.color.inverse-on-surface | md.sys.color.on-surface / 0.38                               |

- Color - Text

  |               | Enabled              | Disabled                       |
  | ------------- | -------------------- | ------------------------------ |
  | 컨테이너 색상 | 없음                 | md.sys.color.on-surface / 0.1  |
  | 테두리 색상   | md.sys.color.primary | md.sys.color.on-surface / 0.38 |

- Size - Xsmall
    - 컨테이너 높이: 32dp
    - Outlined 버튼인 경우 테두리 굵기: 1dp
    - 라벨 타이포그래피: md.sys.typescale.label-large
    - 아이콘 크기: 20dp
    - 컨테이너 수평축 안쪽 여백: 12dp
    - 아이콘 있을 시 아이콘과 라벨 간격: 4dp
    - Pressed 상태 모서리 둥글기: md.sys.shape.corner.small
    - 모서리 둥글기 변화 애니메이션: md.sys.motion.spring.fast.spatial
    - Shape: Round
        - 컨테이너 모서리 둥글기: md.sys.shape.corner.full
        - 선택된 토글 버튼 컨테이너 모서리 둥글기: md.sys.shape.corner.medium
    - Shape: Square
        - 컨테이너 모서리 둥글기: md.sys.shape.corner.medium
        - 선택된 토글 버튼 컨테이너 모서리 둥글기: md.sys.shape.corner.full
- Size - Small
    - 컨테이너 높이: 40dp
    - Outlined 버튼인 경우 테두리 굵기: 1dp
    - 라벨 타이포그래피: md.sys.typescale.label-large
    - 아이콘 크기: 20dp
    - 컨테이너 수평축 안쪽 여백: 16dp
    - 아이콘 있을 시 아이콘과 라벨 간격: 8dp
    - Pressed 상태 모서리 둥글기: md.sys.shape.corner.small
    - 모서리 둥글기 변화 애니메이션: md.sys.motion.spring.fast.spatial
    - Shape: Round
        - 컨테이너 모서리 둥글기: md.sys.shape.corner.full
        - 선택된 토글 버튼 컨테이너 모서리 둥글기: md.sys.shape.corner.medium
    - Shape: Square
        - 컨테이너 모서리 둥글기: md.sys.shape.corner.medium
        - 선택된 토글 버튼 컨테이너 모서리 둥글기: md.sys.shape.corner.full
- Size - Medium
    - 컨테이너 높이: 56dp
    - Outlined 버튼인 경우 테두리 굵기: 1dp
    - 라벨 타이포그래피: md.sys.typescale.title-medium
    - 아이콘 크기: 24dp
    - 컨테이너 수평축 안쪽 여백: 24dp
    - 아이콘 있을 시 아이콘과 라벨 간격: 8dp
    - Pressed 상태 모서리 둥글기: md.sys.shape.corner.medium
    - 모서리 둥글기 변화 애니메이션: md.sys.motion.spring.fast.spatial
    - Shape: Round
        - 컨테이너 모서리 둥글기: md.sys.shape.corner.full
        - 선택된 토글 버튼 컨테이너 모서리 둥글기: md.sys.shape.corner.large
    - Shape: Square
        - 컨테이너 모서리 둥글기: md.sys.shape.corner.large
        - 선택된 토글 버튼 컨테이너 모서리 둥글기: md.sys.shape.corner.full
- Size - Large
    - 컨테이너 높이: 96dp
    - Outlined 버튼인 경우 테두리 굵기: 2dp
    - 라벨 타이포그래피: md.sys.typescale.headline-small
    - 아이콘 크기: 32dp
    - 컨테이너 수평축 안쪽 여백: 48dp
    - 아이콘 있을 시 아이콘과 라벨 간격: 12dp
    - Pressed 상태 모서리 둥글기: md.sys.shape.corner.large
    - 모서리 둥글기 변화 애니메이션: md.sys.motion.spring.fast.spatial
    - Shape: Round
        - 컨테이너 모서리 둥글기: md.sys.shape.corner.full
        - 선택된 토글 버튼 컨테이너 모서리 둥글기: md.sys.shape.corner.extra-large
    - Shape: Square
        - 컨테이너 모서리 둥글기: md.sys.shape.corner.extra-large
        - 선택된 토글 버튼 컨테이너 모서리 둥글기: md.sys.shape.corner.full
- Size - Xlarge
    - 컨테이너 높이: 136dp
    - Outlined 버튼인 경우 테두리 굵기: 3dp
    - 라벨 타이포그래피: md.sys.typescale.headline-large
    - 아이콘 크기: 40dp
    - 컨테이너 수평축 안쪽 여백: 64dp
    - 아이콘 있을 시 아이콘과 라벨 간격: 16dp
    - Pressed 상태 모서리 둥글기: md.sys.shape.corner.large
    - 모서리 둥글기 변화 애니메이션: md.sys.motion.spring.fast.spatial
    - Shape: Round
        - 컨테이너 모서리 둥글기: md.sys.shape.corner.full
        - 선택된 토글 버튼 컨테이너 모서리 둥글기: md.sys.shape.corner.extra-large
    - Shape: Square
        - 컨테이너 모서리 둥글기: md.sys.shape.corner.extra-large
        - 선택된 토글 버튼 컨테이너 모서리 둥글기: md.sys.shape.corner.full



## 5. Constraints
- 가로 48px, 세로 48px의 최소 터치 타겟을 준수해야 함.
- 스크린리더에서도 올바르게 읽을 수 있도록 접근성을 준수해야 함.