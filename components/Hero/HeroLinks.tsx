"use client";
import {LinkBubble} from "@/assets";
import {GitHub, LinkedIn, AlternateEmail} from "@mui/icons-material";

const LINKS = [
    {text: "GitHub", url: "https://github.com/albinkarvling", icon: "github"},
    {
        text: "LinkedIn",
        url: "https://www.linkedin.com/in/albin-k%C3%A4rvling-237a851a8/",
        icon: "linkedin",
    },
    {text: "Email", url: "mailto:albin.karvling@hotmail.com", icon: "email"},
];

export function HeroLinks() {
    const renderIcon = (icon: (typeof LINKS)[number]["icon"]) => {
        switch (icon) {
            case "github":
                return <GitHub fontSize="inherit" />;
            case "linkedin":
                return <LinkedIn fontSize="inherit" />;
            case "email":
                return <AlternateEmail fontSize="inherit" />;
        }
    };
    return (
        <ul className="mt-8 flex gap-8">
            {LINKS.map(({text, url, icon}) => (
                <li className="relative" data-tooltip={text} key={text}>
                    <LinkBubble />
                    <div className="absolute inset-0 -ml-0.5 -mt-1.5">
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={text}
                            className="w-full h-full flex items-center justify-center"
                            data-spotlight
                        >
                            <div className="text-4xl">{renderIcon(icon)}</div>
                        </a>
                    </div>
                </li>
            ))}
        </ul>
    );
}
