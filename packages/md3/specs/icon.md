# Icon 컴포넌트

md3 라이브러리에서 Material Symbols를 렌더링하기 위한 Icon 컴포넌트.



## 1. Overview

라이브러리 사용자는 빠른 로딩 속도와 네트워크 사이즈 절감을 위해 일반적으로 Google Fonts에서 제공하는 Material Symbols 스타일시트를 사용하게 된다. 문제는 라이브러리에서 사용자가 어떤 스타일(Outlined, Rounded, Sharp)의 스타일시트를 불러왔는지 알 수가 없다는 것이다. 따라서 라이브러리 최상위 컴포넌트에서 theme, motion-scheme 설정값과 함께 아이콘 스타일도 함께 받아야하며, 이 context를 참조하여 올바른 CSS 클래스 이름을 매핑해주는 Icon 컴포넌트가 필요하다.



## 2. Props

| Prop      | Type                               | Default value | Description                                                                    |
| --------- | ---------------------------------- | ------------- | ------------------------------------------------------------------------------ |
| iconStyle | 'outlined' \| 'rounded' \| 'sharp' | 'outlined'    | 현재 아이콘 스타일 context와 상관 없이 특정한 아이콘 스타일을 적용하기 위한 속성. |

> `style` 대신 `iconStyle`을 사용하는 이유: React에서 `style`은 인라인 CSS를 위한 예약 prop이므로 충돌을 피하기 위해 `iconStyle`로 명명.

## 3. Example

```tsx
<Button>
	<Button.Icon>
    	<Icon iconStyle="rounded">search</Icon>
    </Button.Icon>
</Button>
```



## 4. Constraints

- Google Fonts에서 제공하는 Material Symbols 스타일시트의 내용은 다음과 같다:
  ```css
  @font-face {
    font-family: 'Material Symbols Outlined';
    font-style: normal;
    font-weight: 100 700;
    src: url(https://fonts.gstatic.com/l/font?kit=kJEhBvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oFsL7AY49cmX3p6kHWlQJcQ&skey=b8dc2088854b122f&v=v326) format('woff2');
  }
  
  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
  }
  ```

  아이콘 클래스에는 `font-size` 값이 하드코딩되어 있으며, 일반적으로 이 클래스는 Unlayered로 정의된다. 따라서 별도의 CSS 레이어에 스타일을 정의하는 라이브러리에서 이 값을 덮어쓰기 위해 다음과 같은 장치(/core/material-symbols-hack.css)를 마련했다.
  ```css
  .material-symbols-outlined {
      font-size: revert !important;
  }
  
  .material-symbols-rounded {
      font-size: revert !important;
  }
  
  .material-symbols-sharp {
      font-size: revert !important;
  }
  ```

  