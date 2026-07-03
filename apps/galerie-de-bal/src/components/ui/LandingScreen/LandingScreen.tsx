"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function LandingScreen() {
  const [isEntered, setIsEntered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleEnter = () => {
    setIsEntered(true);
    
    // Play audio
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(e => console.error("Audio playback failed", e));
      
      // Fade in
      let vol = 0;
      const interval = setInterval(() => {
        if (vol < 0.5) {
          vol += 0.05;
          if (audioRef.current) audioRef.current.volume = vol;
        } else {
          clearInterval(interval);
        }
      }, 200);
    }

    // After animation finishes, navigate to gallery
    setTimeout(() => {
      router.push("/gallery");
    }, 3000); // 3 seconds door open animation
  };

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center transition-[background] duration-100 ease-out bg-[#050505]"
      style={{
        background: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 215, 100, 0.10), transparent 80%), #050505`
      }}
    >
      {/* Door elements */}
      <div className={`absolute top-0 w-[50vw] h-screen bg-[#1a1a1a] bg-gradient-to-r from-[#111] to-[#1a1a1a] border-2 border-[#333] transition-transform duration-[3s] [transition-timing-function:cubic-bezier(0.25,0.1,0.25,1)] z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center left-0 border-r-2 border-r-[#a88d59] origin-left ${isEntered ? "[transform:perspective(1500px)_rotateY(-110deg)]" : ""}`}>
        <div className="w-[70%] h-[80%] border-2 border-[#333] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"></div>
      </div>
      
      <div className={`absolute top-0 w-[50vw] h-screen bg-[#1a1a1a] bg-gradient-to-r from-[#111] to-[#1a1a1a] border-2 border-[#333] transition-transform duration-[3s] [transition-timing-function:cubic-bezier(0.25,0.1,0.25,1)] z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center right-0 border-l-2 border-l-[#a88d59] origin-right ${isEntered ? "[transform:perspective(1500px)_rotateY(110deg)]" : ""}`}>
        <div className="w-[70%] h-[80%] border-2 border-[#333] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"></div>
      </div>

      {/* Wax Seal Button */}
      {!isEntered && (
        <button 
          className="absolute z-20 w-[140px] h-[140px] bg-[radial-gradient(circle_at_30%_30%,#b31b1b,#6b0f0f)] rounded-full border-none cursor-pointer shadow-[inset_0_-5px_15px_rgba(0,0,0,0.5),0_10px_20px_rgba(0,0,0,0.6),0_0_40px_rgba(255,215,100,0.2)] flex items-center justify-center transition-[transform,box-shadow] duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] overflow-hidden hover:scale-108 hover:shadow-[inset_0_-5px_15px_rgba(0,0,0,0.5),0_15px_30px_rgba(0,0,0,0.8),0_0_60px_rgba(255,215,100,0.3)]"
          onClick={handleEnter}
        >
          <div className="absolute w-[110px] h-[110px] border-2 border-dashed border-[rgba(255,215,100,0.4)] rounded-full pointer-events-none" />
          <span className="text-[rgba(255,215,100,0.9)] font-serif text-[1.8rem] italic font-bold [text-shadow:1px_1px_3px_rgba(0,0,0,0.8)] z-10">입장</span>
        </button>
      )}
      
      {/* Welcome Text */}
      <div 
        className="absolute top-[15%] text-center text-[#a88d59] z-20 transition-opacity duration-1000 ease-in-out pointer-events-none" 
        style={{ opacity: isEntered ? 0 : 1, pointerEvents: isEntered ? 'none' : 'auto' }}
      >
        <h1 className="font-serif text-[4.5rem] mb-4 tracking-[0.2em] uppercase [text-shadow:0_4px_20px_rgba(0,0,0,0.9)]">Galerie de Bal</h1>
        <p className="font-sans text-[1.2rem] tracking-[0.1em] text-[#ddd] [text-shadow:0_2px_10px_rgba(0,0,0,0.8)]">현대미술의 숭고함, 그리고 당신의 발그림</p>
      </div>
    </div>
  );
}
