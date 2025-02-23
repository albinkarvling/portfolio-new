import {Project} from "@/assets/projects";
import {Close} from "@mui/icons-material";
import {AnimatePresence, motion} from "framer-motion";
import Image from "next/image";
import {useRef, useState} from "react";
import {RevealElement} from "../RevealElement/RevealElement";
import {useScreenSize} from "@/hooks/useScreenSize";

const ANIMATION_DURATION = 700;
export function ProjectPreview({
    project,
    isVisible,
}: {
    project: Project;
    isVisible: boolean;
}) {
    const screenSize = useScreenSize();
    const [previewVisbile, setPreviewVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const initailDimensions = useRef({left: 0, top: 0, width: 0, height: 0});

    const isSmallScreen = ["sm", "xs"].includes(screenSize);

    const showPreview = () => {
        if (!containerRef.current || !contentRef.current) return;

        document.body.style.overflow = "hidden";

        const container = containerRef.current;
        const content = contentRef.current;

        const {x, y, width, height} = content.getBoundingClientRect();
        initailDimensions.current = {top: y, left: x, width, height};

        content.style.position = "fixed";
        content.style.top = `${y}px`;
        content.style.left = `${x}px`;
        content.style.width = `${width}px`;
        content.style.height = `${height}px`;

        setTimeout(() => {
            content.style.zIndex = "1000";
            content.style.transition = `all ${ANIMATION_DURATION}ms ease-in-out`;
            content.style.top = `50%`;
            content.style.left = `50%`;
            content.style.transform = `translate(-50%, -50%)`;
            content.style.width = isSmallScreen ? "100vw" : "80vw";
            content.style.height = isSmallScreen ? "100vh" : "80vh";
            container.style.width = `${width}px`;
            container.style.height = `${height}px`;
        });

        setPreviewVisible(true);
    };

    const closePreview = () => {
        if (!containerRef.current || !contentRef.current) return;

        const container = containerRef.current;
        const content = contentRef.current;

        const {top, left, width, height} = initailDimensions.current;
        content.style.position = "fixed";
        content.style.top = `${top}px`;
        content.style.left = `${left}px`;
        content.style.width = `${width}px`;
        content.style.height = `${height}px`;
        content.style.transform = `translate(0, 0)`;

        setTimeout(() => {
            content.style.transition = "none";
            content.style.zIndex = "";
            content.style.position = "relative";
            content.style.top = `0`;
            content.style.left = `0`;
            content.style.transform = ``;
            content.style.width = ``;
            content.style.height = ``;
            container.style.width = ``;
            container.style.height = ``;
            document.body.style.overflow = "";
        }, ANIMATION_DURATION);

        setPreviewVisible(false);
    };

    return (
        <RevealElement className="w-full md:w-[472px] aspect-video" isVisible={isVisible}>
            <div ref={containerRef}>
                <AnimatePresence>
                    {previewVisbile && (
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            className="fixed inset-0 w-full h-full bg-black/80"
                            onClick={closePreview}
                        />
                    )}
                </AnimatePresence>
                <div
                    className="flex transition-[top,left,transform,width,height]"
                    ref={contentRef}
                >
                    <AnimatePresence>
                        {!previewVisbile && (
                            <motion.button
                                initial={{opacity: 1}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                className="w-full h-full"
                                onClick={showPreview}
                            >
                                <Image
                                    className="w-full h-full object-cover"
                                    src={project.image}
                                    width={472}
                                    height={264}
                                    alt=""
                                />
                            </motion.button>
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {previewVisbile && (
                            <motion.iframe
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                className="absolute inset-0 w-full h-full"
                                src={project.links[2].url}
                            />
                        )}
                    </AnimatePresence>
                    {previewVisbile && (
                        <div className="absolute top-4 right-4">
                            <button
                                data-tooltip-hidden={isSmallScreen}
                                data-tooltip="Close preview"
                                className="p-2 bg-background-secondary hover:bg-background-secondary/80 transition-colors shadow-md rounded-md"
                                onClick={closePreview}
                                aria-label="Close preview"
                            >
                                <Close />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </RevealElement>
    );
}
