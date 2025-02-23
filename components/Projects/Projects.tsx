import {ProjectCards} from "./ProjectCards";
import {ProjectList} from "./ProjectList";

export function Projects() {
    return (
        <section className="py-20">
            <ProjectCards />
            <ProjectList />
        </section>
    );
}
