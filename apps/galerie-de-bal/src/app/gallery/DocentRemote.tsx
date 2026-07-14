import { useEffect, useRef, useState } from "react";
import { Button, IconButton } from "@mabooky/md3";
import clsx from "clsx";

export type DocentRemoteProps = {
    currentIndex: number;
    totalCount: number;
    audioUrl?: string | null;
    onPrev: () => void;
    onNext: () => void;
    className?: string;
};

export function DocentRemote({
    currentIndex,
    totalCount,
    audioUrl,
    onPrev,
    onNext,
    className,
}: DocentRemoteProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // "공간 제약" 룰: 오디오 URL이 바뀌면(작품을 넘기면) 즉각 정지
    useEffect(() => {
        setIsPlaying(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, [audioUrl]);

    const toggleAudio = () => {
        if (!audioRef.current || !audioUrl) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch(console.error);
            setIsPlaying(true);
        }
    };

    return (
        <div 
            className={clsx(
                "z-30 w-max h-16 p-2 flex items-center gap-1",
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
                    onEnded={() => setIsPlaying(false)} 
                />
            )}
        </div>
    );
}
