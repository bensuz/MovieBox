const sizes = {
    sm: "size-9 text-sm",
    md: "size-11 text-base",
    xl: "size-28 text-4xl sm:size-32",
};

// Ask Cloudinary for a small, face-cropped, modern-format thumbnail.
function thumbnail(url) {
    if (!url?.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
    return url.replace("/upload/", "/upload/c_fill,g_face,w_256,h_256,f_auto,q_auto/");
}

function initials(user) {
    const letters = `${user?.first_name?.[0] ?? ""}${user?.last_name?.[0] ?? ""}`;
    return (letters || user?.user_name?.[0] || "?").toUpperCase();
}

export default function Avatar({ user, size = "sm", alt = "", className = "" }) {
    const classes = `${sizes[size]} shrink-0 rounded-full ${className}`;

    if (user?.avatar) {
        return (
            <img
                src={thumbnail(user.avatar)}
                alt={alt}
                width="256"
                height="256"
                className={`${classes} bg-ink-800 object-cover`}
            />
        );
    }

    // Initials are drawn with CSS generated content rather than a text node,
    // so a button wrapping the avatar keeps a clean accessible name ("Account
    // menu") that doesn't conflict with visible text (WCAG 2.5.3).
    return (
        <span
            role={alt ? "img" : undefined}
            aria-label={alt || undefined}
            aria-hidden={alt ? undefined : true}
            data-initials={initials(user)}
            className={`${classes} grid place-items-center bg-linear-to-br from-brand-400 to-brand-800 font-display font-bold text-white before:content-[attr(data-initials)]`}
        />
    );
}
