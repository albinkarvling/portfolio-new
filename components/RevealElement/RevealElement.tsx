import {useEffect, useState} from "react";
import {twMerge} from "tailwind-merge";

const ANIMATION_DURATION = 1500;
export function RevealElement({
    children,
    isVisible,
    className,
}: {
    children: React.ReactNode;
    isVisible?: boolean;
    className?: string;
}) {
    const [childrenAreVisible, setChildrenAreVisible] = useState(false);

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
                "after:absolute after:inset-0 after:w-[200%] after:h-full after:bg-background-secondary after:transition-[left] after:duration-[--transition-duration]",
                !isVisible && "after:-left-[200%]",
                isVisible && "after:left-full",
                className,
            )}
        >
            <div className={twMerge(childrenAreVisible ? "opacity-100" : "opacity-0")}>
                {children}
            </div>
        </div>
    );
}
