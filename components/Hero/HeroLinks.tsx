"use client";
import {LinkBubble} from "@/assets";
import {LINKS} from "@/assets/links";
import useAnimateIntoView, {DEFAULT_INITIAL_STATE} from "@/hooks/useAnimateIntoView";
import {renderIcon} from "@/utils/renderIcon";
import {createRef} from "react";

export function HeroLinks() {
    const linkRefs = LINKS.map(() => createRef<HTMLLIElement>());

    useAnimateIntoView(linkRefs[0], {delay: 1100});
    useAnimateIntoView(linkRefs[1], {delay: 1200});
    useAnimateIntoView(linkRefs[2], {delay: 1250});

    return (
        <ul className="mt-8 flex gap-8">
            {LINKS.map(({text, url}, index) => (
                <li
                    style={DEFAULT_INITIAL_STATE}
                    className="relative"
                    data-tooltip={text}
                    ref={linkRefs[index]}
                    key={text}
                >
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
                            <div className="text-4xl">{renderIcon(text)}</div>
                        </a>
                    </div>
                </li>
            ))}
        </ul>
    );
}
