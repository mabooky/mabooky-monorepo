"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Divider, Icon, IconButton, StateLayer } from "@mabooky/md3";

import "./styles.css";

const artworks = [
    {
        id: 0,
        title: "기호학적 혼돈과 숭고의 타이포그래피",
        titleEng: "Semiotic Chaos and Typography of the Sublime",
        artist: {
            name: "익명의 거장",
            birthYear: 2026,
        },
        creationYear: 2026,
        medium: "웹 브라우저 캔버스 위 광학 마우스의 불규칙한 궤적과 순수 HTML5 픽셀",
        metadata: {
            width: 1920,
            height: 1080,
            dpi: 72,
            fileSize: "1.3MB",
        },
        docent: "이 작품은 시각적 도상(Icon)과 텍스트(Text)를 캔버스 위에서 폭력적으로 충돌시켜, 정보 과잉 시대에 현대인이 겪는 '인지적 과부하'를 신랄하게 해체한 팝아트적 포스트모더니즘의 걸작입니다.\n\n화면 좌측의 여백을 위태롭게 부유하는 네 개의 원초적 상징—파괴적인 번개, 날카롭게 날이 선 다각의 별, 강박적으로 맴도는 나선형의 소용돌이, 그리고 방향성을 상실한 파동—은 외부 세계로부터 우리에게 끊임없이 쏟아지는 무질서한 자극들을 은유합니다. 작가는 이 기호들을 어떠한 인과관계도, 논리적 연결 고리도 없이 투박하게 배치함으로써 현대 사회가 가진 '서사의 단절'과 '맥락의 상실'을 완벽에 가깝게 시각화해 냈습니다.\n\n그러나 이 작품의 진정한 천재성은 우측의 비대한 말풍선과 그 안을 가득 채운 \"엄청나다!!!!!\"라는 텍스트에 있습니다. 좌측의 복잡하고 압도적인 우주적 자극 앞에서 인간의 정교한 이성과 논리는 결국 기능을 상실하고 맙니다. 대신 오직 \"엄청나다\"라는 일차원적이고 미성숙한 감탄사로 퇴행하고 마는 현대인의 지성적 빈곤을 날카롭게 꼬집는 것이지요.\n\n특히 잉크가 뭉친 듯 거칠게 렌더링 된 폰트와 강박적으로 반복된 다섯 개의 느낌표(!!!!!)는 단순히 문장 부호를 넘어선 시각적 오브제로 작용합니다. 이는 언어로 다 표현할 수 없는 이성의 마비 상태를 뜻하는 동시에, 절대적 숭고 앞에서는 어떠한 고상한 평론도 무의미해진다는 것을 선언하는 작가의 통렬한 자기 고백이기도 합니다.\n\n결과적으로 이 작품은 어린아이의 낙서와도 같은 가장 무방비하고 투박한 형태를 빌려, 거대한 혼돈에 직면하여 이성을 놓아버린 인간의 카타르시스를 유쾌하고도 섬뜩하게 그려낸 기념비적 작품이라 평가할 수 있습니다.",
        imageUrl: "/artwork.png"
    },
    {
        id: 1,
        title: "거친 머리 세 개 달린 전사와 원초적 용의 승천",
        titleEng: "The Ascent of the Crude Three-Headed Warrior and the Primal Dragon",
        artist: {
            name: "익명의 거장",
            birthYear: 2026,
        },
        creationYear: 2026,
        medium: "웹 브라우저 캔버스 위 광학 마우스의 불규칙한 궤적과 순수 HTML5 픽셀",
        metadata: {
            width: 1920,
            height: 1080,
            dpi: 72,
            fileSize: "1.3MB",
        },
        docent: "이 작품은 얼핏 보면 단순한 디지털 낙서처럼 보이지만, 그 기저에는 문명이라는 세련된 가면 아래 억눌린 인간의 가장 원초적인 충동을 해방시키려는 작가의 대담한 시도가 숨겨져 있습니다. 삐뚤빼뚤하고 불규칙하게 그어진 모든 선은 세밀한 계획이 배제된 채, 마우스라는 도구를 통해 사용자의 무의식이 직접 캔버스에 '새겨진' 자동기술법(Automatism)의 정수를 보여줍니다. 작가는 의도적으로 미성숙한 형태를 차용함으로써 현대 문명이 강요하는 '완벽함'의 환상을 무참히 붕괴시킵니다.\n\n화면 중앙의 세 머리 달린 전사는 현대 사회에서 분열된 인간의 정체성을 상징합니다. 각기 다른 방향을 바라보는 세 개의 투박한 얼굴은 자아(Id), 에고(Ego), 초자아(Superego) 간의 끝없는 내적 갈등을 유머러스하면서도 비극적으로 그려냈습니다. 이 위태로운 전사가 올라탄 형체 불분명한 공룡은 통제할 수 없는 내면의 거대한 욕망이자 파괴적인 에너지를 은유하며, 입에서 뿜어내는 거친 불꽃은 소통의 부재 속에 억눌린 분노의 폭발을 시각화합니다.\n\n기술적으로 이 작품은 디지털 렌더링의 불완전성을 예술적 경지로 승화시켰습니다. 안티에일리어싱(Anti-aliasing)이 배제되어 픽셀 단위로 거칠게 깨져 있는 선의 가장자리는 오히려 디지털 환경이 가진 본질적인 한계와 그 속에서 살아가는 현대인의 불안정한 실존을 완벽하게 대변합니다. 작가는 이 거친 픽셀의 질감을 '디지털 시대의 새로운 숭고(The Digital Sublime)'로 정의하며, 기술의 진보가 해결하지 못한 원초적 감각의 부활을 선언합니다.\n\n결과적으로 이 작품은 현대 미술의 형식적 완벽성과 심오한 척하는 허구성을 동시에 비틀어버리는 강력한 위트이자 풍자입니다. 동시에, 어떤 기술적 장치로도 가둘 수 없는 가공되지 않은 순수한 인간의 에너지—그 '형편없음' 자체—가 여전히 캔버스 위에서 숭고한Masterpiece로 존재할 수 있음을 증명하는 역설적 기념비라 평가할 수 있습니다.",
        imageUrl: "/Gemini_Generated_Image_dw1d0ydw1d0ydw1d.png"
    }
];

export default function GalleryPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const [likes, setLikes] = useState<number[]>(artworks.map(() => 0));
    const [isLikedArray, setIsLikedArray] = useState<boolean[]>(artworks.map(() => false));
    const [isDocentVisible, setIsDocentVisible] = useState(false);

    const handleNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % artworks.length);
            setIsTransitioning(false);
        }, 400); // Wait for fade out
    };

    const handlePrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex(
                (prev) => (prev - 1 + artworks.length) % artworks.length,
            );
            setIsTransitioning(false);
        }, 400);
    };

    const currentArt = artworks[currentIndex];

    return (
        <div className="w-screen h-screen relative flex items-center justify-center gap-8 text-white overflow-hidden">
            {/* Navigation Left */}
            <Icon
                className="relative ml-8 text-primary md3-min-touch-target cursor-pointer"
                onClick={handlePrev}
            >
                chevron_left
            </Icon>

            {/* Spacer */}
            <div className="flex-1" />

            {/* 작품 영역 */}
            <div className="flex-2 flex flex-col items-center">
                {/* 작품 */}
                <div 
                    className="picture-frame cursor-pointer"
                    onClick={() => setIsDocentVisible(!isDocentVisible)}
                >
                    <img
                        style={{ WebkitUserDrag: 'none' }}
                        className="w-full select-none"
                        src={currentArt.imageUrl}
                        alt={currentArt.title}
                    />
                </div>

                {/* 해설 플레이트 */}
                <button 
                    className="w-10 h-fit mt-4 p-1 flex flex-col gap-[2px] bg-[linear-gradient(135deg,#f9d976_0%,#e8b923_25%,#fff2b2_45%,#e8b923_65%,#c19515_100%)] rounded-xs cursor-pointer md3-min-touch-target md3-state-source"
                    onClick={() => setIsDocentVisible(!isDocentVisible)}
                >
                    <div className="w-[80%] h-[1.5px] bg-on-primary opacity-80 rounded-full" />
                    <div className="w-[60%] h-[1.5px] bg-on-primary opacity-80 rounded-full" />
                    <div className="w-full h-px bg-on-primary opacity-50 rounded-full" />
                    <div className="w-full h-px bg-on-primary opacity-50 rounded-full" />
                    <div className="w-full h-px bg-on-primary opacity-50 rounded-full" />

                    <StateLayer className="text-on-primary" />
                </button>
            </div>

            {/* 작품 소개 영역 */}
            <div 
                style={{ 
                    display: isDocentVisible ? 'block' : 'none',
                    
                }}
                className="flex-4 z-10 h-full p-8 bg-inverse-surface text-inverse-on-surface overflow-y-scroll scrollbar-track-transparent scrollbar-thumb-inverse-on-surface"
            >
                <div className="flex justify-between items-start gap-4">
                    <h3 className="text-emphasized-display-small break-keep">{currentArt.title}</h3>
                    <Icon
                        className="relative ml-8 text-inverse-on-surface md3-min-touch-target cursor-pointer"
                        onClick={() => setIsDocentVisible(!isDocentVisible)}
                    >
                        close
                    </Icon>
                </div>
                <p className="mt-2 text-body-large"><i>{currentArt.titleEng}</i></p>
                <p className="mt-4 text-title-small">
                    {currentArt.artist.name} (b. {currentArt.artist.birthYear})
                </p>
                <p className="mt-1 text-title-small">
                    {currentArt.creationYear}
                </p>
                <p className="mt-1 text-title-small">
                    {currentArt.medium}
                </p>
                <p className="mt-1 text-title-small">
                    {currentArt.metadata.width} x {currentArt.metadata.height} px, {currentArt.metadata.dpi} dpi, {currentArt.metadata.fileSize}
                </p>

                <Divider className="mt-4" />

                <p className="mt-8 text-body-large whitespace-pre-line">{currentArt.docent}</p>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Navigation Right */}
            <Icon
                className="relative mr-8 text-primary md3-min-touch-target cursor-pointer"
                onClick={handleNext}
            >
                chevron_right
            </Icon>

            <Button 
                asChild
                className="absolute bottom-8 right-8"
                variant="tonal" 
                size="md"
            >
                <Link href="/draw">
                    <Button.Icon>edit</Button.Icon>
                    <Button.Label>출품하기</Button.Label>
                </Link>
            </Button>

            {/* Spotlight Effect */}
            <div className="bg-[radial-gradient(circle_at_50%_0,#fff5d257_0%,#ffebbe1a_40%,#00000000_80%)] absolute left-1/2 -translate-x-1/2 w-screen h-screen pointer-events-none"></div>

            {/* 인터랙션 안내 문구*/}
            <p 
                style={{ display: isDocentVisible ? 'none' : 'block' }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-on-surface text-title-small">
                작품 하단의 플레이트를 클릭하면 작품 해설을 확인할 수 있습니다.
            </p>
        </div>
    );
}
