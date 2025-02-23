import {twMerge} from "tailwind-merge";
import {AboutPanel} from "./About";
import {createRef, useRef} from "react";
import useAnimateIntoView from "@/hooks/useAnimateIntoView";

export function AboutActivePanel({
    tabPanel,
    siblingRef,
    ignoreDelay,
}: {
    tabPanel: AboutPanel;
    siblingRef: React.RefObject<HTMLElement | null>;
    ignoreDelay: boolean;
}) {
    const headerRef = useRef<HTMLHeadingElement>(null);
    const bulletPointRefs = Array.from({length: tabPanel.bulletPoints.length}).map(() =>
        createRef<HTMLLIElement>(),
    );

    const BASE_DELAY = ignoreDelay ? 100 : 500;
    const {initialState} = useAnimateIntoView(headerRef, {
        delay: BASE_DELAY,
        siblingRef,
    });
    useAnimateIntoView(bulletPointRefs[0], {
        delay: BASE_DELAY + 200,
        siblingRef,
    });
    useAnimateIntoView(bulletPointRefs[1], {
        delay: BASE_DELAY + 350,
        siblingRef,
    });
    useAnimateIntoView(bulletPointRefs[2], {
        delay: BASE_DELAY + 450,
        siblingRef,
    });
    useAnimateIntoView(bulletPointRefs[3], {
        delay: BASE_DELAY + 600,
        siblingRef,
    });

    return (
        <>
            <span className="block" style={initialState} ref={headerRef}>
                {tabPanel.text}
            </span>
            <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {tabPanel.bulletPoints.map((bulletPoint, index) => (
                    <li
                        style={initialState}
                        ref={bulletPointRefs[index]}
                        className="[--border-width:3px] [--border-size:24px] relative flex-1 py-3 px-4 font-medium text-sm bg-background-secondary rounded-md"
                        key={index}
                    >
                        <span className="relative z-10">{bulletPoint}</span>

                        <div
                            className={twMerge(
                                "w-[--border-size] h-[--border-size] absolute top-0 left-0 bg-background-quaternary rounded-tl-md",
                                "[--border-width:3px] after:w-[calc(100%-var(--border-width))] after:h-[calc(100%-var(--border-width))] after:absolute after:bottom-0 after:right-0 after:bg-background-secondary after:rounded-tl-[calc(0.375rem-0.15rem)]",
                            )}
                        />
                        <div
                            className={twMerge(
                                "w-[--border-size] h-[--border-size] absolute right-0 bottom-0 bg-background-quaternary rounded-br-md",
                                "[--border-width:3px] after:w-[calc(100%-var(--border-width))] after:h-[calc(100%-var(--border-width))] after:absolute after:top-0 after:left-0 after:bg-background-secondary after:rounded-br-[calc(0.375rem-0.15rem)]",
                            )}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
}
