import {HeroBackground} from "./HeroBackground";

export function Hero() {
    return (
        <section className="relative w-full h-[85dvh]">
            <HeroBackground />
            <button data-spotlight>Testy</button>
            Hero
        </section>
    );
}
