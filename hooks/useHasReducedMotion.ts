export function useHasReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
