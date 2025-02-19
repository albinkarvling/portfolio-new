import {useEffect, useState} from "react";
import {twMerge} from "tailwind-merge";

const HEADER_TEXT = "Hi, Albin here.";
const TYPING_SPEED = 80;
export function HeroTypingHeader() {
    const [letterCount, setLetterCount] = useState(0);

    useEffect(() => {
        if (letterCount >= HEADER_TEXT.length) return;
        setTimeout(() => setLetterCount((prev) => prev + 1), TYPING_SPEED);
    }, [letterCount]);

    return (
        <h1
            className={twMerge(
                "relative text-5xl font-semibold h-12",
                "after:absolute after:left-[calc(100%+12px)] after:h-full after:w-1 after:rounded-full after:bg-white after:animate-header-pulse",
            )}
        >
            <span className="sr-only">{HEADER_TEXT}</span>
            {HEADER_TEXT.slice(0, letterCount)}
        </h1>
    );
}
