import Image from "next/image";
import {useRef} from "react";
import {AboutSection} from "@/assets";
import {useAnimateIntoView, useDirectionalHover} from "@/hooks";

export function AboutCard({
    card,
    delay,
    siblingRef,
}: {
    card: AboutSection["cards"][number];
    delay: number;
    siblingRef: React.RefObject<HTMLElement | null>;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const {initialState} = useAnimateIntoView(ref, {delay, siblingRef});
    const {handleMouseEnter, handleMouseLeave, refCallback} = useDirectionalHover();

    return (
        <div
            className="relative h-full flex flex-col p-4 font-medium text-sm bg-background-secondary rounded-md overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={initialState}
            ref={ref}
        >
            {/* hover effect */}
            <div className="absolute inset-0 bg-background-tertiary" ref={refCallback} />

            <div className="flex gap-3 relative">
                <Image
                    width={44}
                    height={44}
                    src={card.image}
                    className="rounded-md min-w-11 h-11 aspect-square"
                    alt=""
                />
                <div className="flex-1 flex flex-col gap-0.5">
                    <div className="flex justify-between items-center flex-wrap-reverse">
                        <span className="text-base">{card.title}</span>
                        <span className="text-xs text-text-secondary">{card.date}</span>
                    </div>
                    <span className="text-xs text-text-secondary">{card.subTitle}</span>
                </div>
            </div>
            <ul className="relative pl-4 mt-4 pt-2 border-t-[1px] border-t-background-tertiary list-disc">
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
