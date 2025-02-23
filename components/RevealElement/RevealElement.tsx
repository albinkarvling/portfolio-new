import {useHasReducedMotion} from "@/hooks/useHasReducedMotion";
import {useEffect, useState} from "react";
import {twMerge} from "tailwind-merge";

const ANIMATION_DURATION = 1700;
export function RevealElement({
    children,
    isVisible,
    className,
    color = "secondary",
    direction = "left",
}: {
    children: React.ReactNode;
    isVisible?: boolean;
    className?: string;
    direction?: "left" | "top";
    color?: "primary" | "secondary" | "tertiary" | "quaternary";
}) {
    const hasReducedMotion = useHasReducedMotion();
    const [childrenAreVisible, setChildrenAreVisible] = useState(false);

    useEffect(() => {
        if (hasReducedMotion) {
            setChildrenAreVisible(true);
        }
    }, [hasReducedMotion]);

    useEffect(() => {
        if (!isVisible) return;
        setTimeout(() => {
            setChildrenAreVisible(true);
        }, ANIMATION_DURATION / 3);
    }, [isVisible]);

    return (
        <div
            style={
                {
                    "--transition-duration": `${ANIMATION_DURATION}ms`,
                } as React.CSSProperties
            }
            className={twMerge(
                "relative w-fit overflow-hidden",
                !hasReducedMotion &&
                    "after:absolute after:inset-0 after:w-[200%] after:h-[200%] after:transition-[left,top] after:duration-[--transition-duration]",
                color === "primary" && "after:bg-background-primary",
                color === "secondary" && "after:bg-background-secondary",
                color === "tertiary" && "after:bg-background-tertiary",
                color === "quaternary" && "after:bg-background-quaternary",
                !isVisible && direction === "left" && "after:-left-[200%]",
                isVisible && direction === "left" && "after:left-full",
                !isVisible && direction === "top" && "after:-top-[200%]",
                isVisible && direction === "top" && "after:top-full",
                className,
            )}
        >
            <div className={twMerge(childrenAreVisible ? "opacity-100" : "opacity-0")}>
                {children}
            </div>
        </div>
    );
}
