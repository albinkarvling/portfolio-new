"use client";
import useAnimateIntoView from "@/hooks/useAnimateIntoView";
import {scrollToSection} from "@/utils/scrollToSection";
import {createRef, useEffect, useRef} from "react";
import {twMerge} from "tailwind-merge";

const NAVBAR_TABS = [
    {title: "About", id: "about-section"},
    {title: "Projects", id: "project-section"},
    {title: "Tech-Stack", id: "tech-stack-section"},
    {title: "Contact", id: "contact-section"},
];

const BREAKPOINT = 1024;
const INITIAL_ANIMATE_STATE = {
    opacity: 0,
    transform: "translateX(100%)",
};
const END_ANIMATE_STATE = {
    opacity: 1,
    transform: "translateX(0)",
};
export function HeroNavigation({className}: {className?: string}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const tabRefs = NAVBAR_TABS.map(() => createRef<HTMLLIElement>());

    useEffect(() => {
        const setBackgroundSize = () => {
            const list = listRef.current;
            const container = containerRef.current;
            const row = document.getElementById("background-row-0");
            if (!row || !list || !container) return;

            // Reset styles to get the actual width/height
            container.style.width = "";
            container.style.height = "";

            if (window.innerWidth < BREAKPOINT) {
                container.style.width = "100%";
                container.style.top = "";
                return;
            }

            const rowCount = Number(
                document
                    .querySelector("[data-row-count]")!
                    .getAttribute("data-row-count")!,
            );
            const {width: tileWidth, height: tileHeight} = row
                .querySelector("div")!
                .getBoundingClientRect();
            const {width: listWidth, height: listHeight} = list.getBoundingClientRect();

            let width = 0;
            let height = 0;
            const wiggleRoom = 40;
            for (let i = 0; width + wiggleRoom < listWidth; i++) {
                width += tileWidth;
                width += 1; // Add border width
            }
            for (let i = 0; height + wiggleRoom < listHeight; i++) {
                height += tileHeight;
                height -= 1; // Add border width
            }
            const tilesFromTop = Math.floor(rowCount / 2) - height / tileHeight / 2;

            container.style.width = `${width}px`;
            container.style.height = `${height}px`;
            container.style.top = `${tilesFromTop * tileHeight}px`;
        };
        setTimeout(setBackgroundSize, 0);

        window.addEventListener("resize", setBackgroundSize);
        return () => window.removeEventListener("resize", setBackgroundSize);
    }, []);

    const {initialState} = useAnimateIntoView(tabRefs[0], {
        initialState: END_ANIMATE_STATE,
        threshold: 100,
        delay: 300,
    });
    useAnimateIntoView(tabRefs[1], {
        initialState: INITIAL_ANIMATE_STATE,
        threshold: 100,
        delay: 500,
    });
    useAnimateIntoView(tabRefs[2], {
        initialState: INITIAL_ANIMATE_STATE,
        threshold: 100,
        delay: 700,
    });
    useAnimateIntoView(tabRefs[3], {
        initialState: INITIAL_ANIMATE_STATE,
        threshold: 100,
        delay: 900,
    });

    return (
        <nav
            className={twMerge(
                "z-10 lg:absolute lg:right-0 flex justify-end items-center overflow-hidden",
                className,
            )}
            ref={containerRef}
        >
            <ul
                className="w-full h-full grid lg:grid-cols-[unset] lg:grid-rows-4 bg-background-primary"
                ref={listRef}
            >
                {NAVBAR_TABS.map((tab, index) => (
                    <li
                        className="group"
                        style={initialState}
                        ref={tabRefs[index]}
                        key={tab.id}
                    >
                        <button
                            onClick={() => scrollToSection(tab.id)}
                            className={twMerge(
                                "relative z-10 w-full h-full p-6 pr-8 pl-12 uppercase font-bold text-3xl lg:text-5xl whitespace-nowrap flex items-center justify-center lg:justify-end overflow-hidden",
                                "[--extra-width:24px] after:z-[-1] after:absolute group-odd:after:right-[calc(100%+var(--extra-width))] lg:group-odd:after:-right-[calc(100%+var(--extra-width))] after:-right-[calc(100%+var(--extra-width))] after:h-full after:w-[calc(100%+var(--extra-width))] after:transition-[right] after:duration-300 after:ease-in-out after:shadow-lg after:border-y-2 after:border-y-background-tertiary/40 after:bg-gradient-to-l after:bg-background-secondary/30",
                                "border-[1px] border-background-tertiary lg:border-none",
                                "group-odd:hover:after:right-0 hover:after:right-0",
                            )}
                            data-spotlight
                        >
                            {tab.title}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
