'use client';

import clsx from "clsx";
import { type Artwork, type CanvasFormat } from "@/types/artwork";
import { Plaque } from "./Plaque";
import { CSSProperties, useCallback, useEffect, useRef } from "react";

export type ArtworkSlideProps = {
    artwork: Artwork;
    isDocentSheetOpen: boolean;
    onToggleDocent: () => void;
};

export function ArtworkSlide({ artwork, isDocentSheetOpen, onToggleDocent }: ArtworkSlideProps) {
    const slideRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    // 이미지 가용 공간 산출 및 상한 적용된 크기 계산(object-contain)
    const handleResize = useCallback(() => {
        if (!slideRef.current || !containerRef.current || !imgRef.current) return;

        const imgMaxW = slideRef.current.clientWidth * 0.8; // 80dvw
        const imgMaxH = slideRef.current.clientHeight * 0.5; // 50dvh

        const imgNaturalW = imgRef.current.naturalWidth;
        const imgNaturalH = imgRef.current.naturalHeight;

        let imgW, imgH;
        if (imgNaturalW === 0 || imgNaturalH === 0) {
            // 이 경우 엑스박스 + 대체 텍스트의 실제 크기를 획득
            // 소수점 정밀도를 위해 getBoudingClientRect 활용
            const imgRect = imgRef.current.getBoundingClientRect();
            imgW = Math.ceil(imgRect.width);
            imgH = Math.ceil(imgRect.height);
        }
        else {
            const scaleToClamp = Math.min(1, imgMaxW / imgNaturalW, imgMaxH / imgNaturalH);
            
            imgW = imgNaturalW * scaleToClamp;
            imgH = imgNaturalH * scaleToClamp;
        }    

        imgRef.current.style.width = `${imgW}px`;
        imgRef.current.style.height = `${imgH}px`;

        containerRef.current.style.setProperty('--img_w0', `${imgW}px`);
        containerRef.current.style.setProperty('--img_h0', `${imgH}px`);
        // 크기 FOUC 방지를 위해 최초에는 opacity-0이 적용되어 있음
        containerRef.current.style.opacity = '1';
    }, []);

    useEffect(() => {
        if (!slideRef.current) return;

        const observer = new ResizeObserver(handleResize);
        observer.observe(slideRef.current);

        return () => {
            observer.disconnect();
        };
    }, [handleResize]);

    return (
        // 스냅 컨테이너 내부에 있는 화면 크기의 각 컨테이너
        <div 
            ref={slideRef}
            className="shrink-0 relative w-full h-full snap-center snap-always"
        >

            {/* 작품과 해설 플레이트 미니어처를 딱 맞게 감싸는 컨테이너 */}
            <div
                ref={containerRef}
                style={{
                    // 기본 상태(0)
                    '--x0': 'calc(50dvw - 50%)',
                    // DocentRemote 상하 여백: 16dp, 높이: 64dp
                    '--remote_h': 'calc(64 / 16 * 1rem)',
                    '--remote_mx': 'calc((16 + 16) / 16 * 1rem)',
                    '--y0': 'calc((100dvh - (var(--remote_h) + var(--remote_mx))) / 2 - 50%)',

                    // medium 이하에서 바텀 시트가 열렸을 때의 상태(1)
                    // --img_h0 변수가 JS 단에서 주입되어 활용 가능
                    '--art_h0': 'calc(var(--img_h0) + 8px)', // 8px는 액자 프레임 상하 테두리
                    '--art_my1': 'calc(16 / 16 * 1rem)',
                    '--art_s1': 'min(1, (100dvh / 3 - var(--art_my1) * 2) / var(--art_h0))',
                    '--art_h1': 'calc(var(--art_h0) * var(--art_s1))',
                    '--y1': 'calc((100dvh / 3) / 2 - var(--art_h1) / 2)',
                    '--s1': 'var(--art_s1)',

                    // expanded 이상에서 사이드 시트가 열렸을 때의 상태(2)
                    // --img_w0 변수가 JS 단에서 주입되어 활용 가능
                    '--art_w0': 'calc(var(--img_w0) + 8px)', // 8px는 액자 프레임 좌우 테두리
                    '--side-sheet_w': 'calc(400 / 16 * 1rem)',
                    '--art_mx2': 'calc(24 / 16 * 1rem)',
                    '--art_s2': 'min(1, (100dvw - var(--side-sheet_w) - var(--art_mx2) * 2) / var(--art_w0))',
                    '--art_w2': 'calc(var(--art_w0) * var(--art_s2))',
                    '--x2': 'calc((100dvw - var(--side-sheet_w)) / 2 - var(--art_w2) / 2)',
                    '--s2': 'var(--art_s2)',
                } as CSSProperties}
                className={clsx(
                    "absolute top-0 left-0 origin-top expanded:origin-left",
                    "flex flex-col justify-center items-center gap-2 transition-[translate,scale]",
                    "duration-1500 opacity-0",
                    // 기본 상태(0)
                    "translate-x-(--x0) translate-y-(--y0)",
                    // medium 이하에서 바텀 시트가 열렸을 때의 상태(1)
                    "data-is-docent-sheet-open:max-expanded:translate-y-(--y1)",
                    "data-is-docent-sheet-open:max-expanded:scale-(--s1)",
                    // expanded 이상에서 사이드 시트가 열렸을 때의 상태(2)
                    "data-is-docent-sheet-open:expanded:translate-x-(--x2)",
                    "data-is-docent-sheet-open:expanded:scale-(--s2)"
                )}
                data-is-docent-sheet-open={isDocentSheetOpen ? true : undefined}
            >
                <div 
                    className="w-fit h-fit picture-frame cursor-pointer"
                    onClick={onToggleDocent}
                >
                    <img
                        ref={imgRef}
                        className="select-none"
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        draggable="false"
                        onLoad={handleResize}
                        onError={handleResize}
                    />
                </div>

                <Plaque
                    style={{
                        opacity: isDocentSheetOpen ? 0 : 1,
                        visibility: isDocentSheetOpen ? 'hidden' : 'visible',
                        transition: 'opacity 1.5s, visibility 0s linear ' + (isDocentSheetOpen ? '1.5s' : '0s')
                    }}
                    className="shadow-elevation-level5"
                    onClick={onToggleDocent}
                />
            </div>

        </div>
    );
}