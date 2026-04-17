import { Slot, Slottable } from "@radix-ui/react-slot";
import clsx from "clsx";
import { ComponentProps } from "react";
import { StateLayer } from "../core/StateLayer";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonShape = "round" | "square";
export type ButtonColor = "elevated" | "filled" | "tonal" | "outlined" | "text";

export type ButtonProps = Omit<ComponentProps<"button">, "color"> & {
    asChild?: boolean;
    size?: ButtonSize;
    shape?: ButtonShape;
    color?: ButtonColor;
    selected?: boolean;
    ripple?: boolean;
};

export function Button({
    asChild = false,
    size = "sm",
    shape = "round",
    color = "filled",
    selected,
    ripple = false,
    ref,
    className,
    children,
    ...props
}: ButtonProps) {
    const Comp = asChild ? Slot : "button";
    const isToggle = selected !== undefined;

    return (
        <Comp
            ref={ref}
            className={clsx("md3-button", "md3-min-touch-target", className)}
            data-size={size}
            data-shape={shape}
            data-color={color}
            aria-pressed={isToggle ? selected : undefined}
            {...props}
        >
            <Slottable>{children}</Slottable>
            <StateLayer className="md3-button__state-layer" ripple={ripple} />
        </Comp>
    );
}

Button.Icon = function ButtonIcon({ className, children, ...props }: ComponentProps<"span">) {
    return (
        <span className={clsx("md3-button__icon", className)} {...props}>
            {children}
        </span>
    );
};
