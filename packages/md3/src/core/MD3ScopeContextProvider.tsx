'use client';

import clsx from "clsx";
import { ComponentProps, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type MD3ContextValue = {
    theme: 'system' | 'light' | 'dark';
    /**
     * 실제 적용된 테마의 값입니다. 예를 들어 theme이 'system'이고 사용자가 OS 설정을 통해 다크 모드를 사용 중이라면,
     * resolvedTheme은 'dark'가 됩니다.
     * 
     * 
     * 단, 이 값을 서버 컴포넌트에서 조건부 렌더링에 사용할 경우 주의가 필요합니다. 서버 렌더링 시점에는 OS의 테마 설정을
     * 알 수 없기 때문에, theme이 'system'인 경우 resolvedTheme은 기본적으로 'light'로 설정됩니다.
     * 이후 클라이언트 렌더링 시점에 실제 OS 설정을 반영하여 올바른 값으로 업데이트되는데, 클라이언트 렌더링은 서버 렌더링 후 
     * 첫 페인트가 발생한 다음 일어나므로, 이 사이에 잠깐 동안 resolvedTheme이 잘못된 값을 가져 FOUC가 발생할 수 있습니다.
     */
    resolvedTheme: 'light' | 'dark';
    setTheme: (theme: 'system' | 'light' | 'dark') => void;
    contrast: 'system' | 'standard' | 'medium' | 'high';
    /**
     * 실제 적용된 대비 수준입니다. 예를 들어 contrast가 'system'이고 사용자가 OS 설정을 통해 고대비 모드를 사용 중이라면,
     * resolvedContrast는 'high'가 됩니다.
     * 
     * 
     * 단, 이 값을 서버 컴포넌트에서 조건부 렌더링에 사용할 경우 주의가 필요합니다. 서버 렌더링 시점에는 OS의 대비 설정을
     * 알 수 없기 때문에, contrast가 'system'인 경우 resolvedContrast는 기본적으로 'standard'로 설정됩니다.
     * 이후 클라이언트 렌더링 시점에 실제 OS 설정을 반영하여 올바른 값으로 업데이트되는데, 클라이언트 렌더링은 서버 렌더링 후 
     * 첫 페인트가 발생한 다음 일어나므로, 이 사이에 잠깐 동안 resolvedContrast가 잘못된 값을 가져 FOUC가 발생할 수 있습니다.
     */
    resolvedContrast: 'standard' | 'medium' | 'high';
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

export type MD3ScopeContextProviderProps = ComponentProps<'div'> & {
    containerClassName: string;
    initialTheme: 'system' | 'light' | 'dark';
    initialContrast: 'system' | 'standard' | 'medium' | 'high';
    iconStyle: 'outlined' | 'rounded' | 'sharp';
};

function resolveTheme(theme: 'system' | 'light' | 'dark'): 'light' | 'dark' {
    const isServer = typeof window === 'undefined';
    if (isServer) {
        return theme === 'system' ? 'light' : theme;
    }

    if (theme === 'system') {
        const query = window.matchMedia('(prefers-color-scheme: dark)');
        return query.matches ? 'dark' : 'light';
    }
    else {
        return theme;
    }
}

function resolveContrast(
    contrast: 'system' | 'standard' | 'medium' | 'high'
): 'standard' | 'medium' | 'high' {
    const isServer = typeof window === 'undefined';
    if (isServer) {
        return contrast === 'system' ? 'standard' : contrast;
    }

    if (contrast === 'system') {
        const query = window.matchMedia('(prefers-contrast: more)');
        return query.matches ? 'high' : 'standard';
    }
    else {
        return contrast;
    }
}

export function MD3ScopeContextProvider({
    ref,
    className,
    containerClassName,
    initialTheme,
    initialContrast,
    iconStyle,
    children,
    ...props
}: MD3ScopeContextProviderProps) {        
    // resolveTheme과 resolveContrast 자체가 서버 환경에서는 fallback 값 반환!
    const [theme, setThemeState] = useState(initialTheme);
    const [resolvedTheme, setResolvedTheme] = useState(() => resolveTheme(initialTheme));
    const [contrast, setContrastState] = useState(initialContrast);
    const [resolvedContrast, setResolvedContrast] = useState(() => resolveContrast(initialContrast));

    useEffect(() => {
        if (theme !== 'system') return;

        const query = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e: MediaQueryListEvent) => setResolvedTheme(e.matches ? 'dark' : 'light');

        query.addEventListener('change', handler);
        return () => query.removeEventListener('change', handler);
    }, [theme]);
    useEffect(() => {
        if (contrast !== 'system') return;

        const query = window.matchMedia('(prefers-contrast: more)');
        const handler = (e: MediaQueryListEvent) => setResolvedContrast(e.matches ? 'high' : 'standard');

        query.addEventListener('change', handler);
        return () => query.removeEventListener('change', handler);
    }, [contrast]);

    const setTheme = useCallback((newTheme: 'system' | 'light' | 'dark') => {
        setThemeState(newTheme);
        setResolvedTheme(resolveTheme(newTheme));
    }, []);
    const setContrast = useCallback((newContrast: 'system' | 'standard' | 'medium' | 'high') => {
        setContrastState(newContrast);
        setResolvedContrast(resolveContrast(newContrast));
    }, []);

    const contextValue = useMemo(() => ({
        theme,
        resolvedTheme,
        setTheme,
        contrast,
        resolvedContrast,
        setContrast,
    }), [theme, resolvedTheme, setTheme, contrast, resolvedContrast, setContrast]);

    return (
        <div
            ref={ref}
            className={clsx(containerClassName, className)}
            {...props}
            data-theme={theme}
            data-contrast={contrast}
            data-icon-style={iconStyle}
        >
            <MD3Context.Provider value={contextValue}>
                {children}
            </MD3Context.Provider>
        </div>
    );
}