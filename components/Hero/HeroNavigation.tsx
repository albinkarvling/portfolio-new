"use client";
import useAnimateIntoView from "@/hooks/useAnimateIntoView";
import {createRef, useEffect, useRef} from "react";
import {twMerge} from "tailwind-merge";

const NAVBAR_TABS = [
    {id: 1, title: "About"},
    {id: 2, title: "Projects"},
    {id: 3, title: "Tech-Stack"},
    {id: 4, title: "Contact"},
];

const INITIAL_ANIMATE_STATE = {
    opacity: 0,
    transform: "translateX(100%)",
};
const END_ANIMATE_STATE = {
    opacity: 1,
    transform: "translateX(0)",
};
export function HeroNavigation() {
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

    useAnimateIntoView(tabRefs[0], {
        initialState: END_ANIMATE_STATE,
        delay: 300,
    });
    useAnimateIntoView(tabRefs[1], {
        initialState: INITIAL_ANIMATE_STATE,
        delay: 500,
    });
    useAnimateIntoView(tabRefs[2], {
        initialState: INITIAL_ANIMATE_STATE,
        delay: 700,
    });
    useAnimateIntoView(tabRefs[3], {
        initialState: INITIAL_ANIMATE_STATE,
        delay: 900,
    });

    return (
        <nav
            className="z-10 absolute right-0 flex justify-end items-center overflow-hidden"
            ref={containerRef}
        >
            <ul
                className="w-full h-full grid grid-rows-4 bg-background-primary"
                ref={listRef}
            >
                {NAVBAR_TABS.map((tab, index) => (
                    <li style={INITIAL_ANIMATE_STATE} ref={tabRefs[index]} key={tab.id}>
                        <button
                            className={twMerge(
                                "relative z-10 w-full h-full p-6 pr-8 pl-12 uppercase font-bold text-5xl whitespace-nowrap flex items-center justify-end",
                                "[--extra-width:24px] after:z-[-1] after:absolute after:-right-[calc(100%+var(--extra-width))] after:h-full after:w-[calc(100%+var(--extra-width))] after:transition-[right] after:duration-300 after:ease-in-out after:shadow-lg after:border-y-2 after:border-y-background-tertiary/40 after:bg-gradient-to-l after:bg-background-secondary/30",
                                "hover:after:right-0",
                            )}
                            style={{}}
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
