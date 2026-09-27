import { useEffect, useId, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IconButton } from "./Button";

const widths = {
    sm: "max-w-md",
    md: "max-w-lg",
    video: "max-w-5xl",
};

// Built on the native <dialog>: focus trapping, Escape to close, an inert
// background and focus restoration all come from the browser.
export default function Modal({ open, onClose, title, hideTitle = false, size = "md", children }) {
    const ref = useRef(null);
    const titleId = useId();

    useEffect(() => {
        const dialog = ref.current;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);

    return (
        // Clicking the backdrop closes the dialog; keyboard users have Escape.
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <dialog
            ref={ref}
            aria-labelledby={titleId}
            onClose={onClose}
            onClick={(event) => event.target === ref.current && onClose()}
            className={`m-auto w-[calc(100%-2rem)] ${widths[size]} overflow-hidden rounded-2xl bg-ink-900 p-0 text-ink-200 shadow-2xl ring-1 ring-white/10`}
        >
            {open && (
                <div className={size === "video" ? "" : "p-6 sm:p-7"}>
                    <div
                        className={`flex items-start justify-between gap-4 ${size === "video" ? "absolute inset-x-0 top-0 z-10 p-2" : "mb-3"}`}
                    >
                        <h2
                            id={titleId}
                            className={hideTitle ? "sr-only" : "font-display text-xl font-bold"}
                        >
                            {title}
                        </h2>
                        <IconButton
                            label="Close"
                            onClick={onClose}
                            className={size === "video" ? "ml-auto bg-ink-950/70 backdrop-blur" : "-mr-2 -mt-2"}
                        >
                            <XMarkIcon aria-hidden="true" />
                        </IconButton>
                    </div>
                    {children}
                </div>
            )}
        </dialog>
    );
}
