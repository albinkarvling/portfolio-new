import {Project} from "@/assets/projects";
import {Tooltip} from "../Tooltip";
import {ProjectPreview} from "./ProjectPreview";
import {renderIcon} from "@/utils/renderIcon";
import {twMerge} from "tailwind-merge";
import {Button} from "../Button";

export function ProjectListItem({
    project,
    index,
    className,
}: {
    project: Project;
    index: number;
    className?: string;
}) {
    const isRevered = index % 2 === 0;

    return (
        <div
            className={twMerge(
                "py-16 flex justify-between items-center gap-8 md:gap-16",
                !isRevered ? "flex-col-reverse md:flex-row" : "flex-col md:flex-row",
                className,
            )}
            id={`project-${project.title}`}
        >
            {!isRevered && <ProjectPreview project={project} />}
            <div className="relative md:w-[500px] grid">
                <span className="-z-10 absolute bottom-[calc(100%-52px)] right-0 md:right-[unset] md:-left-12 text-outline text-9xl font-bold">
                    {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-4xl font-semibold">{project.title}</span>
                <span className="block mt-3 text-text-secondary">
                    {project.longDescription}
                </span>
                <div className="mt-5 flex gap-5">
                    <Button href={project.links[2].url}>Visit site</Button>
                    <ul className="flex items-center gap-5">
                        {project.links
                            .filter((link) => link.title !== "Website")
                            .map((link) => (
                                <li key={link.title}>
                                    <Tooltip text={link.title}>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-text-secondary flex"
                                            aria-label={`View ${link.title}`}
                                        >
                                            {renderIcon(link.title, "small")}
                                        </a>
                                    </Tooltip>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            {isRevered && <ProjectPreview project={project} />}
        </div>
    );
}
