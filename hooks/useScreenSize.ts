import {useEffect, useState} from "react";

export type ScreenSize = "sm" | "md" | "lg" | "xl" | "2xl";

export function useScreenSize(): ScreenSize {
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

    return screenSize;
}
