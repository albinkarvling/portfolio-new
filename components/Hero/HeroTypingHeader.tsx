import {useEffect, useState} from "react";
import {twMerge} from "tailwind-merge";
import {useHasReducedMotion} from "@/hooks";

const HEADER_TEXT = "Hi, Albin here.";
const TYPING_SPEED = 80;
export function HeroTypingHeader() {
    const hasReducedMotion = useHasReducedMotion();
    const [letterCount, setLetterCount] = useState(
        hasReducedMotion ? HEADER_TEXT.length : 0,
    );

    useEffect(() => {
        if (hasReducedMotion) {
            setLetterCount(HEADER_TEXT.length);
            return;
        }
        if (letterCount >= HEADER_TEXT.length) return;
        setTimeout(() => setLetterCount((prev) => prev + 1), TYPING_SPEED);
    }, [letterCount, hasReducedMotion]);

    return (
        <h2
            className={twMerge(
                "relative text-5xl font-semibold h-12",
                !hasReducedMotion &&
                    "after:absolute after:left-[calc(100%+12px)] after:h-full after:w-1 after:rounded-full after:bg-white after:animate-header-pulse",
            )}
            aria-label={HEADER_TEXT}
        >
            {HEADER_TEXT.slice(0, letterCount)}
        </h2>
    );
}
