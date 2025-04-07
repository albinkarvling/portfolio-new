import {twMerge} from "tailwind-merge";

export function StyledCorner({position}: {position: "top-left" | "bottom-right"}) {
    return (
        <div
            className={twMerge(
                "[--border-width:3px] [--border-size:24px] w-[--border-size] h-[--border-size] absolute bg-background-quaternary rounded-tl-md",
                "after:w-[calc(100%-var(--border-width))] after:h-[calc(100%-var(--border-width))] after:absolute after:bg-background-secondary",
                position === "top-left" &&
                    "top-0 left-0 after:bottom-0 after:right-0 after:rounded-tl-[--rounded]",
                position === "bottom-right" &&
                    "right-0 bottom-0 after:top-0 after:left-0 after:rounded-br-[--rounded]",
            )}
        />
    );
}
