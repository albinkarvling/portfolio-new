import {RefObject, useCallback, useEffect, useState} from "react";
import {useHasReducedMotion} from "./useHasReducedMotion";

const DEFAULT_INITIAL_STATE: {
    opacity: number;
    transform: string;
} = {
    opacity: 0,
    transform: "translateY(25px)",
};
const DEFAULT_DELAY = 0;
const DEFAULT_DURATION = 600;
const DEFAULT_THRESHOLD = 0.7;
export default function useAnimateIntoView(
    ref: RefObject<HTMLElement | null>,
    {
        delay = DEFAULT_DELAY,
        duration = DEFAULT_DURATION,
        threshold = DEFAULT_THRESHOLD,
        initialState = DEFAULT_INITIAL_STATE,
        siblingRef,
    }:
        | {
              delay?: number;
              duration?: number;
              threshold?: number;
              initialState?: typeof DEFAULT_INITIAL_STATE;
              siblingRef?: RefObject<HTMLElement | null>;
          }
        | undefined = {},
) {
    const preferesNoMotion = useHasReducedMotion();
    const [isVisible, setIsVisible] = useState(preferesNoMotion);

    const getVisible = useCallback(
        (ref: RefObject<HTMLElement | null>) => {
            if (!ref.current) return false;
            if (window.getComputedStyle(ref.current).display === "none") return false;

            const {top} = ref.current.getBoundingClientRect();
            return top / window.innerHeight <= threshold;
        },
        [threshold],
    );

    const getSiblingVisible = useCallback(() => {
        if (!siblingRef?.current) return false;
        const isVisible = getVisible(siblingRef);
        setIsVisible(isVisible);
        return isVisible;
    }, [getVisible, siblingRef]);

    useEffect(() => {
        if (!ref.current) {
            console.error("useAnimateIntoView: ref is not defined");
            return;
        }
        if (preferesNoMotion) {
            console.log("useAnimateIntoView: prefers-reduced-motion");
            return;
        }

        ref.current.style.opacity = initialState.opacity.toString();
        ref.current.style.transform = initialState.transform;
        ref.current.style.transition = `opacity ${duration}ms, transform ${duration}ms`;
        ref.current.style.transitionDelay = `${delay}ms`;

        const onScroll = () => {
            if (!ref.current) return;

            const isVisible = getVisible(ref) || getSiblingVisible();
            setIsVisible(isVisible);

            if (isVisible) {
                ref.current.style.opacity = "1";
                ref.current.style.transform = "translateY(0px)";

                window.removeEventListener("scroll", onScroll);

                setTimeout(() => {
                    if (!ref.current) return;
                    ref.current.style.opacity = "";
                    ref.current.style.transform = "";
                    ref.current.style.transition = "";
                    ref.current.style.transitionDelay = "";
                }, duration + delay);
            }
        };
        onScroll();

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [
        delay,
        duration,
        getSiblingVisible,
        getVisible,
        initialState.opacity,
        initialState.transform,
        ref,
        preferesNoMotion,
    ]);

    return {
        initialState: preferesNoMotion
            ? {
                  opacity: 1,
                  transform: "translate(0,0)",
              }
            : initialState,
        isVisible,
    };
}
