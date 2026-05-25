import { ComponentProps } from "react";
import { ColorScheme } from "./ColorScheme";

function camelToKebab(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function opaqueArgbToHex(argb: number): string {
    return `#${argb.toString(16).padStart(8, "0").slice(2)}`;
}

function cssVarsFor(
    theme: "light" | "dark",
    contrast: "standard" | "medium" | "high",
    colorScheme: ColorScheme,
): string {
    const colorRoleValues = colorScheme.colorRoleValuesFor(theme, contrast);
    return Object.entries(colorRoleValues)
        .map(([role, value]) => {
            return `--md-sys-color-${camelToKebab(role)}:${opaqueArgbToHex(value)};`;
        })
        .join("");
}

function generateStyleSheetFor(id: string, colorScheme: ColorScheme): string {
    const lightStandard = cssVarsFor("light", "standard", colorScheme);
    const lightMedium = cssVarsFor("light", "medium", colorScheme);
    const lightHigh = cssVarsFor("light", "high", colorScheme);
    const darkStandard = cssVarsFor("dark", "standard", colorScheme);
    const darkMedium = cssVarsFor("dark", "medium", colorScheme);
    const darkHigh = cssVarsFor("dark", "high", colorScheme);

    return `#${id}[data-theme="light"][data-contrast="standard"]{${lightStandard}}#${id}[data-theme="light"][data-contrast="medium"]{${lightMedium}}#${id}[data-theme="light"][data-contrast="high"]{${lightHigh}}#${id}[data-theme="dark"][data-contrast="standard"]{${darkStandard}}#${id}[data-theme="dark"][data-contrast="medium"]{${darkMedium}}#${id}[data-theme="dark"][data-contrast="high"]{${darkHigh}}`;
}

export type MD3StyleProviderProps = ComponentProps<"div"> & {
    providerId: string;
    colorScheme: ColorScheme;
    initialTheme: "system" | "light" | "dark";
    initialContrast: "system" | "standard" | "medium" | "high";
};

export function MD3StyleProvider({
    ref,
    id,
    style,
    providerId,
    colorScheme,
    initialTheme,
    initialContrast,
    children,
    ...props
}: MD3StyleProviderProps) {
    const styleContent = generateStyleSheetFor(providerId, colorScheme);

    /*
     *  클라이언트 사이드에서 실행되어 FOUC를 방지하기 위해 data-* 값을 첫 페인트 이전에 설정하는 blocking script
     *
     *  원본 코드:
     *  (function () {
     *      const container = document.getElementById('${providerId}');
     *      if (!container) return;
     * 
     *      const initialTheme = '${initialTheme}';
     *      let resolvedInitialTheme = initialTheme;
     *      if (initialTheme === 'system') {
     *          const query = window.matchMedia('(prefers-color-scheme: dark)');
     *          resolvedInitialTheme = query.matches ? 'dark' : 'light';
     *      }
     * 
     *      const initialContrast = '${initialContrast}';
     *      let resolvedInitialContrast = initialContrast;
     *      if (initialContrast === 'system') {
     *          const query = window.matchMedia('(prefers-contrast: more)');
     *          resolvedInitialContrast = query.matches ? 'high' : 'standard';
     *      }
     * 
     *      container.dataset.theme = resolvedInitialTheme;
     *      container.dataset.contrast = resolvedInitialContrast;
     *  })();
     */
    const themeExpr = initialTheme === 'system'
        ? `m('(prefers-color-scheme: dark)').matches?'dark':'light'`
        : `'${initialTheme}'`;
    const contrastExpr = initialContrast === 'system'
        ? `m('(prefers-contrast: more)').matches?'high':'standard'`
        : `'${initialContrast}'`;
    const usesM = initialTheme === 'system' || initialContrast === 'system';
    const blockingScript = `((c${usesM ? ',m=matchMedia' : ''})=>c&&(c.dataset.theme=${themeExpr},c.dataset.contrast=${contrastExpr}))(document.getElementById('${providerId}'))`;

    return (
        <>
            {/* React 19부터는 <style> 요소가 자동으로 <head>에 삽입됨 (style hoisting) */}
            <style href={providerId} precedence="default">
                {styleContent}
            </style>
            <div
                ref={ref}
                id={providerId}
                style={{ display: "contents", ...style }}
                suppressHydrationWarning
                {...props}
            >
                {/* div 첫 자식으로 위치: div가 DOM에 추가된 직후 실행되어 children 파싱 전에 data-theme을 설정 */}
                <script
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{ __html: blockingScript }}
                />
                {children}
            </div>
        </>
    );
}
