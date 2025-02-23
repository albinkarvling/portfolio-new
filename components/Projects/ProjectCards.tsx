"use client";
import {PROJECTS} from "@/assets/projects";
import {twMerge} from "tailwind-merge";
import {ProjectCard} from "./ProjectCard";
import {useRef} from "react";
import useAnimateIntoView from "@/hooks/useAnimateIntoView";

export function ProjectCards() {
    const headerRef = useRef<HTMLHeadingElement>(null);

    const {isVisible, initialState} = useAnimateIntoView(headerRef);

    return (
        <>
            <h2
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
            <ul className="py-20 main-width grid sm:grid-cols-2 lg:grid-cols-3 gap-4 border-b-[1px] border-b-background-secondary">
                {PROJECTS.map((project, index) => (
                    <li className="flex-grow" key={project.title}>
                        <ProjectCard
                            className="h-full"
                            project={project}
                            index={index}
                            parentRef={headerRef}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
}
