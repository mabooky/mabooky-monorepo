"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button, Icon } from "@mabooky/md3";

import "./styles.css";
import { Artwork } from "@/types/artwork";
import { DocentSheet } from "./DocentSheet";
import { ArtworkSlide } from "./ArtworkSlide";
import clsx from "clsx";

const artworks: Artwork[] = [
    {
        id: "0",
        title: "기호학적 혼돈과 숭고의 타이포그래피",
        titleEng: "Semiotic Chaos and Typography of the Sublime",
        artist: {
            name: "익명의 거장",
            birthYear: 2026,
        },
        creationYear: 2026,
        medium: "웹 브라우저 캔버스 위 광학 마우스의 불규칙한 궤적과 순수 HTML5 픽셀",
        metadata: {
            width: 1600,
            height: 900,
            fileSize: "82.0KB",
        },
        format: "marine",
        docent: "이 작품은 시각적 도상(Icon)과 텍스트(Text)를 캔버스 위에서 폭력적으로 충돌시켜, 정보 과잉 시대에 현대인이 겪는 '인지적 과부하'를 신랄하게 해체한 팝아트적 포스트모더니즘의 걸작입니다.\n\n화면 좌측의 여백을 위태롭게 부유하는 네 개의 원초적 상징—파괴적인 번개, 날카롭게 날이 선 다각의 별, 강박적으로 맴도는 나선형의 소용돌이, 그리고 방향성을 상실한 파동—은 외부 세계로부터 우리에게 끊임없이 쏟아지는 무질서한 자극들을 은유합니다. 작가는 이 기호들을 어떠한 인과관계도, 논리적 연결 고리도 없이 투박하게 배치함으로써 현대 사회가 가진 '서사의 단절'과 '맥락의 상실'을 완벽에 가깝게 시각화해 냈습니다.\n\n그러나 이 작품의 진정한 천재성은 우측의 비대한 말풍선과 그 안을 가득 채운 \"엄청나다!!!!!\"라는 텍스트에 있습니다. 좌측의 복잡하고 압도적인 우주적 자극 앞에서 인간의 정교한 이성과 논리는 결국 기능을 상실하고 맙니다. 대신 오직 \"엄청나다\"라는 일차원적이고 미성숙한 감탄사로 퇴행하고 마는 현대인의 지성적 빈곤을 날카롭게 꼬집는 것이지요.\n\n특히 잉크가 뭉친 듯 거칠게 렌더링 된 폰트와 강박적으로 반복된 다섯 개의 느낌표(!!!!!)는 단순히 문장 부호를 넘어선 시각적 오브제로 작용합니다. 이는 언어로 다 표현할 수 없는 이성의 마비 상태를 뜻하는 동시에, 절대적 숭고 앞에서는 어떠한 고상한 평론도 무의미해진다는 것을 선언하는 작가의 통렬한 자기 고백이기도 합니다.\n\n결과적으로 이 작품은 어린아이의 낙서와도 같은 가장 무방비하고 투박한 형태를 빌려, 거대한 혼돈에 직면하여 이성을 놓아버린 인간의 카타르시스를 유쾌하고도 섬뜩하게 그려낸 기념비적 작품이라 평가할 수 있습니다.",
        docentAudioUrl: "ElevenLabs_2026-07-07T07_53_11_Dohyeon - Whisper, Measured and Neutral_pvc_sp110_s100_sb100_v3.mp3",
        imageUrl: "/artwork.png"
    },
    {
        id: "1",
        title: "거친 머리 세 개 달린 전사와 원초적 용의 승천",
        titleEng: "The Ascent of the Crude Three-Headed Warrior and the Primal Dragon",
        artist: {
            name: "익명의 거장",
            birthYear: 2026,
        },
        creationYear: 2026,
        medium: "웹 브라우저 캔버스 위 광학 마우스의 불규칙한 궤적과 순수 HTML5 픽셀",
        metadata: {
            width: 2734,
            height: 1536,
            fileSize: "2.3MB",
        },
        format: "marine",
        docent: "이 작품은 얼핏 보면 단순한 디지털 낙서처럼 보이지만, 그 기저에는 문명이라는 세련된 가면 아래 억눌린 인간의 가장 원초적인 충동을 해방시키려는 작가의 대담한 시도가 숨겨져 있습니다. 삐뚤빼뚤하고 불규칙하게 그어진 모든 선은 세밀한 계획이 배제된 채, 마우스라는 도구를 통해 사용자의 무의식이 직접 캔버스에 '새겨진' 자동기술법(Automatism)의 정수를 보여줍니다. 작가는 의도적으로 미성숙한 형태를 차용함으로써 현대 문명이 강요하는 '완벽함'의 환상을 무참히 붕괴시킵니다.\n\n화면 중앙의 세 머리 달린 전사는 현대 사회에서 분열된 인간의 정체성을 상징합니다. 각기 다른 방향을 바라보는 세 개의 투박한 얼굴은 자아(Id), 에고(Ego), 초자아(Superego) 간의 끝없는 내적 갈등을 유머러스하면서도 비극적으로 그려냈습니다. 이 위태로운 전사가 올라탄 형체 불분명한 공룡은 통제할 수 없는 내면의 거대한 욕망이자 파괴적인 에너지를 은유하며, 입에서 뿜어내는 거친 불꽃은 소통의 부재 속에 억눌린 분노의 폭발을 시각화합니다.\n\n기술적으로 이 작품은 디지털 렌더링의 불완전성을 예술적 경지로 승화시켰습니다. 안티에일리어싱(Anti-aliasing)이 배제되어 픽셀 단위로 거칠게 깨져 있는 선의 가장자리는 오히려 디지털 환경이 가진 본질적인 한계와 그 속에서 살아가는 현대인의 불안정한 실존을 완벽하게 대변합니다. 작가는 이 거친 픽셀의 질감을 '디지털 시대의 새로운 숭고(The Digital Sublime)'로 정의하며, 기술의 진보가 해결하지 못한 원초적 감각의 부활을 선언합니다.\n\n결과적으로 이 작품은 현대 미술의 형식적 완벽성과 심오한 척하는 허구성을 동시에 비틀어버리는 강력한 위트이자 풍자입니다. 동시에, 어떤 기술적 장치로도 가둘 수 없는 가공되지 않은 순수한 인간의 에너지—그 '형편없음' 자체—가 여전히 캔버스 위에서 숭고한 마스터피스로 존재할 수 있음을 증명하는 역설적 기념비라 평가할 수 있습니다.",
        docentAudioUrl: "ElevenLabs_2026-07-07T08_08_45_Dohyeon - Whisper, Measured and Neutral_pvc_sp110_s100_sb100_v3.mp3",
        imageUrl: "/Gemini_Generated_Image_dw1d0ydw1d0ydw1d.png"
    },
    {
        id: "2",
        title: "무한한 혼돈 속에서 길을 잃은 인간의 초상",
        titleEng: "Portrait of a Human Lost in Infinite Chaos",
        artist: {
            name: "익명의 거장",
            birthYear: 2026,
        },
        creationYear: 2026,
        medium: "웹 브라우저 캔버스 위 광학 마우스의 불규칙한 궤적과 순수 HTML5 픽셀",
        metadata: {
            width: 1200,
            height: 1600,
            fileSize: "1.2MB",
        },
        format: "portrait",
        docent: "이 작품은 현대 사회에서 인간이 직면하는 '정체성의 혼란'과 '존재의 불안'을 극단적으로 시각화한 디지털 추상화의 걸작입니다. 화면 전체를 뒤덮는 무수히 많은 선과 색채의 혼돈은, 현대인이 정보 과잉과 사회적 압박 속에서 느끼는 내적 혼란을 은유적으로 표현합니다. 작가는 의도적으로 질서와 균형을 배제함으로써, 관람자로 하여금 작품 속에서 길을 잃게 만들고, 그 과정에서 인간 존재의 근본적인 불안과 고독을 체험하게 합니다.\n\n중앙에 위치한 인물의 형상은 극도로 단순화되고 왜곡되어 있으며, 이는 현대 사회에서 개인이 겪는 정체성의 상실과 자기 인식의 혼란을 상징합니다. 인물의 얼굴은 명확한 특징을 가지지 않고, 주변의 혼돈 속에 흩어져 있는 선들과 색채에 의해 거의 삼켜져 버립니다. 이는 현대인이 외부 세계의 압력과 정보의 홍수 속에서 자신을 잃어버리는 모습을 강렬하게 드러냅니다.\n\n작가는 또한 색채의 대비와 선의 방향성을 통해 관람자의 시선을 작품 속으로 끌어들이며, 혼돈 속에서 길을 찾으려는 인간의 본능적 탐색을 시각적으로 구현합니다. 그러나 이 탐색은 결코 명확한 해답에 도달하지 못하며, 오히려 관람자에게 더 큰 혼란과 불안을 안겨줍니다. 이는 현대 사회에서 인간이 직면하는 끝없는 선택과 정보의 홍수 속에서 느끼는 무력감과 불안을 상징적으로 보여줍니다.\n\n결과적으로 이 작품은 단순한 시각적 경험을 넘어, 현대인의 내적 심리와 존재론적 고민을 깊이 탐구하게 만드는 철학적 메시지를 담고 있습니다. 작가는 혼돈 속에서 길을 잃은 인간의 모습을 통해, 현대 사회에서의 정체성과 존재의 의미를 다시금 성찰하게 만드는 강력한 예술적 경험을 제공하며, 이는 디지털 미술의 새로운 지평을 여는 중요한 작품으로 평가될 수 있습니다.",
        docentAudioUrl: null,
        imageUrl: "https://picsum.photos/1200/1600"
    },
    {
        id: "3",
        title: "기하학적 완벽성 속에 갇힌 불완전한 자아",
        titleEng: "Imperfect Ego Trapped in Geometrical Perfection",
        artist: {
            name: "익명의 거장",
            birthYear: 2026,
        },
        creationYear: 2026,
        medium: "웹 브라우저 캔버스 위 광학 마우스의 불규칙한 궤적과 순수 HTML5 픽셀",
        metadata: {
            width: 1600,
            height: 1600,
            fileSize: "1.5MB",
        },
        format: "carre",
        docent: "르 카레 수블림(1:1)이라는 기하학적으로 완전히 대칭적이고 엄격한 포맷 안에서, 작가는 역설적이게도 가장 원초적이고 통제되지 않은 불안정한 궤적을 흩뿌려 놓았습니다. 화면 중앙을 가로지르는 비정형의 브러시 스트로크와 혼란스러운 원들의 배치는, 이 완벽한 사각형이라는 감옥 속에 갇힌 불완전한 자아의 처절한 몸부림을 시각화합니다.\n\n우리는 이 작품에서 현대 사회가 개인에게 요구하는 '규격화된 성공'과 '완벽함의 환상'을 발견할 수 있습니다. 1:1 비율의 프레임은 소셜 미디어가 규정한 타이트한 삶의 양식을 은유하며, 그 안에서 마구 요동치는 투박한 낙서들은 규격화에 저항하는 인간 본연의 날것 그대로의 생명력입니다. 작가는 의도적으로 마우스를 쥐고 손을 떨며 그림으로써 디지털 매체가 약속하는 매끄러운 선을 거부하고 인간 실존의 불완전성을 온몸으로 증명하고 있는 것입니다.\n\n나아가 이 작품의 미학적 극치는 사각의 각 모서리로 향할수록 점점 밀도가 옅어지며 소멸하는 선들의 퇴행적 배치에 있습니다. 이는 결국 어떠한 기하학적 유토피아도 인간의 거친 무의식을 영원히 감금할 수 없음을 선언하는 예술적 해방이자, 규격에 갇히길 거부하는 모든 현대인들을 향한 투박하지만 강력한 연대의 메시지라 평가할 수 있습니다.",
        docentAudioUrl: null,
        imageUrl: "https://picsum.photos/1600/1600"
    },
    {
        id: "4",
        title: "데이터의 지평선 너머 잊혀진 노스탤지어",
        titleEng: "Forgotten Nostalgia Beyond the Horizon of Data",
        artist: {
            name: "익명의 거장",
            birthYear: 2026,
        },
        creationYear: 2026,
        medium: "웹 브라우저 캔버스 위 광학 마우스의 불규칙한 궤적과 순수 HTML5 픽셀",
        metadata: {
            width: 1600,
            height: 1200,
            fileSize: "1.4MB",
        },
        format: "paysage",
        docent: "르 페이자주(4:3) 규격은 전통적인 서양 풍경화의 정취를 담고 있는 동시에, 과거 우리 삶을 지배했던 CRT 모니터의 아날로그적 노스탤지어를 강력하게 환기하는 프레임입니다. 작가는 이 아련하고도 대중적인 화면 위에 무성의한 듯 거칠게 쪼개진 수평의 픽셀 덩어리들을 나열했습니다. 이는 단순히 물리적 풍경의 재현이 아닌, 디지털 데이터의 범람 속에서 파편화된 현대인의 '기억의 지평선'을 해체한 풍경화입니다.\n\n캔버스의 상단을 가로지르는 탁한 색조의 불규칙한 면분할은 자연의 대기가 아닌 문명이라는 필터를 통해 걸러진 숨 막히는 인공의 질서를 표현합니다. 그 아래로 수직 낙하하는 듯한 거친 선들은 중력이라는 물리 법칙에 구속된 인간 실존의 한계를 보여주는 동시에, 모든 가치 있는 것들이 아래로 추락해가는 현대 문명에 대한 차가운 은유이기도 합니다.\n\n결과적으로 이 작품은 과거의 비율을 빌려 현재의 디지털 무질서를 폭로하는 시간적 모순을 품고 있습니다. 뷰포트를 가득 채우는 이 투박한 가로형의 풍경은, 관람자로 하여금 화려한 초고해상도의 시대에 우리가 진정 잃어버린 감수성이 무엇인가를 깊게 자문하게 만드는 성찰적 랜드스케이프라 칭하기에 부족함이 없습니다.",
        docentAudioUrl: null,
        imageUrl: "https://picsum.photos/1600/1200"
    }
];

export default function GalleryPage() {
    const [currentArt, setCurrentArt] = useState<Artwork>(artworks[0]);
    const [isDocentVisible, setIsDocentVisible] = useState(false);

    const snapContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const snapContainer = snapContainerRef.current;
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
        const snapContainer = snapContainerRef.current;
        if (!snapContainer) return;

        const newIndex = Math.max(0, Math.floor(snapContainer.scrollLeft / snapContainer.clientWidth) - 1);
        snapContainer.children[newIndex].scrollIntoView({ behavior: "smooth" });
    }

    function handleNext() {
        const snapContainer = snapContainerRef.current;
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
                    ref={snapContainerRef}
                    className="w-full h-full flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar">

                    {artworks.map((artwork) => (
                        <ArtworkSlide
                            key={artwork.id}
                            artwork={artwork}
                            isDocentVisible={isDocentVisible}
                            onToggleDocent={() => setIsDocentVisible(!isDocentVisible)}
                        />
                    ))}

                </div>

                {/* Navigation Left */}
                <Icon
                    className="absolute left-8 top-1/2 -translate-y-1/2 text-primary md3-min-touch-target cursor-pointer"
                    onClick={handlePrev}
                >
                    chevron_left
                </Icon>

                {/* Navigation Right */}
                <Icon
                    className="absolute right-8 top-1/2 -translate-y-1/2 text-primary md3-min-touch-target cursor-pointer"
                    onClick={handleNext}
                >
                    chevron_right
                </Icon>

                <Button
                    asChild
                    style={{ 'display': isDocentVisible ? 'none' : 'flex' }}
                    className="absolute bottom-8 right-8"
                    variant="tonal"
                    size="md"
                >
                    <Link href="/draw">
                        <Button.Icon>edit</Button.Icon>
                        <Button.Label>출품하기</Button.Label>
                    </Link>
                </Button>

                {/* 인터랙션 안내 문구*/}
                <p
                    style={{
                        display: isDocentVisible ? 'none' : 'block'
                    }}
                    className={`
                        absolute w-max bottom-4 left-1/2 -translate-x-1/2 text-on-surface text-title-small text-center
                        max-expanded:-translate-y-22
                    `}
                >
                    작품 하단의 플레이트를 클릭하면 <br className="medium:hidden" />작품 해설을 확인할 수 있습니다.
                </p>
            </main>

            {/* Compact, Medium: Bottom Sheet / Expanded, Large, Extra Large: Side Sheet */}
            <DocentSheet artwork={currentArt} isVisible={isDocentVisible} onDismiss={() => setIsDocentVisible(false)} />
        </div>
    );
}