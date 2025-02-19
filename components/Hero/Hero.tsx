import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {HeroBackground} from "./HeroBackground";
import {HeroLinks} from "./HeroLinks";
import {HeroNavigation} from "./HeroNavigation";

export function Hero() {
    return (
        <section className="relative w-full h-[95dvh]" id="hero-section">
            <HeroBackground />

            <div className="h-[calc(100%-30px)] w-main max-w-main mx-auto flex items-center">
                <div className="w-[480px] max-w-full">
                    <h1 className="text-5xl font-semibold">Hi, Albin here.</h1>
                    <p className="mt-2 text-4xl text-text-secondary">
                        I create stuff sometimes.
                    </p>
                    <p className="mt-4 text-lg font-medium text-text-secondary">
                        I am a full stack developer, with experience in frontend, backend
                        & cloud technologies.
                    </p>
                    <HeroLinks />
                </div>
                <HeroNavigation />
            </div>

            <button
                className="absolute bottom-16 left-2/4 -translate-x-2/4 grid place-items-center gap-1"
                data-spotlight
            >
                Read more
                <ArrowDownwardIcon className="animate-arrow-bounce" />
            </button>
        </section>
    );
}
