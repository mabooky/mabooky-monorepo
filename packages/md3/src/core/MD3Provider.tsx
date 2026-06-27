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

export function MD3Provider({
    ref,
    colorScheme = ColorScheme.fromSourceColorArgb(0xff6750a4),
    theme = "system",
    contrast = "system",
    iconStyle = "outlined", // TODO: iconStyle CSS 변수로 전달 구현(::after 및 content 활용)
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
            <MD3ScopedContextProvider
                ref={ref}
                containerClassName={containerClassName}
                initialTheme={theme}
                initialContrast={contrast}
                {...props}
            >
                {children}
            </MD3ScopedContextProvider>
        </>
    );
}