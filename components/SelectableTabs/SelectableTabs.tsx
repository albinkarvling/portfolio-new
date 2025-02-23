import {createRef, useCallback, useEffect, useRef} from "react";
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
    const containerRef = useRef<HTMLUListElement>(null);
    const selectedIndicatorRef = useRef<HTMLSpanElement>(null);
    const tabRefs = tabs.map(() => createRef<HTMLLIElement>());

    const getActiveTabIndex = useCallback(
        () => tabs.findIndex((tab) => tab.id === selectedTab) || 0,
        [tabs, selectedTab],
    );

    // Update selected indicator position and width
    const updateSelectedIndicator = useCallback(() => {
        const activeTabIndex = getActiveTabIndex();

        const selectedTabRef = tabRefs[activeTabIndex];
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
            <ul
                role="tablist"
                className="flex gap-5 border-b-[1px] border-b-background-secondary"
                ref={containerRef}
            >
                {tabs.map((tab, index) => (
                    <li ref={tabRefs[index]} key={tab.id}>
                        <button
                            role="tab"
                            aria-controls={tab.ariaControls}
                            onClick={() => handleSelect(tab.id)}
                            className={twMerge(
                                "pb-3 text-lg text-text-secondary hover:text-text-primary transition-colors",
                                tab.id === selectedTab && "text-text-primary",
                            )}
                        >
                            {tab.text}
                        </button>
                    </li>
                ))}
            </ul>
            <span
                className="absolute h-[1px] bottom-0 bg-text-primary transition-[left,width] duration-300 ease-in-out"
                ref={selectedIndicatorRef}
            />
        </div>
    );
}
