import {twMerge} from "tailwind-merge";

export function Input({
    label,
    textArea,
    placeholder,
    value,
    onChange,
    type = "text",
}: {
    label: string;
    placeholder: string;
    value?: string;
    onChange: (text: string) => void;
    type?: React.HTMLInputTypeAttribute;
    textArea?: boolean;
}) {
    const id = label.toLowerCase();

    const className =
        "w-full p-4 border border-border rounded-lg bg-background-tertiary border-none";
    return (
        <>
            <label className="sr-only" htmlFor={id}>
                {label}
            </label>
            {textArea ? (
                <textarea
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={twMerge("min-h-28", className)}
                />
            ) : (
                <input
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={className}
                    type={type}
                />
            )}
        </>
    );
}
