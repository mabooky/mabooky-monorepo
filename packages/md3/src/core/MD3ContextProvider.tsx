'use client';

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

export type MD3ContextValue = {
    theme: 'system' | 'light' | 'dark';
    setTheme: (theme: 'system' | 'light' | 'dark') => void;
    contrast: 'system' | 'standard' | 'medium' | 'high';
    setContrast: (contrast: 'system' | 'standard' | 'medium' | 'high') => void;
}

export const MD3Context = createContext<MD3ContextValue>(null as any);

export function useMD3Context() {
    const context = useContext(MD3Context);
    if (!context) {
        throw new Error("[md3] useMD3Context 훅은 MD3Provider 내부에서 사용해야 합니다.");
    }
    return context;
}

export type MD3ContextProviderProps = {
    providerId: string;
    initialTheme: 'system' | 'light' | 'dark';
    initialContrast: 'system' | 'standard' | 'medium' | 'high';
    cookieName?: string;
    children: ReactNode;
};

function resolveTheme(theme: 'system' | 'light' | 'dark'): 'light' | 'dark' {
    if (theme === 'system') {
        const query = window.matchMedia('(prefers-color-scheme: dark)');
        return query.matches ? 'dark' : 'light';
    }
    return theme;
}

function resolveContrast(
    contrast: 'system' | 'standard' | 'medium' | 'high'
): 'standard' | 'medium' | 'high' {
    if (contrast === 'system') {
        const query = window.matchMedia('(prefers-contrast: more)');
        return query.matches ? 'high' : 'standard';
    }
    return contrast;
}

export function MD3ContextProvider({
    providerId,
    initialTheme,
    initialContrast,
    cookieName,
    children,
}: MD3ContextProviderProps) {
    const [theme, setThemeState] = useState(initialTheme);
    const [contrast, setContrastState] = useState(initialContrast);

    const setTheme = useCallback((newTheme: 'system' | 'light' | 'dark') => {
        if (newTheme === theme) return;

        // 1. state 업데이트
        setThemeState(newTheme);

        // 2. 쿠키 사용하는 경우 쿠키 업데이트
        if (cookieName) {
            document.cookie = `${cookieName}-theme=${newTheme}; path=/; max-age=34560000`;
        }

        // 3. DOM 업데이트
        const resolvedNewTheme = resolveTheme(newTheme);
        const container = document.getElementById(providerId);
        if (container) {
            container.dataset.theme = resolvedNewTheme;
        }
    }, [providerId, cookieName, theme]);

    const setContrast = useCallback((newContrast: 'system' | 'standard' | 'medium' | 'high') => {
        if (newContrast === contrast) return;
        
        // 1. state 업데이트
        setContrastState(newContrast);

        // 2. 쿠키 사용하는 경우 쿠키 업데이트
        if (cookieName) {
            document.cookie = `${cookieName}-contrast=${newContrast}; path=/; max-age=34560000`;
        }

        // 3. DOM 업데이트
        const resolvedNewContrast = resolveContrast(newContrast);
        const container = document.getElementById(providerId);
        if (container) {
            container.dataset.contrast = resolvedNewContrast;
        }
    }, [providerId, cookieName, contrast]);

    const contextValue = useMemo(
        () => ({ theme, setTheme, contrast, setContrast }),
        [theme, setTheme, contrast, setContrast]
    )

    return <MD3Context.Provider value={contextValue}> 
        {children}
    </MD3Context.Provider>
}