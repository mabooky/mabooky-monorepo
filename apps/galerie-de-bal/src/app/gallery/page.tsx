"use client";

import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { Artwork } from "@/types/artwork";
import { DocentSheet } from "./DocentSheet";
import { ArtworkSlide } from "./ArtworkSlide";
import { DocentRemote } from "./DocentRemote";
import clsx from "clsx";
import { artworks } from "./artworks";

export default function GalleryPage() {
    const [currentArt, setCurrentArt] = useState<Artwork>(artworks[0]);
    const [isDocentVisible, setIsDocentVisible] = useState(false);

    const currentIndex = artworks.findIndex(a => a.id === currentArt.id);

    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const snapContainer = carouselRef.current;
        if (!snapContainer) return;

        const handleScrollEnd = () => {
            const index = Math.round(snapContainer.scrollLeft / snapContainer.clientWidth);
            setCurrentArt(artworks[index]);
        }

        snapContainer.addEventListener('scrollend', handleScrollEnd);
        return () => {
            snapContainer.removeEventListener('scrollend', handleScrollEnd);
        };
    }, []);

    function handlePrev() {
        const snapContainer = carouselRef.current;
        if (!snapContainer) return;

        const newIndex = Math.max(0, Math.floor(snapContainer.scrollLeft / snapContainer.clientWidth) - 1);
        snapContainer.children[newIndex].scrollIntoView({ behavior: "smooth" });
    }

    function handleNext() {
        const snapContainer = carouselRef.current;
        if (!snapContainer) return;

        const newIndex = Math.min(artworks.length - 1, Math.ceil(snapContainer.scrollLeft / snapContainer.clientWidth) + 1);
        snapContainer.children[newIndex].scrollIntoView({ behavior: "smooth" });
    }

    return (
        /* Window */
        <div
            className="relative w-full h-full flex flex-col expanded:flex-row overflow-hidden"
        >
            {/* Main Pane */}
            <main
                /* after 요소를 사용하여 Spotlight Effect를 구현 */
                className={clsx(
                    "relative w-screen min-h-0 h-full",
                    "after:absolute after:inset-0 after:z-1 after:w-full after:h-full after:bg-[radial-gradient(circle_at_50%_0,#fff5d257_0%,#ffebbe1a_40%,#00000000_80%)] after:pointer-events-none"
                )}
            >
                {/* Carousel */}
                <div 
                    ref={carouselRef}
                    className="w-full h-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory scrollbar-none">

                    {artworks.map((artwork) => (
                        <ArtworkSlide
                            key={artwork.id}
                            artwork={artwork}
                            isDocentVisible={isDocentVisible}
                            onToggleDocent={() => setIsDocentVisible(!isDocentVisible)}
                        />
                    ))}

                </div>

                {/* 인터랙션 안내 문구*/}
                {/* <p
                    style={{
                        opacity: isDocentVisible ? 0 : 1,
                        visibility: isDocentVisible ? "hidden" : "visible",
                        transition: "opacity 1.5s, visibility 0s linear " + (isDocentVisible ? "1.5s" : "0s")
                    }}
                    className={clsx(
                        "absolute w-max bottom-24 left-1/2 -translate-x-1/2 text-on-surface text-title-small text-center",
                        "max-expanded:-translate-y-22",
                    )}
                >
                    작품 하단의 플레이트를 클릭하면 작품 정보와 해설을 확인할 수 있습니다.<br />
                </p> */}
            </main>

            <DocentRemote 
                className="absolute bottom-4 left-1/2 -translate-x-1/2"
                currentIndex={currentIndex}
                totalCount={artworks.length}
                audioUrl={currentArt.docentAudioUrl}
                onPrev={handlePrev}
                onNext={handleNext}
            />

            {/* Compact, Medium: Bottom Sheet / Expanded, Large, Extra Large: Side Sheet */}
            <DocentSheet artwork={currentArt} isVisible={isDocentVisible} onDismiss={() => setIsDocentVisible(false)} />
        </div>
    );
}