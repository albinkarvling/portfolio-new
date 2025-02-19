"use client";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {HeroBackground} from "./HeroBackground";
import {HeroLinks} from "./HeroLinks";
import {HeroNavigation} from "./HeroNavigation";
import {useRef} from "react";
import useAnimateIntoView, {DEFAULT_INITIAL_STATE} from "@/hooks/useAnimateIntoView";
import {HeroTypingHeader} from "./HeroTypingHeader";

export function Hero() {
    const subHeaderRef = useRef<HTMLParagraphElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useAnimateIntoView(subHeaderRef, {delay: 800});
    useAnimateIntoView(textRef, {delay: 1000});

    return (
        <section className="relative w-full h-[95dvh]" id="hero-section">
            <HeroBackground />

            <div className="h-[calc(100%-30px)] w-main max-w-main mx-auto flex items-center">
                <div className="w-[480px] max-w-full grid place-items-start">
                    <HeroTypingHeader />
                    <p
                        className="mt-2 text-4xl text-text-secondary"
                        style={DEFAULT_INITIAL_STATE}
                        ref={subHeaderRef}
                    >
                        I create stuff sometimes.
                    </p>
                    <p
                        className="mt-4 text-lg font-medium text-text-secondary"
                        style={DEFAULT_INITIAL_STATE}
                        ref={textRef}
                    >
                        I am a full stack developer, with experience in frontend, backend
                        & cloud technologies.
                    </p>
                    <HeroLinks />
                </div>
                <HeroNavigation />
            </div>

            <button
                className="absolute bottom-16 left-2/4 -translate-x-2/4 grid place-items-center gap-1"
                data-spotlight
            >
                Read more
                <ArrowDownwardIcon className="animate-arrow-bounce" />
            </button>
        </section>
    );
}
