"use client";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {HeroBackground} from "./HeroBackground";
import {HeroLinks} from "./HeroLinks";
import {HeroNavigation} from "./HeroNavigation";
import {useRef} from "react";
import useAnimateIntoView from "@/hooks/useAnimateIntoView";
import {HeroTypingHeader} from "./HeroTypingHeader";
import {scrollToSection} from "@/utils/scrollToSection";

export function Hero() {
    const subHeaderRef = useRef<HTMLParagraphElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    const {initialState} = useAnimateIntoView(subHeaderRef, {delay: 800});
    useAnimateIntoView(textRef, {delay: 1000});

    return (
        <section className="relative w-full lg:h-[100dvh]" id="hero-section">
            <HeroBackground />

            <h1 className="sr-only">Albin Kärvling – A fullstack Developer</h1>

            <div className="h-full pt-24 lg:pt-0 flex flex-col lg:justify-center">
                <div className="w-main max-w-main mx-auto flex flex-col items-center lg:items-start">
                    <div className="lg:-mt-6 w-[480px] max-w-full text-center lg:text-left grid place-items-center lg:place-items-start">
                        <HeroTypingHeader />
                        <p
                            className="mt-2 text-4xl text-text-secondary"
                            style={initialState}
                            ref={subHeaderRef}
                        >
                            I create stuff sometimes.
                        </p>
                        <p
                            className="mt-4 text-lg font-medium text-text-secondary"
                            style={initialState}
                            ref={textRef}
                        >
                            I am a full stack developer, with experience in frontend,
                            backend & cloud technologies. I specialize in frontend,
                            though.
                        </p>
                    </div>
                    <HeroLinks />
                </div>
                <HeroNavigation className="mt-16 lg:mt-0" />
            </div>

            <button
                onClick={() => scrollToSection("about-header")}
                className="mt-8 lg:mt-0 mx-auto lg:absolute bottom-16 left-2/4 lg:-translate-x-2/4 grid place-items-center gap-1"
                data-spotlight
            >
                Read more
                <ArrowDownwardIcon className="animate-arrow-bounce" />
            </button>
        </section>
    );
}
