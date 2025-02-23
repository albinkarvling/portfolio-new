import {Hero} from "./Hero";
import {About} from "./About";
import {Projects} from "./Projects";
import {TechStack} from "./TechStack";
import {Contact} from "./Contact";
import {Footer} from "./Footer";

export function HomePage() {
    return (
        <main>
            <Hero />
            <About />
            <Projects />
            <TechStack />
            <Contact />
            <Footer />
        </main>
    );
}
