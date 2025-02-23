import {useEffect, useState} from "react";

export function useHasReducedMotion() {
    const [hasReducedMotion, setHasReducedMotion] = useState(false);

    useEffect(() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        setHasReducedMotion(reducedMotion.matches);
    }, []);

    return hasReducedMotion;
}
