import {useRef} from "react";
import {AboutSection} from "@/assets";
import {useAnimateIntoView} from "@/hooks";
import {StyledCorner} from "./StyledCorner";

export function AboutBulletPoint({
    bulletPoint,
    siblingRef,
    delay,
}: {
    bulletPoint: AboutSection["bulletPoints"][number];
    siblingRef: React.RefObject<HTMLElement | null>;
    delay: number;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const {initialState} = useAnimateIntoView(ref, {delay, siblingRef});

    return (
        <div
            style={initialState}
            className="[--rounded:0.375rem] relative flex-1 py-5 px-6 font-medium bg-background-secondary rounded-[--rounded] overflow-hidden"
            ref={ref}
        >
            <span className="relative z-10">{bulletPoint}</span>

            <StyledCorner position="top-left" />
            <StyledCorner position="bottom-right" />
        </div>
    );
}
