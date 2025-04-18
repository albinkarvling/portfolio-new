"use client";
import {useRef} from "react";
import {TECH_STACK} from "@/assets";
import {TechStackItem} from "./TechStackItem";

const HEIGHTS = ["60%", "80%", "100%", "80%", "60%"];
const getHeightForIndex = (index: number) => HEIGHTS[index % HEIGHTS.length];

export function TechStack() {
    const containerRef = useRef<HTMLDivElement>(null);
    return (
        <section className="main-width" ref={containerRef}>
            <h2 id="tech-stack-header" className="sr-only">
                Tech-stack
            </h2>
            <ul className="pb-20 xl:pb-0 grid items-end xl:grid-cols-5 gap-10 xl:gap-0 overflow-hidden">
                {TECH_STACK.map((tech, index) => {
                    return (
                        <li
                            className="[--podium-height:unset] xl:[--podium-height:var(--height-for-index)] h-[--podium-height]"
                            style={
                                {
                                    ["--height-for-index"]: getHeightForIndex(index),
                                } as React.CSSProperties
                            }
                            key={tech.title}
                        >
                            <TechStackItem
                                parentRef={containerRef}
                                index={index}
                                tech={tech}
                            />
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
