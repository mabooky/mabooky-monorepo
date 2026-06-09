import Link from "next/link";
import { Icon, StateLayer } from "@mabooky/md3";
import { ThemeSelector } from "./ThemeSelector";

const contents = [
    {
        type: 'writing',
        id: 'implementing-material-design-3-color-system',
        title: "Material Design 3 색상 시스템 구현하기",
        description: "md3 라이브러리에서 Material Design 3의 색상 시스템을 구현한 방법과 아키텍처에 대해 설명합니다.",
        tags: ["Design", "Material_Design", "MD3Provider"],
        date: "2026-06-02",
        image: 'Gemini_Generated_Image_djv1w5djv1w5djv1.png',
    },
    // {
    //     type: 'work',
    //     id: 'the-mary-run',
    //     title: 'The Mary Run',
    //     description: '이 부활의 소식을 전해야 한다. 지금, 당장.',
    //     tags: ['Game', 'Easter'],
    //     date: '2026-03-27',
    //     image: 'the-mary-run-screenshot.png',
    // }
];

export default function HomePage() {
    return (
        <div className="w-full h-full flex flex-col large:flex-row">

            <aside className="relative w-full p-8
                large:w-96 large:h-full large:px-8 large:py-16
                bg-surface-container-high text-on-surface border-outline-variant 
                flex flex-col items-start">

                <h1 className="text-emphasized-display-large select-none">
                    본질을<br />
                    <span className="text-primary">설계</span>하다.
                </h1>

                <p className="mt-8 text-body-large">
                    안녕하세요. 아키텍처 개발에 관심이 많은 개발자 <strong>mabooky</strong>입니다.<br />
                    이곳은 저의 개인적인 탐구와 개발 결과물을 공유하는 공간입니다.<br />
                </p>

                {/* GitHub, Email 등 */}
                <div className="mt-8 flex justify-center items-center gap-2">
                    <svg 
                        aria-label="깃허브" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 98 96" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_730_27126)"><path d="M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 6.69539e-07 48.9043 4.309e-07C21.8203 1.92261e-07 -1.9479e-07 22.1074 -4.3343e-07 49.1914C-6.20631e-07 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z" fill="currentcolor" /></g><defs><clipPath id="clip0_730_27126"><rect width="98" height="96" fill="white" /></clipPath></defs>
                    </svg>
                    <a
                        className="text-body-large underline text-[revert]"
                        href="https://github.com/mabooky"
                        target="_blank"
                        rel="noopener noreferrer">
                        mabooky
                    </a>
                </div>
                <div className="mt-2 flex justify-center items-center gap-2">
                    <Icon aria-label="이메일" style={{ fontSize: '24px' }}>email</Icon>
                    <span className="text-body-large">mabookyggl@gmail.com</span>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                <ThemeSelector />
            </aside>

            <main className="flex-1 px-8 large:px-16 large:overflow-y-scroll">

                <h1 className="mt-16 text-emphasized-display-large text-on-surface select-none">
                    <i>WRITINGS & WORKS</i>
                </h1>

                <ul className="w-fit grid grid-cols-1 expanded:grid-cols-2 
                    extra-large:grid-cols-3 gap-4 my-16">

                    {contents.map((content, index) => (
                        <li key={index} className="w-full">

                            <Link
                                aria-label={content.title}
                                href={/* `/${content.type}s/${content.id}` */`/`}
                                className="md3-interactive relative w-full rounded-xl
                                    flex flex-col bg-surface-container-high text-on-surface">

                                {/* 컨텐츠 이미지 */}
                                {content.image && <img
                                    className="w-full h-48 object-cover rounded-t-xl"
                                    src={content.image}
                                    alt={content.title} />}

                                <div className="p-8">

                                    {/* 컨텐츠 제목 */}
                                    <h2 className="text-headline-medium font-bold">{content.title}</h2>

                                    {/* 컨텐츠 설명 */}
                                    <p className="mt-2 text-body-medium">{content.description}</p>

                                    {/* 컨텐츠 태그 */}
                                    <p className="mt-2 text-label-large">
                                        {content.tags.map((tag) => `#${tag} `)}
                                    </p>

                                    {/* 컨텐츠 업로드 날짜 */}
                                    <p className="mt-2 text-label-small text-on-surface-variant">
                                        {content.date}
                                    </p>

                                </div>

                                <StateLayer className="rounded-xl" ripple />

                            </Link>

                        </li>
                    ))}

                </ul>

            </main>

        </div>
    );
}
