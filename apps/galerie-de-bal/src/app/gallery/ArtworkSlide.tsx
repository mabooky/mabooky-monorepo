import clsx from "clsx";
import { type Artwork, type CanvasFormat } from "@/types/artwork";
import { Plaque } from "./Plaque";
import { CSSProperties } from "react";

function plaqueClassNamesFor(format: CanvasFormat): string {
    switch (format) {
        case 'portrait':
            // 르 포르트레: 하단 정중앙 부착
            return "bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc((4+56+8)/16*1rem)]";
        case 'paysage':
            // 르 페이자주: 우측 하단 벽면
            return "bottom-0 left-full ml-6";
        case 'carre':
            // 르 카레 수블림: 좌측 상단 벽면
            return "top-0 right-full mr-6";
        case 'marine':
            // 라 마린: 하단 멀찍이 떨어진 우측 정렬
            return "bottom-0 right-0 translate-y-[calc(100%+16/16*1rem)]";

        default:
            return "bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc((4+56+8)/16*1rem)]";
    }
}

function plaqueAlignmentFor(format: CanvasFormat): 'start' | 'center' | 'end' {
    switch (format) {
        case 'portrait':
            return 'center';
        case 'paysage':
            return 'start';
        case 'carre':
            return 'end';
        case 'marine':
            return 'end';

        default:
            return 'center';
    }
}

export type ArtworkSlideProps = {
    artwork: Artwork;
    isDocentVisible: boolean;
    onToggleDocent: () => void;
};

export function ArtworkSlide({ artwork, isDocentVisible, onToggleDocent }: ArtworkSlideProps) {
    const r = artwork.metadata.height / artwork.metadata.width;
    return (
        // 스냅 컨테이너 내부에 있는 화면 크기의 각 컨테이너
        <div className="shrink-0 relative w-full h-full snap-center snap-always">

            {/* 작품과 해설 플레이트 미니어처를 딱 맞게 감싸는 컨테이너 */}
            <div
                style={{
                    // 기본 상태(0)
                    '--x0': 'calc(50dvw - 50%)',
                    // DocentRemote 상하 여백: 16dp, 높이: 64dp
                    '--remote_box': 'calc((16 + 64 + 16) / 16 * 1rem)',
                    '--y0': 'calc((100dvh - var(--remote_box)) / 2 - 50%)',

                    // medium 이하에서 바텀 시트가 열렸을 때의 상태(1)
                    '--img_h0': `min(80dvw * ${r}, 50dvh)`,
                    '--art_h0': 'calc(var(--img_h0) + 8px)', // 8px는 액자 프레임 상하 테두리
                    '--art_mb1': 'calc(16 / 16 * 1rem)',
                    '--art_s1': 'min(1, (100dvh / 3 - var(--art_mb1) * 2) / var(--art_h0))',
                    '--art_h1': 'calc(var(--art_h0) * var(--art_s1))',
                    '--y1': 'calc((100dvh / 3) / 2 - var(--art_h1) / 2)',
                    '--s1': 'var(--art_s1)',

                    // expanded 이상에서 사이드 시트가 열렸을 때의 상태(2)
                    '--img_w0': `min(80dvw, 50dvh / ${r})`,
                    '--art_w0': 'calc(var(--img_w0) + 8px)', // 8px는 액자 프레임 좌우 테두리
                    '--side-sheet_w': 'calc(400 / 16 * 1rem)',
                    '--art_mi2': 'calc(24 / 16 * 1rem)',
                    '--art_s2': 'min(1, (100dvw - var(--side-sheet_w) - var(--art_mi2) * 2) / var(--art_w0))',
                    '--art_w2': 'calc(var(--art_w0) * var(--art_s2))',
                    '--x2': 'calc((100dvw - var(--side-sheet_w)) / 2 - var(--art_w2) / 2)',
                    '--s2': 'var(--art_s2)',

                    // '--_w_img': `min(80dvw, 50dvh / ${r})`,
                    // '--_w_art': `calc(var(--_w_img) + 8px)`, // 8px는 .picture-frame 클래스의 좌우 border 길이
                    // '--_w_art-scale': `min(1, (100dvw - 400 / 16 * 1rem - 48 / 16 * 1rem) / var(--_w_art))`,
                    // '--_w_art-scaled': `calc(var(--_w_art) * var(--_w_art-scale))`,
                    // '--_x_art-translated': `calc(-1 * (50dvw - 50%) + (100dvw - 400 / 16 * 1rem) / 2 - var(--_w_art-scaled) / 2)`,
                } as CSSProperties}
                className={clsx(
                    "absolute top-0 left-0 origin-top expanded:origin-left", 
                    "flex flex-col justify-center items-center gap-2 transition-[translate,scale]", 
                    "duration-1500",
                    // 기본 상태(0)
                    "translate-x-(--x0) translate-y-(--y0)",
                    // medium 이하에서 바텀 시트가 열렸을 때의 상태(1)
                    "max-expanded:data-is-sheet-open:translate-y-(--y1)", 
                    "max-expanded:data-is-sheet-open:scale-(--s1)",
                    // expanded 이상에서 사이드 시트가 열렸을 때의 상태(2)
                    "expanded:data-is-sheet-open:translate-x-(--x2)", 
                    "expanded:data-is-sheet-open:scale-(--s2)"
                )}
                data-is-sheet-open={isDocentVisible ? true : undefined}
            >
                <div className="picture-frame">
                    <img
                        className="max-w-[80dvw] max-h-[50dvh] object-contain select-none cursor-pointer"
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        draggable="false"
                        onClick={onToggleDocent}
                    />
                </div>

                <Plaque
                    style={{
                        opacity: isDocentVisible ? 0 : 1,
                        visibility: isDocentVisible ? 'hidden' : 'visible',
                        transition: 'opacity 1.5s, visibility 0s linear ' + (isDocentVisible ? '1.5s' : '0s')
                    }}
                    className=""
                    onClick={onToggleDocent}
                />
            </div>

        </div>
    );
}