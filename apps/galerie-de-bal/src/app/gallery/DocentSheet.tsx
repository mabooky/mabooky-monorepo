"use client";

import { useRef, useEffect } from "react";
import { Divider } from "@mabooky/md3";
import clsx from "clsx";
import { type Artwork } from "@/types/artwork";

/* -------------------------------------------------------------------------- */
/*  DocentContent                                                             */
/* -------------------------------------------------------------------------- */

function DocentContent({ artwork }: { artwork: Artwork }) {
    return (
        <>
            <h3 className="text-emphasized-display-small break-keep">{artwork.title}</h3>
            <p className="mt-2 text-body-large"><i>{artwork.titleEng}</i></p>
            <p className="mt-4 text-title-small">
                {artwork.artist.name} (b. {artwork.artist.birthYear})
            </p>
            <p className="mt-1 text-title-small">
                {artwork.creationYear}
            </p>
            <p className="mt-1 text-title-small">
                {artwork.medium}
            </p>
            <p className="mt-1 text-title-small">
                {artwork.metadata.width} x {artwork.metadata.height} px, {artwork.metadata.fileSize}
            </p>

            <Divider className="mt-8" />

            <p className="mt-8 text-body-large whitespace-pre-line">{artwork.docent}</p>
        </>
    );
}

/* -------------------------------------------------------------------------- */
/*  DocentSheetBottom (Compact, Medium)                                       */
/* -------------------------------------------------------------------------- */

function DocentSheetBottom({ artwork, isVisible, onDismiss }: { artwork: Artwork; isVisible: boolean; onDismiss?: () => void }) {
    const sheetRef = useRef<HTMLDivElement>(null);
    const dragStartY = useRef<number | null>(null);
    const isHandleDrag = useRef<boolean>(false);
    const isDragging = useRef<boolean>(false);

    useEffect(() => {
        const sheet = sheetRef.current;
        if (!sheet) return;

        const preventNativeScroll = (e: TouchEvent) => {
            // 이미 드래그 중이거나, 최상단에서 아래로 드래그를 시도할 때 브라우저 스크롤 원천 차단
            if (isDragging.current) {
                if (e.cancelable) e.preventDefault();
            } else if (sheet.scrollTop <= 0 && dragStartY.current !== null) {
                const touchY = e.touches[0].clientY;
                if (touchY > dragStartY.current) {
                    if (e.cancelable) e.preventDefault();
                }
            }
        };

        // 브라우저의 기본 동작을 막기 위해 passive: false 필수
        sheet.addEventListener('touchmove', preventNativeScroll, { passive: false });
        
        return () => {
            sheet.removeEventListener('touchmove', preventNativeScroll);
        };
    }, []);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        const isHandle = target.closest('.sticky') !== null;
        
        isHandleDrag.current = isHandle;
        dragStartY.current = e.clientY;
        isDragging.current = false;
        
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (dragStartY.current === null) return;

        const deltaY = e.clientY - dragStartY.current;
        const sheet = sheetRef.current;
        if (!sheet) return;

        // 아래로 내리면서, 핸들을 클릭했거나 스크롤이 최상단일 때만 드래그
        const canDrag = deltaY > 0 && (isHandleDrag.current || sheet.scrollTop <= 0);

        if (canDrag) {
            isDragging.current = true;
            sheet.style.overflowY = 'hidden';
            sheet.style.transition = 'none';
            sheet.style.transform = `translateY(${deltaY}px)`;
        } else if (isDragging.current) {
            // 위로 올리거나 드래그 불가 상황으로 전환될 때 리셋
            resetDrag();
        }
    };

    const resetDrag = () => {
        const sheet = sheetRef.current;
        if (sheet) {
            sheet.style.overflowY = '';
            sheet.style.transition = '';
            sheet.style.transform = '';
        }
        dragStartY.current = null;
        isHandleDrag.current = false;
        isDragging.current = false;
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (dragStartY.current === null) return;
        
        e.currentTarget.releasePointerCapture(e.pointerId);

        const deltaY = e.clientY - dragStartY.current;
        const sheet = sheetRef.current;
        
        if (isDragging.current && sheet) {
            const threshold = sheet.clientHeight * 0.3;
            if (deltaY > threshold) {
                onDismiss?.();
            }
        }
        resetDrag();
    };

    return (
        <div
            ref={sheetRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={resetDrag}
            className={clsx(
                "expanded:hidden absolute bottom-0 left-0 right-0 w-full h-2/3", 
                isVisible ? 'translate-y-0' : 'translate-y-full',
                "overflow-y-scroll bg-inverse-surface text-inverse-on-surface",
                "scrollbar-track-transparent scrollbar-thumb-inverse-on-surface/30",
                "transition-transform duration-1500",
            )}
        >
            <div className="sticky top-0 w-full py-5.5 flex justify-center bg-inverse-surface z-1 select-none">
                <span className="w-8 h-1 rounded-full bg-inverse-on-surface" />
            </div>

            <div className="px-6 pb-24">
                <DocentContent artwork={artwork} />
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  DocentSheetSide (Expanded, Large, Extra Large)                            */
/* -------------------------------------------------------------------------- */

function DocentSheetSide({ artwork, isVisible, onDismiss }: { artwork: Artwork; isVisible: boolean, onDismiss?: () => void }) {
    return (
        <div
            className={clsx(
                "hidden expanded:flex",
                `absolute top-0 -right-100 w-100 h-full`,
                `bg-inverse-surface text-inverse-on-surface overflow-x-hidden overflow-y-scroll
                scrollbar-track-transparent scrollbar-thumb-inverse-on-surface/30
                transition-[translate] duration-1500`,
                isVisible ? "-translate-x-full" : "translate-x-0",
            )}
        >
            {/* 레이아웃 재계산 방지용 Wrapper */}
            <div className="min-w-100 h-fit p-6">
                <DocentContent artwork={artwork} />
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  DocentSheet (Public API)                                                  */
/* -------------------------------------------------------------------------- */

export type DocentSheetProps = {
    artwork: Artwork;
    isVisible: boolean;
    onDismiss?: () => void;
};

export function DocentSheet({ artwork, isVisible, onDismiss }: DocentSheetProps) {
    return (
        <>
            <DocentSheetBottom artwork={artwork} isVisible={isVisible} onDismiss={onDismiss} />
            <DocentSheetSide artwork={artwork} isVisible={isVisible} onDismiss={onDismiss} />
        </>
    );
}