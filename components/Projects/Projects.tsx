"use client";
import useAnimateIntoView from "@/hooks/useAnimateIntoView";
import {ProjectCards} from "./ProjectCards";
import {ProjectList} from "./ProjectList";
import {useRef} from "react";
import {twMerge} from "tailwind-merge";

export function Projects() {
    const headerRef = useRef<HTMLHeadingElement>(null);

    const {isVisible, initialState} = useAnimateIntoView(headerRef);
    return (
        <section className="py-20">
            <h2
                id="projects-header"
                style={initialState}
                className={twMerge(
                    "relative flex justify-center text-5xl font-semibold",
                    "after:h-[1px] after:-z-10 after:absolute after:left-2/4 after:-translate-x-2/4 after:top-2/4 after:-translate-y-2/4 after:bg-background-secondary after:transition-[width] after:duration-1000",
                    isVisible ? "after:w-full" : "after:w-0",
                )}
                ref={headerRef}
            >
                <span className="px-8 bg-background-primary">Projects</span>
            </h2>
            <ProjectCards headerRef={headerRef} />
            <ProjectList />
        </section>
    );
}
