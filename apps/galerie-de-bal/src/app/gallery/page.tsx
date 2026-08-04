"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import "./styles.css";
import { Artwork } from "@/types/artwork";
import { DocentSheet } from "./DocentSheet";
import { ArtworkSlide } from "./ArtworkSlide";
import { ArtworkNavigationToolbar } from "./ArtworkNavigationToolbar";
import clsx from "clsx";
import { artworks } from "./artworks";
import { useBgm } from "../BgmProvider";

export default function GalleryPage() {
    const [currentArt, setCurrentArt] = useState<Artwork>(artworks[0]);
    const [isDocentSheetOpen, setIsDocentSheetOpen] = useState(false);
    const [isDocentAudioPlaying, setIsDocentAudioPlaying] = useState(false);

    const { duckVolume, restoreVolume } = useBgm();

    const audioRef = useRef<HTMLAudioElement>(null);
    const playbackTimesRef = useRef<Map<string, number>>(new Map());

    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        setIsDocentAudioPlaying(false);
        setDuration(0);
        setCurrentTime(0);
        if (audioRef.current) {
            audioRef.current.pause();
        }
        restoreVolume();
    }, [currentArt.docentAudioUrl, restoreVolume]);

    useEffect(() => {
        return () => restoreVolume();
    }, [restoreVolume]);

    const toggleAudio = () => {
        if (!audioRef.current) return;
        
        if (isDocentAudioPlaying) {
            audioRef.current.pause();
            setIsDocentAudioPlaying(false);
            restoreVolume();
        } else {
            audioRef.current.play().catch(console.error);
            setIsDocentAudioPlaying(true);
            duckVolume();
        }
    };
    
    const handleSeek = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

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
            className="relative w-full h-full overflow-hidden"
        >
            {/* Main Pane */}
            <main className="relative w-full h-full">
                {/* Carousel */}
                <div 
                    ref={carouselRef}
                    className="w-full h-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory scrollbar-none">

                    {artworks.map((artwork) => (
                        <ArtworkSlide
                            key={artwork.id}
                            artwork={artwork}
                            isDocentSheetOpen={isDocentSheetOpen}
                            onToggleDocent={() => setIsDocentSheetOpen(prev => !prev)}
                        />
                    ))}

                </div>

                {/* 인터랙션 안내 문구, 리모컨, 조명 translate용 컨테이너 */}
                <div 
                    style={{
                        // 기본 상태(0)
                        '--x0': 'calc(50dvw - 50%)',

                        // expanded 이상에서 사이드 시트가 열렸을 때의 상태(2)
                        '--side-sheet_w': 'calc(400 / 16 * 1rem)',
                        '--x2': 'calc((100dvw - var(--side-sheet_w)) / 2 - 50%)',
                    } as CSSProperties}
                    className={clsx(
                        "absolute inset-0 w-full h-full transition-[translate] duration-1500 pointer-events-none", 
                        // 기본 상태(0)
                        "translate-x-(--x0)",
                        // expanded 이상에서 사이드 시트가 열렸을 때의 상태(2)
                        "expanded:data-is-docent-sheet-open:translate-x-(--x2)"
                    )}
                    data-is-docent-sheet-open={isDocentSheetOpen ? true : undefined}
                >
                    {/* 인터랙션 안내 문구*/}
                    <p
                        style={{
                            opacity: isDocentSheetOpen ? 0 : 1,
                            visibility: isDocentSheetOpen ? "hidden" : "visible",
                            transition: "opacity 1.5s, visibility 0s linear " + (isDocentSheetOpen ? "1.5s" : "0s")
                        }}
                        className={clsx(
                            "absolute w-max bottom-24 left-1/2 -translate-x-1/2 text-on-surface text-title-small", 
                            "text-center pointer-events-auto",
                        )}
                    >
                        작품 하단의 플레이트를 클릭하면
                        {/* medium 이상부터 공백을 표시하고 줄바꿈 제거 */}
                        <span className="hidden medium:inline"> </span>
                        <span className="medium:hidden"><br /></span>
                        작품 정보와 해설 본문을 확인할 수 있습니다.
                    </p>

                    <ArtworkNavigationToolbar
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto"
                        currentIndex={currentIndex}
                        totalCount={artworks.length}
                        onPrev={handlePrev}
                        onNext={handleNext}
                    /> 

                    {/* 조명 */}
                    <span className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_50%_0,#fff5d285_0%,#ffebbe36_30%,#0000_80%)]" />
                </div>
            </main>

            {/* Compact, Medium: Bottom Sheet / Expanded, Large, Extra Large: Side Sheet */}
            <DocentSheet 
                artwork={currentArt} 
                isVisible={isDocentSheetOpen} 
                onDismiss={() => setIsDocentSheetOpen(false)}
                duration={duration}
                currentTime={currentTime}
                isPlaying={isDocentAudioPlaying}
                onTogglePlay={toggleAudio}
                onSeek={handleSeek}
            />

            <audio 
                ref={audioRef} 
                src={currentArt.docentAudioUrl}
                preload="metadata"
                onDurationChange={() => {
                    if (audioRef.current && !isNaN(audioRef.current.duration)) {
                        setDuration(audioRef.current.duration);
                    }
                }}
                onLoadedMetadata={() => {
                    if (audioRef.current) {
                        audioRef.current.currentTime = playbackTimesRef.current.get(currentArt.docentAudioUrl) || 0;
                        setCurrentTime(audioRef.current.currentTime);
                    }
                }}
                onTimeUpdate={() => {
                    if (audioRef.current) {
                        setCurrentTime(audioRef.current.currentTime);
                        playbackTimesRef.current.set(currentArt.docentAudioUrl, audioRef.current.currentTime);
                    }
                }}
                onEnded={() => {
                    setIsDocentAudioPlaying(false);
                    restoreVolume();
                    playbackTimesRef.current.set(currentArt.docentAudioUrl, 0);
                }} 
            />
        </div>
    );
}