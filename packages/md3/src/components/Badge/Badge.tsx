import clsx from "clsx";
import { ComponentProps } from "react";

type SmallBadgeProps = Omit<ComponentProps<'span'>, 'children'> & {
    variant: 'small';
}

function SmallBadge({ ref, className, variant, ...props }: SmallBadgeProps) {
    return (
        <span
            ref={ref}
            className={clsx('md3-badge', className)}
            data-variant={variant}
            {...props}
        />
    );
}

/* -------------------------------------------------------------------------- */

type LargeBadgeProps = Omit<ComponentProps<'span'>, 'children'> & {
    variant: 'large';
    value: number;
    max?: number;
}

function LargeBadge({ ref, className, variant, value, max = 999, ...props }: LargeBadgeProps) {
    if (value === 0) return null;

    const displayValue = value > max ? `${max}+` : value;

    return (
        <span
            ref={ref}
            className={clsx('md3-badge', className)}
            data-variant={variant}
            {...props}
        >
            {displayValue}
        </span>
    );
}

/* -------------------------------------------------------------------------- */

export type BadgeProps = SmallBadgeProps | LargeBadgeProps;

export function Badge(props: BadgeProps) {
    if (props.variant === 'small') return <SmallBadge {...props} />;
    else return <LargeBadge {...props} />;
}