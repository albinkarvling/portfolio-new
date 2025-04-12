import {useCallback, useEffect, useState} from "react";

const screenOrder = ["sm", "md", "lg", "xl", "2xl"] as const;
export type ScreenSize = (typeof screenOrder)[number];

export function useScreenSize() {
    const [screenSize, setScreenSize] = useState<ScreenSize>("xl");

    useEffect(() => {
        const updateScreenSize = () => {
            if (window.innerWidth < 640) {
                setScreenSize("sm");
            } else if (window.innerWidth < 768) {
                setScreenSize("md");
            } else if (window.innerWidth < 1024) {
                setScreenSize("lg");
            } else if (window.innerWidth < 1280) {
                setScreenSize("xl");
            } else {
                setScreenSize("2xl");
            }
        };

        updateScreenSize();
        window.addEventListener("resize", updateScreenSize);
        return () => window.removeEventListener("resize", updateScreenSize);
    }, []);

    const down = useCallback(
        (size: ScreenSize) => {
            return screenOrder.indexOf(screenSize) <= screenOrder.indexOf(size);
        },
        [screenSize],
    );

    const up = useCallback(
        (size: ScreenSize) => {
            return screenOrder.indexOf(screenSize) >= screenOrder.indexOf(size);
        },
        [screenSize],
    );

    return {screenSize, up, down};
}
