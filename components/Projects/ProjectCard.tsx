import {Project} from "@/assets/projects";
import {useRef, useState} from "react";
import {twMerge} from "tailwind-merge";
import {Tooltip} from "../Tooltip";
import useAnimateIntoView from "@/hooks/useAnimateIntoView";
import {scrollToSection} from "@/utils/scrollToSection";
import {renderIcon} from "@/utils/renderIcon";

function getDirection(e: React.MouseEvent, element: Element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const w = rect.width;
    const h = rect.height;

    // Calculate the x and y distance from center, normalized by width/height
    const xNorm = (x - w / 2) / (w / 2);
    const yNorm = (y - h / 2) / (h / 2);

    // Calculate angle in degrees
    const angle = Math.atan2(yNorm, xNorm) * (180 / Math.PI);

    // Determine side based on the angle
    if (angle >= -45 && angle < 45) return "right";
    if (angle >= 45 && angle < 135) return "bottom";
    if (angle >= -135 && angle < -45) return "top";
    return "left";
}
type HoverDirection = ReturnType<typeof getDirection>;

function getStartPosition(direction: HoverDirection) {
    switch (direction) {
        case "top":
            return {x: 0, y: "-100%"};
        case "right":
            return {x: "100%", y: 0};
        case "bottom":
            return {x: 0, y: "100%"};
        case "left":
            return {x: "-100%", y: 0};
    }
}
function getExitPosition(direction: HoverDirection | null) {
    // default position
    if (!direction) return {x: "-100%", y: 0};
    switch (direction) {
        case "top":
            return {x: 0, y: "-100%"};
        case "right":
            return {x: "100%", y: 0};
        case "bottom":
            return {x: 0, y: "100%"};
        case "left":
            return {x: "-100%", y: 0};
    }
}

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
    const [exitDirection, setExitDirection] = useState<null | HoverDirection>(null);
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const hoverRef = useRef<HTMLDivElement>(null);

    const {initialState} = useAnimateIntoView(containerRef, {
        delay: index * 150 + 200,
        siblingRef: parentRef,
    });

    const handleMouseEnter = (e: React.MouseEvent) => {
        const direction = getDirection(e, e.currentTarget);
        const {x, y} = getStartPosition(direction);
        if (!hoverRef.current) return;

        // Set the starting position without a transition
        hoverRef.current.style.transition = "none";
        hoverRef.current.style.transform = `translate(${x}, ${y})`;

        // Force a reflow to flush the style changes
        void hoverRef.current.offsetWidth;

        // Now set the transition property and animate to the final state
        hoverRef.current.style.transition = "transform 0.3s ease-in-out";
        hoverRef.current.style.transform = "translate(0, 0)";
        setIsHovering(true);
    };

    const handleMouseLeave = (e: React.MouseEvent) => {
        if (!hoverRef.current) return;

        hoverRef.current.style.transition = "transform 0.3s ease-in-out";

        const direction = getDirection(e, e.currentTarget);
        hoverRef.current.style.transform = `translate(${getExitPosition(direction).x}, ${getExitPosition(direction).y})`;

        setExitDirection(direction);
        setIsHovering(false);
    };

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
                style={{
                    transform: isHovering
                        ? "translate(0, 0)"
                        : `translate(${getExitPosition(exitDirection).x}, ${getExitPosition(exitDirection).y})`,
                }}
                className="-z-10 absolute w-full h-full inset-0 bg-background-secondary/30 pointer-events-none"
                ref={hoverRef}
            />

            {/* button to read more, with screen reader text for accessibility */}
            <button
                className="absolute inset-0 w-full h-full"
                onClick={() => scrollToSection(`project-${project.title}`)}
            >
                <span className="sr-only">
                    {project.title}, {project.description}, Technologies:{" "}
                    {project.tech.join(", ")}, Date: {project.date}. Click to read more.
                </span>
            </button>

            <div className="flex justify-between">
                <span className="text-2xl font-semibold" aria-hidden="true">
                    {project.title}
                </span>
                <ul className="flex items-center gap-3">
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
            <span className="text-text-secondary" aria-hidden="true">
                {project.description}
            </span>
            <div
                className="flex-grow flex justify-between items-end gap-y-2 flex-wrap mt-3"
                aria-hidden="true"
            >
                <ul className="flex">
                    {project.tech.map((techItem) => (
                        <li
                            className="py-1 px-2 mr-2 text-sm bg-background-secondary/60 rounded-md"
                            key={techItem}
                        >
                            {techItem}
                        </li>
                    ))}
                </ul>
                <span className="text-text-secondary">{project.date}</span>
            </div>
        </div>
    );
}
