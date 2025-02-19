"use client";
import React, {useEffect, useRef, forwardRef, useCallback} from "react";
import {twMerge} from "tailwind-merge";

const TILE_SIZE = 100;
const BASE_RADIUS = 150;
const HOVER_RADIUS = 300;
const TRANSITION_DURATION = 200; // Transition duration in ms
const LERP_SPEED = 0.05; // Adjust for more or less lag (0.05 = more lag, 0.2 = less lag)
const GRID_FADE_START = 60; // The percentage at which the grid starts to fade out
const GRID_FADE_END_LARGE = 100;
const GRID_FADE_END_SMALL = 70;

type HeroGridProps = {
    spotlight?: boolean;
    containerRef: React.RefObject<HTMLDivElement | null>;
};
const HeroGrid = forwardRef(({spotlight, containerRef}: HeroGridProps, ref) => {
    const [columnCount, setColumnCount] = React.useState(0);
    const [rowCount, setRowCount] = React.useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (!containerRef.current) return;
            const {width, height} = containerRef.current.getBoundingClientRect();
            setColumnCount(Math.floor(width / TILE_SIZE));
            setRowCount(Math.floor(height / TILE_SIZE));
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [containerRef]);

    return (
        <div
            className={twMerge(
                "absolute w-full h-full pointer-events-none",
                "[--grid-fade-end:var(--grid-fade-end-small)] lg:[--grid-fade-end:var(--grid-fade-end-large)]",
            )}
            style={
                {
                    maskImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1) var(--grid-fade-start), rgba(0, 0, 0, 0) var(--grid-fade-end))`,
                    WebkitMaskImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1) var(--grid-fade-start), rgba(0, 0, 0, 0) var(--grid-fade-end))`,
                    "--grid-fade-start": `${GRID_FADE_START}%`,
                    "--grid-fade-end-small": `${GRID_FADE_END_SMALL}%`,
                    "--grid-fade-end-large": `${GRID_FADE_END_LARGE}%`,
                } as React.CSSProperties
            }
        >
            <div data-row-count={rowCount} ref={ref as React.RefObject<HTMLDivElement>}>
                {Array.from({length: rowCount}).map((_, index) => (
                    <div
                        className="flex gap-[1px]"
                        id={`background-row-${index}`}
                        key={index}
                    >
                        {Array.from({length: columnCount}).map((_, index) => (
                            <div
                                key={index}
                                className={twMerge(
                                    "flex-1 aspect-square border-l-[1px] border-b-[1px] first-of-type:border-l-0 border-background-tertiary/70",
                                    spotlight && "border-text-primary",
                                )}
                                style={{width: TILE_SIZE}}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
});
HeroGrid.displayName = "HeroGrid"; // Avoid Next.js warnings

export function HeroBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const maskRef = useRef<HTMLDivElement>(null);
    const targetRadius = useRef(BASE_RADIUS);
    const animationFrame = useRef<number | null>(null);
    const mousePositionRef = useRef({x: 0, y: 0});
    const currentMouseRef = useRef({x: 0, y: 0});
    const currentRadiusRef = useRef(BASE_RADIUS); // Stores the last radius

    const updateMask = (radius: number, x: number, y: number) => {
        if (maskRef.current) {
            maskRef.current.style.maskImage = `radial-gradient(circle ${radius}px at ${x}px ${y}px, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.4) 30%, rgba(255, 255, 255, 0) 100%)`;
            maskRef.current.style.webkitMaskImage = maskRef.current.style.maskImage;
        }
    };

    // Animation to smoothly transition the radius
    const startAnimation = useCallback(() => {
        let startTime: number | null = null;
        const startRadius = currentRadiusRef.current;
        const endRadius = targetRadius.current;

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / TRANSITION_DURATION, 1);
            const newRadius = startRadius + (endRadius - startRadius) * progress;

            currentRadiusRef.current = newRadius;
            updateMask(newRadius, currentMouseRef.current.x, currentMouseRef.current.y);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        const {width, height} = container.getBoundingClientRect();
        updateMask(BASE_RADIUS, width / 2, height / 2);

        const handleMouseMove = (e: MouseEvent) => {
            mousePositionRef.current = {x: e.clientX, y: e.clientY};
        };

        // Smoothly move the spotlight with a delay
        const smoothMouseMove = () => {
            currentMouseRef.current.x +=
                (mousePositionRef.current.x - currentMouseRef.current.x) * LERP_SPEED;
            currentMouseRef.current.y +=
                (mousePositionRef.current.y - currentMouseRef.current.y) * LERP_SPEED;

            updateMask(
                currentRadiusRef.current,
                currentMouseRef.current.x,
                currentMouseRef.current.y,
            );
            animationFrame.current = requestAnimationFrame(smoothMouseMove);
        };

        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest("[data-spotlight]")) {
                targetRadius.current = HOVER_RADIUS;
                startAnimation();
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest("[data-spotlight]")) {
                targetRadius.current = BASE_RADIUS;
                startAnimation();
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);

        // **Ensure Smooth Movement Always Runs**
        if (!animationFrame.current) {
            animationFrame.current = requestAnimationFrame(smoothMouseMove);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current);
            }
        };
    }, [startAnimation]);

    return (
        <div
            className="-z-10 absolute w-full h-full pointer-events-none"
            ref={containerRef}
        >
            <HeroGrid containerRef={containerRef} />
            <HeroGrid containerRef={containerRef} ref={maskRef} spotlight />
        </div>
    );
}
