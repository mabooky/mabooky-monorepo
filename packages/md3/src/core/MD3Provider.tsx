import { ComponentProps, useId } from "react";
import { ColorScheme } from "./ColorScheme";
import { MD3StyleProvider } from "./MD3StyleProvider";
import { MD3ScopeContextProvider } from "./MD3ScopeContextProvider";
import { murmur3 } from "./murmur3";

export type MD3ProviderProps = ComponentProps<"div"> & {
    colorScheme?: ColorScheme;
    theme?: "system" | "light" | "dark";
    contrast?: "system" | "standard" | "medium" | "high";
    iconStyle?: "outlined" | "rounded" | "sharp";
};

/**
 * 애플리케이션 또는 특정 하위 트리에 Material Design 3 테마와 Context API를 제공하는 최상위 Provider 컴포넌트입니다.
 * 
 * 내부적으로 크게 상태 관리, 미디어 쿼리 감지, DOM 스코프 객체 제공을 담당하는 `MD3ScopeContextProvider`와, 동적 CSS 변수를
 * 생성하여 주입하는 `MD3StyleProvider`로 구현되어 있습니다. 고유 식별자 해싱을 통해 격리된 CSS 클래스를 생성하므로, 동일한
 * 애플리케이션 내에서 여러 `MD3Provider`를 중첩하여 서로 다른 테마 영역을 안전하게 구축할 수 있습니다.
 * 
 * 시스템 설정에 따른 테마와 고대비 모드를 지원하며, CSS 레벨의 미디어 쿼리와 JavaScript 레벨의 상태 동기화를 동시에 수행합니다.
 * 렌더링 시 React 19의 스타일 호이스팅 기능을 활용하여 동적으로 생성된 색상 스키마 변수들을 문서의 `<head>` 영역으로 자동 주입합니다.
 * 
 * 단, 훅을 통해 접근할 수 있는 실제 적용 테마 및 대비 값(`resolvedTheme`, `resolvedContrast`)을 서버 렌더링(SSR)
 * 환경에서 조건부 렌더링의 잣대로 사용할 경우 화면 깜빡임(FOUC) 현상이 발생할 수 있습니다. 서버는 클라이언트의 OS 환경 변수를 렌더링
 * 시점에 파악할 수 없으므로 초기 렌더링 시에는 지정된 기본값으로 평가되며, 이후 클라이언트에서 Hydration되는 과정에서 실제 OS
 * 값이 반영되기 때문입니다.
 */
export function MD3Provider({
    ref,
    colorScheme = ColorScheme.fromSourceColorArgb(0xff6750a4),
    theme = "system",
    contrast = "system",
    iconStyle = "outlined",
    children,
    ...props
}: MD3ProviderProps) {
    const id = useId();
    const containerClassName = `md3-provider-${murmur3(id)}`;
    
    return (
        <>
            <MD3StyleProvider
                containerClassName={containerClassName}
                colorScheme={colorScheme}
            />
            <MD3ScopeContextProvider
                ref={ref}
                containerClassName={containerClassName}
                initialTheme={theme}
                initialContrast={contrast}
                iconStyle={iconStyle}
                {...props}
            >
                {children}
            </MD3ScopeContextProvider>
        </>
    );
}