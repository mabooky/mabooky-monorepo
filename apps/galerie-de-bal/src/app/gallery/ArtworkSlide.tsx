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
        <div className="shrink-0 relative w-full h-full flex flex-col justify-center items-center snap-center snap-always">

            <div 
                style={{
                    '--_h_img': `min(80dvw * ${r}, 50dvh)`,
                    '--_h_art': `calc(var(--_h_img) + 8px)`, // 8px는 .picture-frame 클래스의 위아래 border 길이
                    // 48dp는 Bottom sheet 열릴 시 작품 위아래 바깥 여백
                    '--_h_art-scale': `min(1, (100dvh / 3 - 48 / 16 * 1rem) / var(--_h_art))`,
                    '--_h_art-scaled': `calc(var(--_h_art) * var(--_h_art-scale))`,
                    '--_y_art-translated': `calc(-1 * (50dvh - 50%) + (100dvh / 6 - var(--_h_art-scaled) / 2))`,

                    '--_w_img': `min(80dvw, 50dvh / ${r})`,
                    '--_w_art': `calc(var(--_w_img) + 8px)`, // 8px는 .picture-frame 클래스의 좌우 border 길이
                    '--_w_art-scale': `min(1, (100dvw - 400 / 16 * 1rem - 48 / 16 * 1rem) / var(--_w_art))`,
                    '--_w_art-scaled': `calc(var(--_w_art) * var(--_w_art-scale))`,
                    '--_x_art-translated': `calc(-1 * (50dvw - 50%) + (100dvw - 400 / 16 * 1rem) / 2 - var(--_w_art-scaled) / 2)`,
                } as CSSProperties}
                className={clsx(
                    `relative flex flex-col justify-center items-center gap-2 transition-[translate,scale] duration-[1.5s]
                    origin-top expanded:origin-left
                    max-expanded:data-[transformed=true]:translate-y-(--_y_art-translated)
                    max-expanded:data-[transformed=true]:scale-(--_h_art-scale)
                    expanded:data-[transformed=true]:translate-x-(--_x_art-translated)
                    expanded:data-[transformed=true]:scale-(--_w_art-scale)`,
                )}
                data-transformed={isDocentVisible}
            >
                <div className="picture-frame">
                    <img
                        // @ts-expect-error: WebkitUserDrag 속성이 없다고 나옴
                        style={{ WebkitUserDrag: 'none' }}
                        className="max-w-[80dvw] max-h-[50dvh] object-contain select-none cursor-pointer"
                        src={artwork.imageUrl}
                        alt={artwork.title}
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