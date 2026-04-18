import clsx from "clsx";
import { ComponentProps } from "react";

export type IconStyle = "outlined" | "rounded" | "sharp";

export type IconProps = ComponentProps<"span"> & {
    iconStyle?: IconStyle;
};

const iconStyleClassMap: Record<IconStyle, string> = {
    outlined: "material-symbols-outlined",
    rounded: "material-symbols-rounded",
    sharp: "material-symbols-sharp",
};

export function Icon({ iconStyle = "outlined", className, children, ...props }: IconProps) {
    return (
        <span className={clsx(iconStyleClassMap[iconStyle], "md3-icon", className)} {...props}>
            {children}
        </span>
    );
}
