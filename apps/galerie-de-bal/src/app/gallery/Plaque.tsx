import { StateLayer } from "@mabooky/md3";
import clsx from "clsx";
import { ComponentProps } from "react";

export type PlaqueProps = ComponentProps<'button'> & {
    alignment?: 'start' | 'center' | 'end';
}

export function Plaque({ className, alignment = 'start', ...props }: PlaqueProps) {
    return (
        <button 
            className={clsx(
                "w-10 h-14 px-1.5 py-2", 
                "flex flex-col justify-center gap-0.75", 
                alignment === 'start' && "items-start",
                alignment === 'center' && "items-center",
                alignment === 'end' && "items-end",
                "bg-inverse-surface text-inverse-on-surface rounded-xs cursor-pointer", 
                "md3-min-touch-target md3-state-source",
                className
            )}
            {...props}
        >
            {/* 제목부 */}
            <div className="w-[85%] h-[1.5px] bg-current opacity-90 rounded-full" />
            <div className="w-[65%] h-[1.5px] bg-current opacity-90 rounded-full" />
            
            {/* 본문부 (상단 마진으로 살짝 띄움) */}
            <div className="w-full h-[1px] bg-current opacity-60 rounded-full mt-1" />
            <div className="w-full h-[1px] bg-current opacity-60 rounded-full" />
            <div className="w-[90%] h-[1px] bg-current opacity-60 rounded-full" />

            <div className="w-full h-[1px] bg-current opacity-60 rounded-full mt-1" />
            <div className="w-full h-[1px] bg-current opacity-60 rounded-full" />
            <div className="w-[50%] h-[1px] bg-current opacity-60 rounded-full" />

            <StateLayer />
        </button>
    )
}