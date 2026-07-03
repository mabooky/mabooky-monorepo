import clsx from "clsx";
import { ComponentProps } from "react";

export type IconProps = ComponentProps<"span">;

/**
 * Material Symbols 합자(ligature) 이름을 텍스트로 입력받아 벡터 아이콘으로 렌더링하는 컴포넌트입니다.
 * 내부적으로 HTML span 요소를 사용하여 텍스트를 렌더링합니다.
 * 
 * 가장 가까운 상위 `MD3Provider`에 주입된 `data-icon-style` 속성을 상속받아 CSS 레벨에서 폰트 패밀리를 결정합니다.
 * 이 컴포넌트 자체에는 폰트 에셋이 포함되어 있지 않으므로, 정상적인 렌더링을 위해서는 애플리케이션의 HTML 문서 헤드 영역에
 * 사용하고자 하는 스타일의 Google Fonts 웹폰트 스타일시트가 사전에 로드되어 있어야 합니다.
 * 
 * 전역 설정과 무관하게 특정 아이콘에만 다른 폰트 패밀리를 적용해야 하는 경우에는 컴포넌트의 `style` 속성에 `fontFamily`를 명시하여
 * 기존 스타일을 덮어쓸 수 있습니다.
 *
 * @example
 * <Icon aria-label="검색">search</Icon>
 *
 * @example
 * <Icon
 *   aria-label="즐겨찾기"
 *   style={{ fontVariationSettings: "'FILL' 1" }}
 * >
 *   favorite
 * </Icon>
 */
export function Icon({ className, children, ...props }: IconProps) {
    return (
        <span className={clsx("md3-icon", className)} {...props}>
            {children}
        </span>
    );
}
