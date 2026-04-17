# Plain Tooltip
Material Design 3의 Tooltip 컴포넌트 중 Plain variant에 대한 구현 PlainTooltip.

## 1. Anatomy & Configuration
Plain tooltip은 supporting text와 container로 이루어져 있음.

## 2. Props
| Prop     | Type     | Default value | Description                                                  |
| :------- | -------- | ------------- | ------------------------------------------------------------ |
| text     | string   | ''            | 툴팁에 표시할 텍스트. 필수 prop. |
| position | 'top' \| 'bottom' \| 'left' \| 'right' | 'top'         | 툴팁이 참조 요소에 상대적으로 표시될 위치. |

## 3. Visual Spec
- container
    - 색상: md.sys.color.inverse-surface
    - 모서리 둥글기: md.sys.shape.corner.extra-small
- supporting text
    - 색상: md.sys.color.inverse-on-surface
    - 줄높이: 16dp
    - 글자 크기: 12dp
    - 글꼴 weight: 400
    - 자간: 0.4dp

## 4. Constraints
- 툴팁은 참조 요소에 상대적으로 표시되어야 하며, position prop에 따라 top, bottom, left, right 중 하나의 위치에 배치되어야 한다.
- 툴팁의 텍스트는 단일 줄로 표시되어야 하며, 텍스트가 길어지는 경우에는 말줄임표(...)로 표시되어야 한다.
- 툴팁은 참조 요소와 충분한 간격을 유지해야 하며, 화면 가장자리와 겹치지 않도록 해야 한다.
- 툴팁은 화면 크기에 따라 적절하게 크기가 조정되어야 하며, 텍스트가 잘리지 않도록 해야 한다.