'use client';

import { Button, useMD3Context } from "@mabooky/md3";

export function ThemeSelector() {
    const context = useMD3Context();
    return (
        <div className="flex flex-col gap-2">
            <span className="text-title-medium">테마</span>
            <div className="flex flex-row gap-2">
                <Button
                    variant="tonal"
                    selected={context.theme === 'system'}
                    onClick={() => context.setTheme('system')}
                >
                    <Button.Icon>brightness_auto</Button.Icon>
                    <Button.Label>시스템</Button.Label>
                </Button>
                
                <Button
                    variant="tonal"
                    selected={context.theme === 'light'}
                    onClick={() => context.setTheme('light')}
                >
                    <Button.Icon>light_mode</Button.Icon>
                    <Button.Label>라이트</Button.Label>
                </Button>

                <Button
                    variant="tonal"
                    selected={context.theme === 'dark'}
                    onClick={() => context.setTheme('dark')}
                >
                    <Button.Icon>dark_mode</Button.Icon>
                    <Button.Label>다크</Button.Label>
                </Button>
            </div>
        </div>
    )
}