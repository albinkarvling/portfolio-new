import {createRef, RefObject, useCallback, useEffect, useRef} from "react";
import {twMerge} from "tailwind-merge";

export type SelectableTab<T> = {
    text: string;
    id: T;
    ariaControls: string;
};

type Props<T> = {
    selectedTab: T;
    tabs: SelectableTab<T>[];
    onSelect: (id: T) => void;
    className?: string;
};

export function SelectableTabs<T extends string>({
    tabs,
    selectedTab,
    onSelect,
    className,
}: Props<T>) {
    const containerRef = useRef<HTMLDivElement>(null);
    const selectedIndicatorRef = useRef<HTMLSpanElement>(null);
    const tabRefs = useRef<RefObject<HTMLButtonElement | null>[]>(
        tabs.map(() => createRef()),
    );

    const getActiveTabIndex = useCallback(() => {
        const index = tabs.findIndex((tab) => tab.id === selectedTab);
        return index === -1 ? 0 : index;
    }, [tabs, selectedTab]);

    // Update selected indicator position and width
    const updateSelectedIndicator = useCallback(() => {
        const activeTabIndex = getActiveTabIndex();

        const selectedTabRef = tabRefs.current[activeTabIndex];
        if (!selectedTabRef?.current) return;

        const {left, width} = selectedTabRef.current.getBoundingClientRect();
        const {left: containerLeft} = containerRef.current!.getBoundingClientRect();

        selectedIndicatorRef.current!.style.left = `${left - containerLeft}px`;
        selectedIndicatorRef.current!.style.width = `${width}px`;
    }, [tabRefs, getActiveTabIndex]);

    useEffect(() => {
        window.addEventListener("resize", updateSelectedIndicator);
        return () => window.removeEventListener("resize", updateSelectedIndicator);
    }, [updateSelectedIndicator]);

    useEffect(updateSelectedIndicator, [selectedTab, updateSelectedIndicator]);

    const handleSelect = (id: T) => {
        if (selectedTab === id) return;
        onSelect(id);
    };

    return (
        <div className={twMerge("relative", className)}>
            <div
                role="tablist"
                className={twMerge(
                    "relative flex gap-5",
                    "after:absolute after:w-full after:bottom-0 after:h-[1px] after:bg-background-secondary after:left-0 after:transition-[width] after:duration-1000 after:delay-500",
                )}
                ref={containerRef}
            >
                {tabs.map((tab, index) => (
                    <button
                        onClick={() => handleSelect(tab.id)}
                        className={twMerge(
                            "pb-3 text-lg text-text-secondary hover:text-text-primary transition-colors",
                            tab.id === selectedTab && "text-text-primary",
                        )}
                        role="tab"
                        aria-selected={tab.id === selectedTab}
                        aria-controls={tab.ariaControls}
                        ref={tabRefs.current[index]}
                        key={tab.id}
                    >
                        {tab.text}
                    </button>
                ))}
            </div>
            <span
                className="absolute h-[1px] bottom-0 bg-text-primary transition-[left,width] duration-300 ease-in-out"
                ref={selectedIndicatorRef}
            />
        </div>
    );
}
