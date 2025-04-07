"use client";
import {LinkBubble} from "@/assets";
import {LINKS} from "@/assets/links";
import useAnimateIntoView from "@/hooks/useAnimateIntoView";
import {renderIcon} from "@/utils/renderIcon";
import {createRef} from "react";
import {Tooltip} from "../Tooltip";

export function HeroLinks() {
    const linkRefs = LINKS.map(() => createRef<HTMLLIElement>());

    const {initialState} = useAnimateIntoView(linkRefs[0], {delay: 1100});
    useAnimateIntoView(linkRefs[1], {delay: 1200});
    useAnimateIntoView(linkRefs[2], {delay: 1250});

    return (
        <ul className="mt-8 flex gap-8">
            {LINKS.map(({text, url}, index) => (
                <li
                    style={initialState}
                    className="relative"
                    ref={linkRefs[index]}
                    key={text}
                >
                    <LinkBubble />
                    <Tooltip text={text} className="absolute inset-0 -ml-0.5 -mt-1.5">
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={text}
                            className="w-full h-full flex items-center justify-center"
                            data-spotlight
                        >
                            <div className="text-4xl">{renderIcon(text)}</div>
                        </a>
                    </Tooltip>
                </li>
            ))}
        </ul>
    );
}
