import type { Metadata } from "next";
import { Noto_Serif_KR } from 'next/font/google'
import "./globals.css";
import { ColorScheme, MD3Provider } from "@mabooky/md3";
import { BgmProvider } from "./BgmProvider";

const plainTypeface = Noto_Serif_KR({
    weight: ['200', '300', '400', '500', '600', '700', '900'],
    subsets: ['latin'],
    variable: '--md-ref-typeface-plain',
    display: 'swap',
})

export const metadata: Metadata = {
    title: "Galerie de Bal",
    description: "현대미술의 숭고함, 그리고 당신의 발그림",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="ko"
            className={`w-full h-full ${plainTypeface.variable}`}
        >
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            </head>
            <body className="w-full h-full flex flex-col m-0 p-0">
                <BgmProvider>
                    <MD3Provider 
                        colorScheme={ColorScheme.fromSourceColorArgb(0xffe6c27a)}
                        theme="dark"
                    >
                        <div className="w-full h-full bg-surface">
                            {children}
                        </div>
                    </MD3Provider>
                </BgmProvider>
            </body>
        </html>
    );
}
