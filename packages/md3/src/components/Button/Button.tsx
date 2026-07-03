'use client';

import { Slot, Slottable } from "@radix-ui/react-slot";
import clsx from "clsx";
import { ComponentProps } from "react";
import { StateLayer } from "../core/StateLayer";
import { Icon, IconProps } from "./Icon";
import { MD3InteractiveComponentProps } from "../core/MD3ComponentProps";

export type ButtonProps = ComponentProps<'button'> & MD3InteractiveComponentProps & {
    asChild?: boolean;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    shape?: "round" | "square";
    variant?: "elevated" | "filled" | "tonal" | "outlined" | "text";
    color?: 'primary' | 'secondary' | 'tertiary';
    selected?: boolean;
};

export function ButtonRoot({
    // ⬇️ MD3InteractiveComponentProps
    ripple = false,

    ref,
    className,
    children,
    asChild = false,
    size = "sm",
    shape = "round",
    variant = "filled",
    color,
    selected,
    ...props
}: ButtonProps) {
    const Comp = asChild ? Slot : "button";
    const isToggle = selected !== undefined;
    const overridesColor = color !== undefined;

    return (
        <Comp
            ref={ref}
            className={clsx("md3-state-source", "md3-button", "md3-min-touch-target", className)}
            data-size={size}
            data-shape={shape}
            data-variant={variant}
            data-color={overridesColor ? color : undefined}
            aria-pressed={isToggle ? selected : undefined}
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