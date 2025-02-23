import {useCallback, useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

const INITIAL_SCALE = 0.9;
const INITIAL_POSITION = {opacity: 0, scale: INITIAL_SCALE};
const ANIMATE_POSITION = {opacity: 1, scale: 1};

export function Tooltip({
    children,
    text,
    className,
    spaceFromParent = 8,
    duration = 0.2,
}: {
    children: React.ReactNode;
    text: string;
    spaceFromParent?: number;
    duration?: number;
    className?: string;
}) {
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const updateTooltipPosition = useCallback(
        (event?: Event) => {
            if (!containerRef.current || !tooltipRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const {left: containerLeft, top: containerTop, width: containerWidth} = rect;
            const {width: tooltipWidth, height: tooltipHeight} =
                tooltipRef.current.getBoundingClientRect();

            // width and height are skewed when the tooltip is initially hidden
            const FACTOR_BASED_ON_SCALE = !event ? INITIAL_SCALE : 1;

            const top =
                containerTop -
                tooltipHeight / FACTOR_BASED_ON_SCALE -
                spaceFromParent / FACTOR_BASED_ON_SCALE;
            const left =
                containerLeft +
                containerWidth / 2 -
                tooltipWidth / 2 / FACTOR_BASED_ON_SCALE;

            tooltipRef.current.style.top = `${top}px`;
            tooltipRef.current.style.left = `${left}px`;
        },
        [spaceFromParent],
    );

    useEffect(() => {
        window.addEventListener("resize", updateTooltipPosition);
        window.addEventListener("scroll", updateTooltipPosition);
        return () => {
            window.removeEventListener("resize", updateTooltipPosition);
            window.removeEventListener("scroll", updateTooltipPosition);
        };
    }, [updateTooltipPosition]);

    useEffect(() => {
        if (!isHovering) return;
        updateTooltipPosition();
    }, [isHovering, updateTooltipPosition]);

    return (
        <div
            className={className}
            onMouseOver={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            ref={containerRef}
        >
            {children}
            <AnimatePresence>
                {isHovering && (
                    <motion.div
                        initial={INITIAL_POSITION}
                        animate={ANIMATE_POSITION}
                        exit={INITIAL_POSITION}
                        transition={{duration}}
                        className="fixed z-10 py-2 px-3 bg-background-tertiary text-sm rounded-lg font-semibold pointer-events-none"
                        ref={tooltipRef}
                    >
                        {text}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
