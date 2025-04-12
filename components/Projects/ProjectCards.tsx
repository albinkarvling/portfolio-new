import {PROJECTS} from "@/assets";
import {ProjectCard} from "./ProjectCard";

export function ProjectCards({
    headerRef,
}: {
    headerRef: React.RefObject<HTMLHeadingElement | null>;
}) {
    return (
        <div className="py-20 border-b-[1px] border-b-background-secondary">
            <ul className="main-width grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </div>
    );
}
