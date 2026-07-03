import clsx from "clsx";
import { ComponentProps } from "react";

export type DividerProps = ComponentProps<"hr">;

export function Divider({ className, ...props }: DividerProps) {
    return (
        <hr 
            className={clsx("md3-divider", className)} 
            {...props} 
        />
    );
}
