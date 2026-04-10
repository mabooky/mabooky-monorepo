import clsx from "clsx";
import { ComponentProps } from "react";

export type TouchTargetProps = ComponentProps<"button"> & {
    minimumTouchTarget?: 'box' | 'hitbox';
}

export function TouchTarget({
    ref,
    className,
    minimumTouchTarget = 'box',
    disabled = false,
    children,
    ...props
}: TouchTargetProps) {
    return (
        <button
            ref={ref}
            className={clsx('md3-touch-target', className)}
            data-minimum-touch-target={minimumTouchTarget}
            disabled={disabled}
            {...props}>

            {children}
            
        </button>
    )
}