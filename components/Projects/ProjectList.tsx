"use client";
import {PROJECTS} from "@/assets";
import {ProjectListItem} from "./ProjectListItem";

export function ProjectList() {
    return (
        <ul className="py-20 main-width">
            {PROJECTS.map((project, index) => (
                <li className="group" key={project.title}>
                    <ProjectListItem
                        className="group-first:pt-0"
                        project={project}
                        index={index}
                    />
                </li>
            ))}
        </ul>
    );
}
