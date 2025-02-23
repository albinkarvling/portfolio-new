import {twMerge} from "tailwind-merge";

export function Button({
    children,
    icon,
    onClick,
    className,
    disabled,
    href,
}: {
    children: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
    disabled?: boolean;
}) {
    const props = {
        className: twMerge(
            "px-4 py-3 bg-button hover:bg-button/80 rounded-lg transition-colors",
            className,
        ),
        onClick,
        disabled,
    };

    if (href) {
        return (
            <a href={href} target="_blank" rel="noreferrer" {...props}>
                {children}
                {icon}
            </a>
        );
    }

    return (
        <button {...props}>
            {children}
            {icon}
        </button>
    );
}
