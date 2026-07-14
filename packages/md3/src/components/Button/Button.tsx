'use client';

import { Slot, Slottable } from "@radix-ui/react-slot";
import clsx from "clsx";
import { ComponentProps } from "react";
import { StateLayer } from "../../core/StateLayer";
import { Icon, IconProps } from "../Icon";
import { MD3ContainerProps, MD3StateLayerProps } from "../../core/propMixins";

export type ButtonProps = Omit<ComponentProps<'button'>, 'color' | 'disabled'> & MD3ContainerProps & MD3StateLayerProps & {
    asChild?: boolean;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    shape?: "round" | "square";
    variant?: "elevated" | "filled" | "tonal" | "outlined" | "text";
    color?: 'primary' | 'secondary' | 'tertiary';
    selected?: boolean;
    disabled?: boolean;
};

export function ButtonRoot({
    ref,
    className,
    children,
    ripple = false,
    asChild = false,
    size = "sm",
    shape = "round",
    variant = "filled",
    color,
    selected,
    disabled,
    ...props
}: ButtonProps) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            ref={ref}
            className={clsx("md3-button", "md3-min-touch-target", className)}
            data-size={size}
            data-shape={shape}
            data-variant={variant}
            data-color={color}
            aria-pressed={selected}
            aria-disabled={disabled}
            {...props}
        >
            <span className="md3-button__container" />
            <Slottable>{children}</Slottable>
            <StateLayer className="md3-button__state-layer" ripple={ripple} />
        </Comp>
    );
}

export type ButtonIconProps =
    | ({ asChild?: false } & IconProps)
    | ({ asChild: true } & ComponentProps<"span">);

function ButtonIcon({ asChild, className, ...props }: ButtonIconProps) {
    if (asChild) {
        return <Slot className={clsx("md3-button__icon", className)} {...(props as ComponentProps<"span">)} />;
    }
    return <Icon className={clsx("md3-button__icon", className)} {...(props as IconProps)} />;
};

export type ButtonLabelProps = ComponentProps<"span">;

function ButtonLabel({ className, ...props }: ButtonLabelProps) {
    return (
        <span className={clsx("md3-button__label", className)} {...props} />
    );
}

/* -------------------------------------------------------------------------- */

export const Button = Object.assign(ButtonRoot, {
    Icon: ButtonIcon,
    Label: ButtonLabel,
});