import { Link } from "react-router";

const base =
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition duration-200 ease-out disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-5 [&_svg]:shrink-0";

const variants = {
    primary:
        "bg-brand-600 text-white shadow-lg shadow-brand-900/30 hover:bg-brand-700 active:scale-[0.98]",
    light: "bg-ink-50 text-ink-950 hover:bg-white active:scale-[0.98]",
    secondary:
        "bg-white/10 text-ink-50 ring-1 ring-inset ring-white/15 backdrop-blur-md hover:bg-white/15 active:scale-[0.98]",
    ghost: "text-ink-200 hover:bg-white/10 hover:text-ink-50",
    danger: "bg-red-700 text-white hover:bg-red-800 active:scale-[0.98]",
};

const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base",
};

// eslint-disable-next-line react-refresh/only-export-components
export const buttonClasses = ({ variant = "primary", size = "md", className = "" } = {}) =>
    `${base} ${variants[variant]} ${sizes[size]} ${className}`;

export default function Button({ variant, size, className, type = "button", ...props }) {
    return (
        <button
            type={type}
            className={buttonClasses({ variant, size, className })}
            {...props}
        />
    );
}

export function ButtonLink({ variant, size, className, ...props }) {
    return <Link className={buttonClasses({ variant, size, className })} {...props} />;
}

export function IconButton({ label, size = "md", className = "", children, ...props }) {
    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            className={`inline-grid ${size === "lg" ? "size-12" : "size-10"} shrink-0 place-items-center rounded-full text-ink-200 transition hover:bg-white/10 hover:text-ink-50 disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-5 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
