import clsx from "clsx";
import { ComponentProps } from "react";

export type StateLayerProps = Omit<ComponentProps<'div'>, 'children'> & {
    
};

export function StateLayer({
    ref,
    className,
    ...props
}: StateLayerProps) {
    return (
        <div
            ref={ref}
            className={clsx('md3-state-layer', className)}
            {...props} />
    )
}