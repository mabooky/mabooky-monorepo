import type { Metadata } from "next";
import "./globals.css";
import { ColorScheme, MD3Provider } from "@mabooky/md3";

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
            className="w-full h-full"
        >
            <head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            </head>
            <body className="w-full h-full flex flex-col m-0 p-0">
                <MD3Provider 
                    colorScheme={ColorScheme.fromSourceColorArgb(0xffe6c27a)}
                    theme="dark"
                >
                    <div className="bg-surface">
                        {children}
                    </div>
                </MD3Provider>
                <audio loop preload="none" src="/nocturne-op9-no2.mp3" autoPlay />
            </body>
        </html>
    );
}
