import { useId, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export const inputClasses =
    "block w-full rounded-xl border-0 bg-ink-850 px-4 py-3 text-base text-ink-50 ring-1 ring-inset ring-white/10 transition placeholder:text-ink-400 hover:ring-white/20 focus:bg-ink-800 aria-invalid:ring-2 aria-invalid:ring-red-400 sm:text-sm";

// Label, hint and error wiring for any control. The child is a render
// function that receives the id and aria attributes to spread on the control.
export default function Field({ label, hint, error, className = "", children }) {
    const id = useId();
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;

    return (
        <div className={className}>
            <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink-100">
                {label}
            </label>
            {children({
                id,
                "aria-invalid": error ? true : undefined,
                "aria-describedby": [hintId, errorId].filter(Boolean).join(" ") || undefined,
            })}
            {hint && (
                <p id={hintId} className="mt-2 text-xs text-ink-400">
                    {hint}
                </p>
            )}
            {error && (
                <p id={errorId} className="mt-2 text-sm font-medium text-red-300">
                    {error}
                </p>
            )}
        </div>
    );
}

export function TextField({ label, hint, error, className, ...inputProps }) {
    return (
        <Field label={label} hint={hint} error={error} className={className}>
            {(aria) => <input className={inputClasses} {...aria} {...inputProps} />}
        </Field>
    );
}

export function PasswordField({ label, hint, error, className, ...inputProps }) {
    const [visible, setVisible] = useState(false);
    return (
        <Field label={label} hint={hint} error={error} className={className}>
            {(aria) => (
                <div className="relative">
                    <input
                        type={visible ? "text" : "password"}
                        className={`${inputClasses} pr-12`}
                        {...aria}
                        {...inputProps}
                    />
                    <button
                        type="button"
                        onClick={() => setVisible((v) => !v)}
                        aria-label="Show password"
                        aria-pressed={visible}
                        className="absolute inset-y-0 right-1 my-auto grid size-10 place-items-center rounded-lg text-ink-400 transition hover:text-ink-100"
                    >
                        {visible ? (
                            <EyeSlashIcon className="size-5" aria-hidden="true" />
                        ) : (
                            <EyeIcon className="size-5" aria-hidden="true" />
                        )}
                    </button>
                </div>
            )}
        </Field>
    );
}

export function FormAlert({ children }) {
    if (!children) return null;
    return (
        <div
            role="alert"
            className="rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200 ring-1 ring-inset ring-red-500/30"
        >
            {children}
        </div>
    );
}
