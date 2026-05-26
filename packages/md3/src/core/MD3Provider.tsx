import { ComponentProps, useId } from "react";
import { ColorScheme } from "./ColorScheme";
import { MD3StyleProvider } from "./MD3StyleProvider";
import { MD3ContextProvider } from "./MD3ContextProvider";
import { cookies } from "next/headers";

export type MD3ProviderProps = Omit<ComponentProps<"div">, "id"> & {
    colorScheme?: ColorScheme;
    cookieName?: string;
    defaultTheme?: "system" | "light" | "dark";
    defaultContrast?: "system" | "standard" | "medium" | "high";
    iconStyle?: "outlined" | "rounded" | "sharp";
};

// TODO: 사용자가 cookie 거부한 경우에도 정상 작동하는지 물어보기
export async function MD3Provider({
    ref,
    colorScheme = ColorScheme.fromSourceColorArgb(0xff6750a4),
    cookieName,
    defaultTheme = "system",
    defaultContrast = "system",
    iconStyle = "outlined", // TODO: iconStyle CSS 변수로 전달 구현
    children,
    ...props
}: MD3ProviderProps) {
    const generatedId = useId();
    const escapedId = generatedId.replace(/[:_]/g, "");
    const providerId = `md3-provider-${escapedId.toLowerCase()}`;

    let savedTheme: 'system' | 'light' | 'dark' | undefined;
    let savedContrast: 'system' | 'standard' | 'medium' | 'high' | undefined;
    if (cookieName) {
        const cookieStore = await cookies();

        const themeCookieValue = cookieStore.get(`${cookieName}-theme`)?.value;
        if (themeCookieValue && ['system', 'light', 'dark'].includes(themeCookieValue)) {
            savedTheme = themeCookieValue as 'system' | 'light' | 'dark';
        }

        const contrastCookieValue = cookieStore.get(`${cookieName}-contrast`)?.value;
        if (contrastCookieValue && ['system', 'standard', 'medium', 'high'].includes(contrastCookieValue)) {
            savedContrast = contrastCookieValue as 'system' | 'standard' | 'medium' | 'high';
        }
    }

    const themeToResolve = savedTheme ?? defaultTheme;
    const contrastToResolve = savedContrast ?? defaultContrast;

    return (
        <MD3StyleProvider
            ref={ref}
            providerId={providerId}
            colorScheme={colorScheme}
            initialTheme={themeToResolve}
            initialContrast={contrastToResolve}
            {...props}
        >
            <MD3ContextProvider
                providerId={providerId}
                initialTheme={themeToResolve}
                initialContrast={contrastToResolve}
                cookieName={cookieName}
            >
                {children}
            </MD3ContextProvider>
        </MD3StyleProvider>
    );
}
