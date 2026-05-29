import { ColorScheme } from "./ColorScheme";

function camelToKebab(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function opaqueArgbToHex(argb: number): string {
    return `#${(argb >>> 0).toString(16).padStart(8, "0").slice(2)}`;
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

function generateStyleSheetFor(className: string, colorScheme: ColorScheme): string {
    const cn = className;
    const ls = cssVarsFor("light", "standard", colorScheme);
    const lm = cssVarsFor("light", "medium", colorScheme);
    const lh = cssVarsFor("light", "high", colorScheme);
    const ds = cssVarsFor("dark", "standard", colorScheme);
    const dm = cssVarsFor("dark", "medium", colorScheme);
    const dh = cssVarsFor("dark", "high", colorScheme);

    // CSS 스펙은 ./provider-stylesheet-spec.css 파일에 명세되어 있음
    return `.${cn}{display:contents;${ls}}` +
           `.${cn}[data-theme="dark"]{${ds}}` +
           `@media(prefers-color-scheme:dark){.${cn}[data-theme="system"]{${ds}}}` +
           `.${cn}[data-theme="light"][data-contrast="medium"]{${lm}}` +
           `.${cn}[data-theme="dark"][data-contrast="medium"]{${dm}}` +
           `@media(prefers-color-scheme:light){.${cn}[data-theme="system"][data-contrast="medium"]{${lm}}}` +
           `@media(prefers-color-scheme:dark){.${cn}[data-theme="system"][data-contrast="medium"]{${dm}}}` +
           `.${cn}[data-theme="light"][data-contrast="high"]{${lh}}` +
           `.${cn}[data-theme="dark"][data-contrast="high"]{${dh}}` +
           `@media(prefers-contrast:more){` +
               `.${cn}[data-theme="light"][data-contrast="system"]{${lh}}` +
               `.${cn}[data-theme="dark"][data-contrast="system"]{${dh}}` +
           `}` +
           `@media(prefers-color-scheme:light){` +
               `.${cn}[data-theme="system"][data-contrast="high"]{${lh}}` +
               `@media(prefers-contrast:more){.${cn}[data-theme="system"][data-contrast="system"]{${lh}}}` +
           `}` +
           `@media(prefers-color-scheme:dark){` +
               `.${cn}[data-theme="system"][data-contrast="high"]{${dh}}` +
               `@media(prefers-contrast:more){.${cn}[data-theme="system"][data-contrast="system"]{${dh}}}` +
           `}`;
}

export type MD3StyleProviderProps = {
    containerClassName: string;
    colorScheme: ColorScheme;
};

export function MD3StyleProvider({
    containerClassName,
    colorScheme,
}: MD3StyleProviderProps) {
    const styleContent = generateStyleSheetFor(containerClassName, colorScheme);
    
    // React 19부터는 <style> 요소가 자동으로 <head>에 삽입됨 (style hoisting)
    return (
        <style href={containerClassName} precedence="default">
            {styleContent}
        </style>
    );
}
