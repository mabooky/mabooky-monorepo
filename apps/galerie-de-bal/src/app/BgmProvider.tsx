"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface BgmContextType {
    playWithFadeIn: () => void;
    duckVolume: () => void;
    restoreVolume: () => void;
}

const BgmContext = createContext<BgmContextType | null>(null);

export function useBgm() {
    const context = useContext(BgmContext);
    if (!context) {
        throw new Error("useBgm must be used within a BgmProvider");
    }
    return context;
}

export function BgmProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const audioRef = useRef<HTMLAudioElement>(null);
    const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const playWithFadeIn = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
        }

        if (audio.paused) {
            audio.volume = 0;
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        let vol = 0;
                        fadeIntervalRef.current = setInterval(() => {
                            if (vol < 1.0) {
                                vol += 0.05;
                                if (audio) audio.volume = Math.min(vol, 1.0);
                            } else {
                                if (fadeIntervalRef.current) {
                                    clearInterval(fadeIntervalRef.current);
                                }
                            }
                        }, 200);

                        document.removeEventListener("pointerdown", handleUserGesture);
                        document.removeEventListener("keydown", handleUserGesture);
                    })
                    .catch(() => {});
            }
        }
    };

    const duckVolume = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
        }

        let vol = audio.volume;
        fadeIntervalRef.current = setInterval(() => {
            if (vol > 0.2) {
                vol -= 0.05;
                if (audio) audio.volume = Math.max(vol, 0.2);
            } else {
                if (fadeIntervalRef.current) {
                    clearInterval(fadeIntervalRef.current);
                }
            }
        }, 100);
    };

    const restoreVolume = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
        }

        let vol = audio.volume;
        fadeIntervalRef.current = setInterval(() => {
            if (vol < 1.0) {
                vol += 0.05;
                if (audio) audio.volume = Math.min(vol, 1.0);
            } else {
                if (fadeIntervalRef.current) {
                    clearInterval(fadeIntervalRef.current);
                }
            }
        }, 150);
    };

    const handleUserGesture = () => {
        playWithFadeIn();
    };

    useEffect(() => {
        console.log(pathname);
        // 사용자가 gallery 경로로 바로 접속했을 경우를 대비하여 배경음악 자동 재생 처리
        if (pathname === "/gallery/") {
            // 자동 재생이 허용된 상황일 수도 있으므로 재생 시도
            // 거부되더라도 playWithFadeIn 내부의 catch 블록에서 안전하게 처리됨
            playWithFadeIn();

            document.addEventListener("pointerdown", handleUserGesture, { passive: true });
            document.addEventListener("keydown", handleUserGesture, { passive: true });
        }

        return () => {
            if (fadeIntervalRef.current) {
                clearInterval(fadeIntervalRef.current);
            }
            document.removeEventListener("pointerdown", handleUserGesture);
            document.removeEventListener("keydown", handleUserGesture);
        };
    }, [pathname]);

    return (
        <BgmContext.Provider value={{ playWithFadeIn, duckVolume, restoreVolume }}>
            {children}
            <audio 
                ref={audioRef} 
                loop 
                preload="auto" 
                src="https://d3m0nnwzf3owx5.cloudfront.net/apps/galerie-de-bal/production/audios/nocturne-op9-no2.webm" 
            />
        </BgmContext.Provider>
    );
}
