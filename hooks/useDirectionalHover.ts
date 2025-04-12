import {useReducedMotion} from "framer-motion";
import {useCallback, useEffect, useRef} from "react";

function getDirection(e: React.MouseEvent, element: Element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const w = rect.width;
    const h = rect.height;

    // Calculate the x and y distance from center, normalized by width/height
    const xNorm = (x - w / 2) / (w / 2);
    const yNorm = (y - h / 2) / (h / 2);

    // Calculate angle in degrees
    const angle = Math.atan2(yNorm, xNorm) * (180 / Math.PI);

    // Determine side based on the angle
    if (angle >= -45 && angle < 45) return "right";
    if (angle >= 45 && angle < 135) return "bottom";
    if (angle >= -135 && angle < -45) return "top";
    return "left";
}
type HoverDirection = ReturnType<typeof getDirection>;

function getStartPosition(direction: HoverDirection) {
    switch (direction) {
        case "top":
            return {x: 0, y: "-100%"};
        case "right":
            return {x: "100%", y: 0};
        case "bottom":
            return {x: 0, y: "100%"};
        case "left":
            return {x: "-100%", y: 0};
    }
}
function getExitPosition(direction: HoverDirection | null) {
    // default position
    if (!direction) return {x: "-100%", y: 0};
    switch (direction) {
        case "top":
            return {x: 0, y: "-100%"};
        case "right":
            return {x: "100%", y: 0};
        case "bottom":
            return {x: 0, y: "100%"};
        case "left":
            return {x: "-100%", y: 0};
    }
}

export function useDirectionalHover() {
    const hasReducedMotion = useReducedMotion();
    const refCallback = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!refCallback.current || hasReducedMotion) return;
        refCallback.current.style.transform = "translate(-100%, -100%)";
    }, [hasReducedMotion]);

    const handleMouseEnter = useCallback(
        (e: React.MouseEvent) => {
            if (!refCallback.current || hasReducedMotion) return;

            const direction = getDirection(e, e.currentTarget);
            const {x, y} = getStartPosition(direction);

            // Set the starting position without a transition
            refCallback.current.style.transition = "none";
            refCallback.current.style.transform = `translate(${x}, ${y})`;

            // Force a reflow to flush the style changes
            void refCallback.current.offsetWidth;

            // Now set the transition property and animate to the final state
            refCallback.current.style.transition = "transform 0.3s ease-in-out";
            refCallback.current.style.transform = "translate(0, 0)";
        },
        [hasReducedMotion],
    );

    const handleMouseLeave = useCallback(
        (e: React.MouseEvent) => {
            if (!refCallback.current || hasReducedMotion) return;

            refCallback.current.style.transition = "transform 0.3s ease-in-out";

            const direction = getDirection(e, e.currentTarget);
            refCallback.current.style.transform = `translate(${getExitPosition(direction).x}, ${getExitPosition(direction).y})`;
        },
        [hasReducedMotion],
    );

    return {handleMouseEnter, handleMouseLeave, refCallback};
}
