import {useRef} from "react";
import {TechStack} from "@/assets";
import {useAnimateIntoView} from "@/hooks";

const DELAYS = [700, 350, 0, 350, 700];

export function TechStackItem({
    tech,
    index,
    parentRef,
}: {
    tech: TechStack;
    index: number;
    parentRef: React.RefObject<HTMLDivElement | null>;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    const {initialState} = useAnimateIntoView(containerRef, {
        initialState: {transform: "translateY(100%)", opacity: 0},
        delay: DELAYS[index],
        siblingRef: parentRef,
    });

    return (
        <div
            ref={containerRef}
            className="text-center h-full"
            style={initialState}
            key={tech.title}
        >
            <span className="text-4xl font-semibold">{tech.title}</span>
            <div className="xl:pb-20 mt-4 h-full bg-background-secondary rounded-2xl xl:rounded-b-none border-[1px] border-background-tertiary text-text-secondary">
                <span className="block p-4">{tech.description}</span>
                <ul className="p-4 border-t-[1px] border-t-background-tertiary">
                    {tech.addons.map((addon) => (
                        <li key={addon}>{addon}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
