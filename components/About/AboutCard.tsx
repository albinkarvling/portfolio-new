import Image from "next/image";
import {AboutPanel} from "./About";
import {useRef} from "react";
import useAnimateIntoView from "@/hooks/useAnimateIntoView";

export function AboutCard({
    card,
    delay,
    siblingRef,
}: {
    card: AboutPanel["cards"][number];
    delay: number;
    siblingRef: React.RefObject<HTMLElement | null>;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const {initialState} = useAnimateIntoView(ref, {delay, siblingRef});

    return (
        <div
            className="relative flex flex-col p-4 font-medium text-sm bg-background-secondary hover:bg-background-tertiary transition-colors rounded-md"
            style={initialState}
            ref={ref}
        >
            <div className="flex gap-3 relative">
                <Image
                    width={44}
                    height={44}
                    src={card.icon}
                    className="rounded-md min-w-11 h-11 aspect-square"
                    alt=""
                />
                <div className="flex-1 flex flex-col gap-0.5">
                    <div className="flex justify-between items-center">
                        <span className="text-base">{card.title}</span>
                        <span className="text-xs text-text-secondary">{card.date}</span>
                    </div>
                    <span className="text-xs text-text-secondary">{card.subTitle}</span>
                </div>
            </div>
            <ul className="pl-4 mt-4 pt-2 border-t-[1px] border-t-background-tertiary list-disc">
                {card.description.map((description) => (
                    <li
                        className="first-of-type:mt-0 mt-2 text-text-secondary"
                        key={description}
                    >
                        {description}
                    </li>
                ))}
            </ul>
            <a
                rel="noreferrer"
                target="_blank"
                className="absolute inset-0"
                href={card.site}
                aria-label={`Visit ${card.site}`}
            />
        </div>
    );
}
