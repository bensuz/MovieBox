export default function Spinner({ className = "size-5", label }) {
    return (
        <>
            <svg
                className={`animate-spin ${className}`}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
            >
                <circle
                    cx="12"
                    cy="12"
                    r="9.5"
                    stroke="currentColor"
                    strokeOpacity="0.25"
                    strokeWidth="3"
                />
                <path
                    d="M21.5 12a9.5 9.5 0 0 0-9.5-9.5"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </svg>
            {label && <span className="sr-only">{label}</span>}
        </>
    );
}

export function PageLoader({ label = "Loading page" }) {
    return (
        <div className="grid min-h-[60dvh] place-items-center text-brand-500" role="status">
            <Spinner className="size-10" label={label} />
        </div>
    );
}
