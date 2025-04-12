import {createRef, useRef} from "react";
import {twMerge} from "tailwind-merge";
import {ArrowForward} from "@mui/icons-material";
import {Project} from "@/assets";
import {renderIcon} from "@/utils";
import {useAnimateIntoView} from "@/hooks";
import {RevealElement, Button, Tooltip} from "@/ui";
import {ProjectPreview} from "./ProjectPreview";

export function ProjectListItem({
    project,
    index,
    className,
}: {
    project: Project;
    index: number;
    className?: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const linkRefs = Array.from({length: 2}).map(() => createRef<HTMLAnchorElement>());

    const {isVisible} = useAnimateIntoView(containerRef, {
        initialState: {opacity: 1, transform: "translate(0,0)"},
    });
    const {initialState} = useAnimateIntoView(descriptionRef, {
        delay: 500,
        siblingRef: containerRef,
    });
    useAnimateIntoView(buttonRef, {
        delay: 650,
        siblingRef: containerRef,
    });
    useAnimateIntoView(linkRefs[0], {
        delay: 800,
        siblingRef: containerRef,
    });
    useAnimateIntoView(linkRefs[1], {
        delay: 900,
        siblingRef: containerRef,
    });

    const isRevered = index % 2 === 0;

    return (
        <div
            className={twMerge(
                "py-16 flex justify-between items-center gap-8 md:gap-16",
                !isRevered ? "flex-col-reverse md:flex-row" : "flex-col md:flex-row",
                className,
            )}
        >
            {!isRevered && <ProjectPreview project={project} isVisible={isVisible} />}
            <div className="relative md:w-[500px] grid" ref={containerRef}>
                <span className="-z-10 absolute bottom-[calc(100%-52px)] right-0 md:right-[unset] md:-left-12 text-outline text-9xl font-bold">
                    {String(index + 1).padStart(2, "0")}
                </span>
                <RevealElement isVisible={isVisible}>
                    <h3
                        className="text-4xl font-semibold"
                        id={`project-${project.title}`}
                    >
                        {project.title}
                    </h3>
                </RevealElement>
                <span
                    className="block mt-3 text-text-secondary"
                    style={initialState}
                    ref={descriptionRef}
                >
                    {project.longDescription}
                </span>
                <div className="mt-5 flex gap-5">
                    <Button
                        href={project.links[2].url}
                        icon={<ArrowForward fontSize="small" />}
                        style={initialState}
                        ref={buttonRef}
                    >
                        Visit site
                    </Button>
                    <ul className="flex items-center gap-5">
                        {project.links
                            .filter((link) => link.title !== "Website")
                            .map((link, index) => (
                                <li key={link.title}>
                                    <Tooltip text={link.title}>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-text-secondary flex"
                                            aria-label={`View ${link.title}`}
                                            style={initialState}
                                            ref={linkRefs[index]}
                                        >
                                            {renderIcon(link.title, "medium")}
                                        </a>
                                    </Tooltip>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            {isRevered && <ProjectPreview project={project} isVisible={isVisible} />}
        </div>
    );
}
