"use client";
import {useEffect, useRef, useState} from "react";
import {twMerge} from "tailwind-merge";

const NAVBAR_TABS = [
    {id: 1, title: "About"},
    {id: 2, title: "Projects"},
    {id: 3, title: "Tech-Stack"},
    {id: 4, title: "Contact"},
];

export function HeroNavigation() {
    const listRef = useRef<HTMLUListElement>(null);
    const [navigationDimensions, setNavigationDimensions] = useState({
        width: 0,
        height: 0,
        top: 0,
    });

    useEffect(() => {
        const setBackgroundSize = () => {
            const list = listRef.current;
            const row = document.getElementById("background-row-0");
            if (!row || !list) return;

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
            const wiggleRoom = 20;
            for (let i = 0; width + wiggleRoom < listWidth; i++) {
                width += tileWidth;
                width += 1; // Add border width
            }
            for (let i = 0; height + wiggleRoom < listHeight; i++) {
                height += tileHeight;
                height -= 1; // Add border width
            }
            const tilesFromTop = Math.floor(rowCount / 2) - height / tileHeight / 2;

            setNavigationDimensions({
                width,
                height,
                top: tilesFromTop * tileHeight,
            });
        };
        setTimeout(setBackgroundSize, 0);

        window.addEventListener("resize", setBackgroundSize);
        return () => window.removeEventListener("resize", setBackgroundSize);
    }, []);

    const {width, height, top} = navigationDimensions;
    return (
        <nav
            className="z-10 absolute right-0 flex justify-end items-center overflow-hidden"
            style={{
                width: width ? width : "undefined",
                height: height ? height : "undefined",
                top: top ? top : "undefined",
            }}
        >
            <ul
                className="w-full h-full grid grid-rows-4 bg-background-primary"
                ref={listRef}
            >
                {NAVBAR_TABS.map((tab) => (
                    <li key={tab.id}>
                        <button
                            className={twMerge(
                                "relative z-10 w-full h-full p-6 pr-8 uppercase font-bold text-5xl flex items-center justify-end",
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
