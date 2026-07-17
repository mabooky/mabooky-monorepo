import { ComponentProps, useEffect, useRef, useState } from "react";
import { Button, IconButton } from "@mabooky/md3";
import clsx from "clsx";
import { useBgm } from "../BgmProvider";

export type DocentRemoteProps = ComponentProps<'div'> & {
    currentIndex: number;
    totalCount: number;
    audioUrl?: string | null;
    onPrev: () => void;
    onNext: () => void;
};

export function DocentRemote({
    className,
    currentIndex,
    totalCount,
    audioUrl,
    onPrev,
    onNext,
}: DocentRemoteProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const playBackTimesRef = useRef<Map<string, number>>(new Map());
    const [isPlaying, setIsPlaying] = useState(false);
    const { duckVolume, restoreVolume } = useBgm();

    useEffect(() => {
        setIsPlaying(false);
        if (audioRef.current) {
            audioRef.current.pause();
        }
        restoreVolume();
    }, [audioUrl, restoreVolume]);

    useEffect(() => {
        return () => {
            restoreVolume();
        };
    }, [restoreVolume]);

    const toggleAudio = () => {
        if (!audioRef.current || !audioUrl) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            restoreVolume();
        } else {
            audioRef.current.play().catch(console.error);
            setIsPlaying(true);
            duckVolume();
        }
    };

    const stopAudio = () => {
        if (!audioRef.current) return;

        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
    }

    return (
        <div 
            className={clsx(
                "w-max h-16 p-2 flex items-center gap-1",
                "rounded-full bg-surface-container shadow-(--md3-shadow-elevation-level3)",
                className
            )}
        >
            <IconButton 
                variant="standard" 
                onClick={onPrev} 
                disabled={currentIndex === 0}
            >
                <IconButton.Icon>skip_previous</IconButton.Icon>
            </IconButton>

            <Button
                variant="filled"
                onClick={toggleAudio}
                disabled={!audioUrl}
            >
                <Button.Icon>{isPlaying ? "pause" : "play_arrow"}</Button.Icon>
                <Button.Label>해설 재생</Button.Label>
            </Button>

            <IconButton
                variant="filled"
                onClick={stopAudio}
            >
                <IconButton.Icon>stop</IconButton.Icon>
            </IconButton>

            <span className="text-label-large tabular-nums font-medium px-2 min-w-[3rem] text-center text-on-surface">
                {currentIndex + 1} / {totalCount}
            </span>

            <IconButton 
                variant="standard" 
                onClick={onNext} 
                disabled={currentIndex === totalCount - 1}
            >
                <IconButton.Icon>skip_next</IconButton.Icon>
            </IconButton>

            {audioUrl && (
                <audio 
                    ref={audioRef} 
                    src={audioUrl} 
                    onTimeUpdate={() => {
                        if (audioRef.current) {
                            playBackTimesRef.current.set(audioUrl, audioRef.current.currentTime);
                        }
                    }}
                    onLoadedMetadata={() => {
                        if (audioRef.current) {
                            audioRef.current.currentTime = playBackTimesRef.current.get(audioUrl) || 0;
                        }
                    }}
                    onEnded={() => {
                        setIsPlaying(false);
                        restoreVolume();
                        playBackTimesRef.current.set(audioUrl, 0);
                    }} 
                />
            )}
        </div>
    );
}
