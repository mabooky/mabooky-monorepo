import { ComponentProps } from "react";
import { MD3ContainerProps, MD3StateLayerProps } from "../../core/propMixins";
import { Slot, Slottable } from "@radix-ui/react-slot";
import clsx from "clsx";
import { StateLayer } from "../../core/StateLayer";
import { Icon, IconProps } from "../Icon/Icon";

export type IconButtonProps = Omit<ComponentProps<'button'>, 'color' | 'disabled'> & MD3ContainerProps & MD3StateLayerProps & {
    asChild?: boolean;
    size?: 'xs' | "sm" | "md" | "lg" | "xl";
    shape?: "round" | "square";
    variant?: "filled" | "tonal" | "outlined" | "standard";
    width?: 'narrow' | 'default' | 'wide';
    color?: 'primary' | 'secondary' | 'tertiary';
    selected?: boolean;
    disabled?: boolean;
};

export function IconButtonRoot({
    ref,
    className,
    children,
    ripple = false,
    asChild = false,
    size = "sm",
    shape = "round",
    variant = "filled",
    width = "default",
    color,
    selected,
    disabled,
    ...props
}: IconButtonProps) {
    const Comp = asChild ? Slot : "button";
    return (
        <Comp
            className={clsx("md3-icon-button", "md3-min-touch-target", className)}
            data-size={size}
            data-shape={shape}
            data-variant={variant}
            data-width={width}
            data-color={color}
            aria-pressed={selected}
            aria-disabled={disabled}
            {...props}
        >
            <span className="md3-icon-button__container" />
            <Slottable>{children}</Slottable>
            <StateLayer className="md3-icon-button__state-layer" ripple={ripple} />
        </Comp>
    )
}

/* -------------------------------------------------------------------------- */

export type IconButtonIconProps = IconProps;

function IconButtonIcon({ className, ...props }: IconButtonIconProps) {
    return <Icon className={clsx("md3-icon-button__icon", className)} {...props} />;
}

/* -------------------------------------------------------------------------- */

export const IconButton = Object.assign(IconButtonRoot, {
    Icon: IconButtonIcon,
});