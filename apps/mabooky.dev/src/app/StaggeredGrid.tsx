"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

export interface StaggeredGridProps {
    children: React.ReactNode;
    gapSp?: number;
    className?: string;
}

interface Position {
    x: number;
    y: number;
    width: number;
}

// md3 breakpoints
const BREAKPOINT_EXPANDED = 840;
const BREAKPOINT_EXTRA_LARGE = 1600;

export function StaggeredGrid({ children, gapSp = 16, className = "" }: StaggeredGridProps) {
    const containerRef = useRef<HTMLUListElement>(null);
    const [positions, setPositions] = useState<Position[]>([]);
    const [containerHeight, setContainerHeight] = useState<number>(0);
    const [mounted, setMounted] = useState<boolean>(false);

    const calculateLayout = useCallback(() => {
        if (!containerRef.current) return;

        const containerW = containerRef.current.clientWidth;
        if (containerW === 0) return;

        // 루트 폰트 크기(rem 기준)를 읽어와 사용자의 폰트 크기 확대/축소 등 접근성 설정 동적 반영
        const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        const gapDp = (gapSp / 16) * rootFontSize;

        let cols = 1;
        if (window.matchMedia(`(min-width: ${BREAKPOINT_EXTRA_LARGE}px)`).matches) {
            cols = 3;
        } else if (window.matchMedia(`(min-width: ${BREAKPOINT_EXPANDED}px)`).matches) {
            cols = 2;
        }

        const colWidth = (containerW - gapDp * (cols - 1)) / cols;
        const childrenNodes = Array.from(containerRef.current.children) as HTMLElement[];

        const colHeights = new Array(cols).fill(0);
        const newPositions: Position[] = [];

        childrenNodes.forEach((node) => {
            node.style.width = `${colWidth}px`;
            const height = node.offsetHeight;

            let minColIndex = 0;
            let minColHeight = colHeights[0];
            for (let i = 1; i < cols; i++) {
                if (colHeights[i] < minColHeight) {
                    minColHeight = colHeights[i];
                    minColIndex = i;
                }
            }

            const x = minColIndex * (colWidth + gapDp);
            const y = colHeights[minColIndex];

            newPositions.push({ x, y, width: colWidth });

            colHeights[minColIndex] += height + gapDp;
        });

        const maxHeight = Math.max(...colHeights, 0);
        setPositions(newPositions);
        setContainerHeight(maxHeight > 0 ? maxHeight - gapDp : 0);
        setMounted(true);
    }, [gapSp]);

    useEffect(() => {
        if (!containerRef.current) return;

        calculateLayout();

        const observer = new ResizeObserver(() => {
            calculateLayout();
        });

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
        };
    }, [calculateLayout]);

    return (
        <ul
            ref={containerRef}
            className={`relative w-full ${className}`}
            style={{ height: containerHeight }}
        >
            {React.Children.map(children, (child, index) => {
                const pos = positions[index];
                return (
                    <li
                        key={index}
                        className="absolute top-0 left-0"
                        style={{
                            width: pos ? `${pos.width}px` : "100%",
                            transform: pos ? `translate(${pos.x}px, ${pos.y}px)` : "translate(0px, 0px)",
                            opacity: mounted && pos ? 1 : 0,
                            transition: "opacity var(--md-sys-motion-spring-fast-effects)",
                        }}
                    >
                        {child}
                    </li>
                );
            })}
        </ul>
    );
}
