"use client";
import {PROJECTS} from "@/assets/projects";
import {ProjectListItem} from "./ProjectListItem";

export function ProjectList() {
    return (
        <ul className="py-20 main-width">
            {PROJECTS.map((project, index) => (
                <li key={project.title}>
                    <ProjectListItem project={project} index={index} />
                </li>
            ))}
        </ul>
    );
}
