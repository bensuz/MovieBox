import { useId } from "react";

// Clapperboard + play mark. Mirrors public/favicon.svg.
export function LogoMark({ className = "size-8" }) {
    const id = useId();
    return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
            <defs>
                <linearGradient id={`${id}g`} x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF6B7A" />
                    <stop offset="1" stopColor="#D11F37" />
                </linearGradient>
                <clipPath id={`${id}c`}>
                    <rect width="32" height="32" rx="9" />
                </clipPath>
            </defs>
            <rect width="32" height="32" rx="9" fill={`url(#${id}g)`} />
            <g clipPath={`url(#${id}c)`}>
                <rect width="32" height="10" fill="#08080C" fillOpacity=".28" />
                <path
                    d="M2 0h4.5l4 10H6zM12.5 0H17l4 10h-4.5zM23 0h4.5l4 10H27z"
                    fill="#fff"
                    fillOpacity=".92"
                />
            </g>
            <path
                d="M13.5 16.2v9.6c0 .8.9 1.3 1.6.9l7.7-4.8c.6-.4.6-1.3 0-1.7l-7.7-4.8c-.7-.4-1.6.1-1.6.9Z"
                fill="#fff"
            />
        </svg>
    );
}

export default function Logo({ className = "" }) {
    return (
        <span className={`inline-flex items-center gap-2.5 ${className}`}>
            <LogoMark />
            <span className="font-display text-xl font-extrabold tracking-tight text-ink-50">
                Movie<span className="text-brand-500">Box</span>
            </span>
        </span>
    );
}
