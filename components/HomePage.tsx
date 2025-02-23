import {Hero} from "./Hero";
import {About} from "./About";
import {Projects} from "./Projects";
import {TechStack} from "./TechStack";

export function HomePage() {
    return (
        <main>
            <Hero />
            <About />
            <Projects />
            <TechStack />
        </main>
    );
}
