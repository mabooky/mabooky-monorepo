"use client";

import { useState, useEffect } from "react";
import { IconButton } from "@mabooky/md3";
import clsx from "clsx";

export type AudioControlProps = {
    /** 오디오의 총 길이 (초 단위) */
    duration: number;
    /** 오디오의 현재 재생 시간 (초 단위) */
    currentTime: number;
    /** 오디오의 현재 재생 중 여부 */
    isPlaying: boolean;
    /** 재생/일시정지 토글 콜백 */
    onTogglePlay: () => void;
    /** 슬라이더 조작(드래그) 완료 시 호출될 콜백 */
    onSeek: (time: number) => void;
    /** 외부 레이아웃 스타일링을 위한 클래스 */
    className?: string;
};

function formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function AudioControl({
    duration,
    currentTime,
    isPlaying,
    onTogglePlay,
    onSeek,
    className,
}: AudioControlProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [localTime, setLocalTime] = useState(0);

    // 외부(오디오 객체)로부터 전달받은 currentTime을 로컬 상태에 동기화
    // 단, 사용자가 드래그(조작) 중일 때는 UI 떨림 방지를 위해 동기화를 무시 (Drag Lock)
    useEffect(() => {
        if (!isDragging) {
            setLocalTime(currentTime);
        }
    }, [currentTime, isDragging]);

    const percent = duration > 0 ? (localTime / duration) * 100 : 0;

    const handlePointerDown = () => {
        setIsDragging(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalTime(Number(e.target.value));
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLInputElement>) => {
        setIsDragging(false);
        onSeek(Number(e.currentTarget.value));
    };
    
    // 키보드 방향키(좌우)를 이용한 탐색 완료 대응
    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            onSeek(Number(e.currentTarget.value));
        }
    };

    return (
        <div 
            className={clsx(
                "flex items-center gap-3 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container",
                className
            )}
        >
            <IconButton 
                variant="standard" 
                onClick={onTogglePlay}
                className="text-on-primary-container"
            >
                <IconButton.Icon>{isPlaying ? "pause" : "play_arrow"}</IconButton.Icon>
            </IconButton>

            <div className="relative flex-1 flex items-center h-11">
                {/* 활성 트랙 (왼쪽) */}
                <div 
                    className="absolute left-0 h-1 bg-on-primary-container rounded-full pointer-events-none" 
                    style={{ width: `max(0px, calc(${percent}% - 6px))` }} 
                />

                {/* 핸들 (재생 헤드) */}
                <div 
                    className="absolute w-1 h-11 bg-on-primary-container rounded-full pointer-events-none -translate-x-1/2"
                    style={{ left: `${percent}%` }}
                />

                {/* 비활성 트랙 (오른쪽) */}
                <div 
                    className="absolute right-0 h-1 bg-on-primary-container/30 rounded-full pointer-events-none" 
                    style={{ width: `max(0px, calc(${100 - percent}% - 6px))` }} 
                />

                {/* Logical Layer: 실제 이벤트를 가로채는 투명 인풋 덮어씌우기 */}
                <input
                    type="range"
                    min="0"
                    max={duration || 100} // duration이 0이거나 NaN일 경우 대비
                    step="0.01"
                    value={localTime}
                    onPointerDown={handlePointerDown}
                    onChange={handleChange}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    onKeyUp={handleKeyUp}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 md3-min-touch-target"
                />
            </div>

            <span className="text-label-medium tabular-nums font-medium shrink-0 px-1 text-on-primary-container">
                {formatTime(localTime)} / {formatTime(duration)}
            </span>
        </div>
    );
}
