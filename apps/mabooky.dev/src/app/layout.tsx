import "./globals.css";
import type { Metadata } from "next";
import { ColorScheme, MD3Provider } from "@mabooky/md3";

export const metadata: Metadata = {
    title: "본질을 설계하다.",
    description: "개발자 mabooky의 작은 공간",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className="w-full h-full">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>
            </head>
            <body className="w-full h-full">
                <MD3Provider
                    colorScheme={ColorScheme.fromSourceColorArgb(0xff4b662c)}
                    theme="system"
                    contrast="system"
                >
                    <div className="w-full large:h-full bg-surface">
                        {children}
                    </div>
                </MD3Provider>
            </body>
        </html>
    );
}
