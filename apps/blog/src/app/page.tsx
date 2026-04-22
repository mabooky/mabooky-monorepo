import { Icon, StateLayer } from "@mabooky/md3";

const contents = [
    {
        "image": "a60e0b01-4bdf-4448-9edb-a48af35ad4f1.jpeg",
        "title": "Redis를 활용한 분산 락 구현과 동시성 제어",
        "description": "다중 서버 환경에서 데이터 정합성을 보장하기 위해 Redlock 알고리즘을 적용하여 경쟁 상태를 해결한 사례를 분석합니다.",
        "tags": ["Backend", "Redis", "Concurrency"],
        "date": "2026-04-15"
    },
    {
        "image": "cb632788-97eb-4fc1-8c48-cdd6671cba2d.jpeg",
        "title": "도커 컨테이너 최적화: Multi-stage Build 전략",
        "description": "이미지 크기를 80% 이상 줄여 배포 속도와 보안성을 동시에 높이는 효율적인 Dockerfile 작성 기법을 소개합니다.",
        "tags": ["DevOps", "Docker"],
        "date": "2026-03-22"
    },
    {
        "title": "함수형 프로그래밍과 부수 효과(Side Effects)의 관리",
        "description": "순수 함수와 불변성을 지향하는 코드가 어떻게 코드의 예측 가능성을 높이고 테스트를 용이하게 만드는지 고찰합니다.",
        "tags": ["CS", "Functional"],
        "date": "2026-02-10"
    },
    {
        "title": "PostgreSQL 인덱스 스캔의 원리와 성능 튜닝",
        "description": "B-Tree 인덱스의 내부 동작 방식을 이해하고, 실행 계획(EXPLAIN)을 분석하여 느린 쿼리를 최적화하는 과정을 다룹니다.",
        "tags": ["Database", "SQL", "Performance"],
        "date": "2026-01-05"
    },
    {
        "title": "마이크로서비스 아키텍처(MSA)에서의 이벤트 기반 통신",
        "description": "Apache Kafka를 활용하여 서비스 간 결합도를 낮추고 데이터 일관성을 유지하는 비동기 메시징 패턴을 학습합니다.",
        "tags": ["Architecture", "Kafka", "MSA"],
        "date": "2025-12-18"
    },
    {
        "title": "TypeScript의 고급 타입 시스템: Conditional Types 활용하기",
        "description": "복잡한 제네릭 구조에서 조건부 타입을 활용해 정적 타입 체크를 더욱 강력하게 만드는 고급 기법들을 정리했습니다.",
        "tags": ["TypeScript", "Programming"],
        "date": "2025-11-30"
    },
    {
        "title": "REST API vs GraphQL: 프로젝트 규모에 따른 선택 기준",
        "description": "엔드포인트 관리의 편의성과 데이터 오버페칭(Over-fetching) 문제 사이에서 최적의 인터페이스를 선택하는 기준을 제시합니다.",
        "tags": ["API", "Web"],
        "date": "2025-10-12"
    },
    {
        "title": "CI/CD 파이프라인 자동화: GitHub Actions 입문",
        "description": "코드 푸시부터 테스트 실행, 자동 배포까지 이어지는 워크플로우를 구축하여 개발 생산성을 높이는 방법을 공유합니다.",
        "tags": ["Automation", "CI/CD"],
        "date": "2025-09-25"
    },
    {
        "image": "ebaefb86-1cbf-46b1-9055-b8e96f750f97.jpeg",
        "title": "객체 지향 설계의 5가지 원칙: SOLID 다시 보기",
        "description": "유지보수가 쉬운 소프트웨어를 만들기 위해 실무 코드에 SOLID 원칙을 어떻게 녹여낼 수 있는지 구체적인 예시로 설명합니다.",
        "tags": ["Software Engineering", "OOP"],
        "date": "2025-08-14"
    },
    {
        "title": "Web 가속을 위한 브라우저 캐싱 전략 (Cache-Control)",
        "description": "HTTP 헤더 설정을 통해 정적 자원의 로딩 속도를 개선하고 서버 부하를 줄이는 브라우저 캐시 메커니즘을 심층 분석합니다.",
        "tags": ["Web", "Network", "HTTP"],
        "date": "2025-07-02"
    }
];

export default function HomePage() {
    return (
        <div className="w-full h-full flex flex-col large:flex-row">

            <aside className="relative w-full p-8
                large:w-96 large:h-full large:px-8 large:py-16
                bg-surface-container-high text-on-surface border-outline-variant 
                flex flex-col items-start">

                <p className="text-emphasized-display-large select-none">
                    본질을<br />
                    <span className="text-primary"> 설계</span>하다.
                </p>

                <p className="mt-8 text-body-large">
                    안녕하세요. 아키텍처 개발에 관심이 많은 개발자 <strong>mabooky</strong>입니다.<br />
                    이곳은 저의 개인적인 탐구와 개발 결과물을 공유하는 공간입니다.<br />
                </p>

                {/* GitHub, Email 등 */}
                <div className="mt-8 flex justify-center items-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_730_27126)"><path d="M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 6.69539e-07 48.9043 4.309e-07C21.8203 1.92261e-07 -1.9479e-07 22.1074 -4.3343e-07 49.1914C-6.20631e-07 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z" fill="black"/></g><defs><clipPath id="clip0_730_27126"><rect width="98" height="96" fill="white"/></clipPath></defs></svg>
                    <a 
                        className="text-body-large underline text-[revert]" 
                        href="https://github.com/mabooky" 
                        target="_blank" 
                        rel="noopener noreferrer">
                        Github: mabooky
                    </a>
                </div>
                <div className="mt-2 flex justify-center items-center gap-2">
                    <Icon style={{ fontSize: '24px' }}>email</Icon>
                    <span className="text-body-large">Email: mabookyggl@gmail.com</span>
                </div>

            </aside>

            <main className="flex-1 px-8 large:px-16
                large:overflow-y-scroll flex flex-col">

                    <p className="mt-16 text-emphasized-display-large text-on-surface select-none">
                        <i>WRITINGS & WORKS</i>
                    </p>
                
                <ul className="w-fit grid grid-cols-1 expanded:grid-cols-2 
                    extra-large:grid-cols-3 gap-4 my-16">

                    {contents.map((content, index) => (
                        <li key={index} className="relative w-full rounded-xl
                            cursor-pointer flex flex-col bg-surface-container-high text-on-surface">

                            {/* 컨텐츠 이미지 */}
                            {content.image && <img 
                                className="w-full h-48 object-cover rounded-t-xl"
                                src={content.image} 
                                alt={content.title}/>}

                            <div className="p-8">

                                {/* 컨텐츠 제목 */}
                                <p className="text-headline-medium font-bold">{content.title}</p>

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

                        </li>
                    ))}

                </ul>

            </main>

        </div>
    );
}
