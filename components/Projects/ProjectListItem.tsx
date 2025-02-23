import {Project} from "@/assets/projects";
import {Tooltip} from "../Tooltip";
import {ProjectPreview} from "./ProjectPreview";
import {renderIcon} from "@/utils/renderIcon";

export function ProjectListItem({project, index}: {project: Project; index: number}) {
    const isRevered = index % 2 === 0;

    return (
        <div
            className="py-16 flex justify-between items-center"
            id={`project-${project.title}`}
        >
            {!isRevered && <ProjectPreview project={project} />}
            <div className="relative w-[500px] grid">
                <span className="-z-10 absolute bottom-[calc(100%-52px)] -left-12 text-outline text-9xl font-bold">
                    {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-4xl font-semibold">{project.title}</span>
                <span className="block mt-3 text-text-secondary">
                    {project.longDescription}
                </span>
                <div className="mt-5 flex gap-5">
                    <button>Visit site</button>
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
