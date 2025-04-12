import {Project} from "@/assets/projects";
import {useRef} from "react";
import {twMerge} from "tailwind-merge";
import {Tooltip} from "../Tooltip";
import useAnimateIntoView from "@/hooks/useAnimateIntoView";
import {scrollToSection} from "@/utils/scrollToSection";
import {renderIcon} from "@/utils/renderIcon";
import {useDirectionalHover} from "@/hooks/useDirectionalHover";

export function ProjectCard({
    className,
    project,
    index,
    parentRef,
}: {
    className?: string;
    project: Project;
    index: number;
    parentRef: React.RefObject<HTMLElement | null>;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const {handleMouseEnter, handleMouseLeave, refCallback} = useDirectionalHover();

    const {initialState} = useAnimateIntoView(containerRef, {
        delay: index * 150 + 200,
        siblingRef: parentRef,
    });

    return (
        <div
            style={initialState}
            className={twMerge(
                "relative p-5 flex flex-col gap-2 border-[1px] border-background-tertiary overflow-hidden",
                className,
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={containerRef}
        >
            {/* hover effect */}
            <div
                className="-z-10 absolute w-full h-full inset-0 bg-background-secondary/30 pointer-events-none"
                ref={refCallback}
            />

            <div className="flex justify-between">
                <span className="text-2xl font-semibold">{project.title}</span>
                <ul className="flex items-center gap-3" aria-label="Project links">
                    {project.links.map((link) => (
                        <li key={link.title}>
                            <Tooltip className="relative z-10" text={link.title}>
                                <a
                                    aria-label={`View ${link.title}`}
                                    className="flex items-center"
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {renderIcon(link.title, "small")}
                                </a>
                            </Tooltip>
                        </li>
                    ))}
                </ul>
            </div>
            <span className="text-text-secondary">{project.description}</span>
            <div className="flex-grow flex justify-between items-end gap-y-2 flex-wrap mt-3">
                <ul className="flex" aria-label="Technologies used">
                    {project.tech.map((techItem) => (
                        <li
                            className="py-1 px-2 mr-2 text-sm bg-background-secondary/60 rounded-md"
                            key={techItem}
                        >
                            {techItem}
                        </li>
                    ))}
                </ul>
                <span
                    className="text-text-secondary"
                    aria-label={`Created ${project.date}`}
                >
                    {project.date}
                </span>
            </div>

            <button
                className="absolute inset-0 w-full h-full"
                onClick={() => scrollToSection(`project-${project.title}`)}
                aria-label={`Read more about ${project.title}`}
            />
        </div>
    );
}
