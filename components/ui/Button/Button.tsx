import React from "react";
import {twMerge} from "tailwind-merge";

export type ButtonProps = {
    children: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
    disabled?: boolean;
    style?: React.CSSProperties;
    color?: "primary" | "secondary" | "tertiary" | "quaternary";
    type?: "button" | "submit";
};

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    (
        {
            children,
            icon,
            onClick,
            href,
            className,
            disabled,
            style,
            color = "secondary",
            type = "button",
        },
        ref,
    ) => {
        const mergedProps = {
            className: twMerge(
                "px-4 py-3 flex items-center gap-2 rounded-lg transition-colors text-sm",
                color === "primary" &&
                    "bg-background-primary hover:bg-background-primary/80",
                color === "secondary" &&
                    "bg-background-secondary hover:bg-background-secondary/80",
                color === "tertiary" &&
                    "bg-background-tertiary hover:bg-background-tertiary/80",
                color === "quaternary" &&
                    "bg-background-quaternary hover:bg-background-quaternary/80",
                className,
            ),
            onClick,
            disabled,
            style,
        };

        if (href) {
            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    {...mergedProps}
                >
                    {children}
                    {icon}
                </a>
            );
        }

        return (
            <button
                type={type}
                ref={ref as React.Ref<HTMLButtonElement>}
                {...mergedProps}
            >
                {children}
                {icon}
            </button>
        );
    },
);

Button.displayName = "Button";

export {Button};
