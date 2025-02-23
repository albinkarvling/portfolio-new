"use client";
import {Project} from "@/assets/projects";
import {GitHub, OpenInNew} from "@mui/icons-material";
import {useRef, useState} from "react";
import {twMerge} from "tailwind-merge";
import {Tooltip} from "../Tooltip";
import useAnimateIntoView from "@/hooks/useAnimateIntoView";

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

    const renderIcon = (iconTitle: string) => {
        switch (iconTitle) {
            case "Figma":
                return (
                    <svg viewBox="0 0 15 15" fill="none" width="20">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.00005 2.04999H5.52505C4.71043 2.04999 4.05005 2.71037 4.05005 3.52499C4.05005 4.33961 4.71043 4.99999 5.52505 4.99999H7.00005V2.04999ZM7.00005 1.04999H8.00005H9.47505C10.842 1.04999 11.95 2.15808 11.95 3.52499C11.95 4.33163 11.5642 5.04815 10.9669 5.49999C11.5642 5.95184 11.95 6.66836 11.95 7.475C11.95 8.8419 10.842 9.95 9.47505 9.95C8.92236 9.95 8.41198 9.76884 8.00005 9.46266V9.95L8.00005 11.425C8.00005 12.7919 6.89195 13.9 5.52505 13.9C4.15814 13.9 3.05005 12.7919 3.05005 11.425C3.05005 10.6183 3.43593 9.90184 4.03317 9.44999C3.43593 8.99814 3.05005 8.28163 3.05005 7.475C3.05005 6.66836 3.43594 5.95184 4.03319 5.5C3.43594 5.04815 3.05005 4.33163 3.05005 3.52499C3.05005 2.15808 4.15814 1.04999 5.52505 1.04999H7.00005ZM8.00005 2.04999V4.99999H9.47505C10.2897 4.99999 10.95 4.33961 10.95 3.52499C10.95 2.71037 10.2897 2.04999 9.47505 2.04999H8.00005ZM5.52505 8.94998H7.00005L7.00005 7.4788L7.00005 7.475L7.00005 7.4712V6H5.52505C4.71043 6 4.05005 6.66038 4.05005 7.475C4.05005 8.28767 4.70727 8.94684 5.5192 8.94999L5.52505 8.94998ZM4.05005 11.425C4.05005 10.6123 4.70727 9.95315 5.5192 9.94999L5.52505 9.95H7.00005L7.00005 11.425C7.00005 12.2396 6.33967 12.9 5.52505 12.9C4.71043 12.9 4.05005 12.2396 4.05005 11.425ZM8.00005 7.47206C8.00164 6.65879 8.66141 6 9.47505 6C10.2897 6 10.95 6.66038 10.95 7.475C10.95 8.28962 10.2897 8.95 9.47505 8.95C8.66141 8.95 8.00164 8.29121 8.00005 7.47794V7.47206Z"
                            fill="currentColor"
                        />
                    </svg>
                );
            case "GitHub":
                return <GitHub fontSize="small" />;
            case "Website":
                return <OpenInNew fontSize="small" />;
        }
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
            <button className="absolute inset-0 w-full h-full">
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
                                    {renderIcon(link.title)}
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
