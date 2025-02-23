import type {Metadata} from "next";
import {Montserrat} from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
});

const url = "https://albinkarvling.com";
const name = "Albin Kärvling";
const title = name;
const description =
    "A personal portfolio showcasing my projects, skills, and experience as a fullstack developer, who specializes in frontend development.";

export const metadata: Metadata = {
    title,
    description,
    authors: [{name, url}],
    robots: {
        index: true,
        follow: true,
    },
    twitter: {
        title,
        description,
        card: "summary",
    },
    openGraph: {
        title,
        description,
        url,
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${montserrat.variable} antialiased`}>{children}</body>
        </html>
    );
}
