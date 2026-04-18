'use client';

import clsx from "clsx";
import { ComponentProps, useEffect, useRef } from "react";

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
    return (node: T | null) => {
        for (const ref of refs) {
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.RefObject<T | null>).current = node;
        }
    };
}

export type StateLayerProps = Omit<ComponentProps<'span'>, 'children'> & {
    ripple?: boolean;
};

export function StateLayer({
    ref,
    className,
    ripple = false,
    ...props
}: StateLayerProps) {
    const layerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!ripple) return;

        // ref가 제대로 연결되었고, 부모 요소가 존재하는지 확인
        const layer = layerRef.current;
        const parent = layer?.parentElement;
        if (!(layer && parent)) return;

        const handlePointerDown = (e: PointerEvent) => {
            const layerRect = layer.getBoundingClientRect();

            // 처음 ripple 크기는 max(width, height)의 20%로 시작
            const rippleDiameter0 = Math.max(layerRect.width, layerRect.height) * 0.2;
            // 나중 ripple 크기는 클릭한 지점에서 가장 먼 모서리까지의 거리(반지름) * 2로 설정
            const rippleDiameter1 = Math.max(
                Math.hypot(e.clientX - layerRect.left, e.clientY - layerRect.top),
                Math.hypot(e.clientX - layerRect.right, e.clientY - layerRect.top),
                Math.hypot(e.clientX - layerRect.left, e.clientY - layerRect.bottom),
                Math.hypot(e.clientX - layerRect.right, e.clientY - layerRect.bottom)
            ) * 2;

            // ripple 애니메이션에서 나중 크기로 확장할 때의 스케일 계산(scale(1) -> scale(animScale))
            const animScale = rippleDiameter1 / rippleDiameter0;

            // ripple이 적용될 컨테이너에 대한 상대 좌표 계산
            const rippleXRelative = e.clientX - layerRect.left;
            const rippleYRelative = e.clientY - layerRect.top;

            const rippleElement = document.createElement("span");
            rippleElement.className = "md3-state-layer__ripple";
            rippleElement.style.width = rippleDiameter0 + "px";
            rippleElement.style.height = rippleDiameter0 + "px";
            rippleElement.style.left = rippleXRelative - (rippleDiameter0 / 2) + "px";
            rippleElement.style.top = rippleYRelative - (rippleDiameter0 / 2) + "px";
            layer.appendChild(rippleElement);

            // duration, easing은 m3.material.io에서 사용하는 값 그대로 적용
            // opacity의 경우 원래 0.12이지만, 시각적으로 더 잘 보이도록 0.25로 조정
            const rippleAnim = rippleElement.animate(
                [
                    { opacity: 0.25, transform: `scale(1)` },
                    { opacity: 0, transform: `scale(${animScale})` }
                ],
                {
                    duration: 300,
                    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
                    fill: "forwards"
                }
            )
            rippleAnim.finished.then(() => rippleElement.remove());

        };

        parent.addEventListener("pointerdown", handlePointerDown);
        return () => {
            parent.removeEventListener("pointerdown", handlePointerDown);
        };
    }, [ripple]);

    return (
        <span
            ref={mergeRefs(layerRef, ref)}
            aria-hidden="true"
            className={clsx('md3-state-layer', className)}
            data-ripple={ripple}
            {...props} />
    );
}