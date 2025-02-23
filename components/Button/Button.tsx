import {twMerge} from "tailwind-merge";

export function Button({
    children,
    icon,
    onClick,
    className,
    disabled,
}: {
    children: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}) {
    return (
        <button
            className={twMerge(
                "px-4 py-3 bg-button hover:bg-button/80 rounded-lg transition-colors",
                className,
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
            {icon}
        </button>
    );
}
