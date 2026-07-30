import { ComponentProps } from "react";
import { IconButton } from "@mabooky/md3";
import clsx from "clsx";

export type ArtworkNavigationToolbarProps = ComponentProps<'div'> & {
    currentIndex: number;
    totalCount: number;
    onPrev: () => void;
    onNext: () => void;
};

export function ArtworkNavigationToolbar({
    className,
    currentIndex,
    totalCount,
    onPrev,
    onNext,
}: ArtworkNavigationToolbarProps) {
    return (
        <div 
            className={clsx(
                "w-max h-16 p-2 flex items-center gap-4",
                "rounded-full bg-surface-container shadow-elevation-level3",
                className
            )}
        >
            <IconButton 
                variant="standard" 
                onClick={onPrev} 
                disabled={currentIndex === 0}
            >
                <IconButton.Icon>chevron_left</IconButton.Icon>
            </IconButton>

            <span className="text-label-large tabular-nums text-on-surface select-none">
                {currentIndex + 1} / {totalCount}
            </span>

            <IconButton 
                variant="standard" 
                onClick={onNext} 
                disabled={currentIndex === totalCount - 1}
            >
                <IconButton.Icon>chevron_right</IconButton.Icon>
            </IconButton>
        </div>
    );
}
