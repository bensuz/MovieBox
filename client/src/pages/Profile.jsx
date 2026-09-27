import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRightStartOnRectangleIcon, CameraIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { useAuth } from "../context/Auth";
import { useMyList } from "../context/MyList";
import { formatRating, parseGenres } from "../lib/format";
import Seo from "../components/ui/Seo";
import Avatar from "../components/ui/Avatar";
import Button, { ButtonLink } from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";

const MAX_AVATAR_BYTES = 5 * 1024 * 1024;

function Stat({ label, value, className = "" }) {
    return (
        <div className={`rounded-2xl bg-ink-900 px-5 py-4 ring-1 ring-white/10 ${className}`}>
            <dt className="text-xs font-medium uppercase tracking-wider text-ink-400">{label}</dt>
            <dd className="mt-1 truncate font-display text-2xl font-bold text-ink-50">{value}</dd>
        </div>
    );
}

export default function Profile() {
    const { user, uploadAvatar, deleteAvatar, logout } = useAuth();
    const { movies, status } = useMyList();
    const navigate = useNavigate();
    const fileInput = useRef(null);
    const [busy, setBusy] = useState(null); // "upload" | "delete" | null

    const stats = useMemo(() => {
        const ratings = movies.map((m) => Number(m.rating)).filter((r) => r > 0);
        const counts = new Map();
        for (const m of movies) {
            for (const g of parseGenres(m.genre)) counts.set(g, (counts.get(g) ?? 0) + 1);
        }
        const [topGenre] = [...counts].sort((a, b) => b[1] - a[1])[0] ?? [];
        return {
            saved: movies.length,
            average: ratings.length
                ? formatRating(ratings.reduce((a, b) => a + b, 0) / ratings.length)
                : "–",
            topGenre: topGenre ?? "–",
        };
    }, [movies]);

    const onFileChange = async (event) => {
        const file = event.target.files[0];
        event.target.value = "";
        if (!file) return;
        if (file.size > MAX_AVATAR_BYTES) {
            toast.error("That image is too large", { description: "Choose a photo under 5 MB." });
            return;
        }
        setBusy("upload");
        try {
            await uploadAvatar(file);
            toast.success("Profile photo updated");
        } catch {
            toast.error("Upload failed. Please try a JPG, PNG or GIF.");
        } finally {
            setBusy(null);
        }
    };

    const onDelete = async () => {
        setBusy("delete");
        try {
            await deleteAvatar();
            toast("Profile photo removed");
        } catch {
            toast.error("Couldn't remove your photo. Please try again.");
        } finally {
            setBusy(null);
        }
    };

    const onSignOut = async () => {
        try {
            await logout();
            navigate("/");
        } catch {
            toast.error("Couldn't sign you out. Please try again.");
        }
    };

    const details = [
        ["First name", user.first_name],
        ["Last name", user.last_name],
        ["Username", `@${user.user_name}`],
        ["Email", user.email],
    ];

    return (
        <div className="shell max-w-5xl pt-10 sm:pt-14">
            <Seo title="Your profile" noindex />

            <section className="relative overflow-hidden rounded-3xl bg-ink-900 p-6 ring-1 ring-white/10 sm:p-10">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-32 bg-linear-to-r from-brand-700/40 via-brand-500/20 to-transparent"
                />
                <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:text-left">
                    <div className="relative">
                        <Avatar
                            user={user}
                            size="xl"
                            alt={user.avatar ? "Your profile photo" : ""}
                            className="ring-4 ring-ink-900"
                        />
                        {busy === "upload" && (
                            <span className="absolute inset-0 grid place-items-center rounded-full bg-ink-950/70 text-white">
                                <Spinner className="size-8" label="Uploading photo" />
                            </span>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                            {user.first_name} {user.last_name}
                        </h1>
                        <p className="mt-1 text-ink-400">@{user.user_name}</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        <input
                            ref={fileInput}
                            type="file"
                            accept="image/jpeg,image/png,image/gif"
                            onChange={onFileChange}
                            hidden
                        />
                        <Button
                            variant="secondary"
                            onClick={() => fileInput.current.click()}
                            disabled={busy !== null}
                        >
                            <CameraIcon aria-hidden="true" />
                            {user.avatar ? "Change photo" : "Upload photo"}
                        </Button>
                        {user.avatar && (
                            <Button variant="ghost" onClick={onDelete} disabled={busy !== null}>
                                {busy === "delete" ? <Spinner /> : <TrashIcon aria-hidden="true" />}
                                Remove
                            </Button>
                        )}
                    </div>
                </div>
            </section>

            <section aria-labelledby="stats-heading" className="mt-10">
                <div className="flex items-end justify-between gap-4">
                    <h2 id="stats-heading" className="font-display text-2xl font-bold tracking-tight">
                        Your list at a glance
                    </h2>
                    <ButtonLink to="/mylist" variant="ghost" size="sm">
                        Open My List
                    </ButtonLink>
                </div>
                <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                    <Stat label="Movies saved" value={status === "loading" ? "…" : stats.saved} />
                    <Stat label="Average rating" value={status === "loading" ? "…" : stats.average} />
                    <Stat
                        label="Top genre"
                        value={status === "loading" ? "…" : stats.topGenre}
                        className="col-span-2 sm:col-span-1"
                    />
                </dl>
            </section>

            <section aria-labelledby="account-heading" className="mt-10">
                <h2 id="account-heading" className="font-display text-2xl font-bold tracking-tight">
                    Account details
                </h2>
                <dl className="mt-5 divide-y divide-white/5 overflow-hidden rounded-2xl bg-ink-900 ring-1 ring-white/10">
                    {details.map(([label, value]) => (
                        <div key={label} className="grid gap-1 px-5 py-4 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-ink-400">{label}</dt>
                            <dd className="break-words text-sm text-ink-100 sm:col-span-2">{value}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            <div className="mt-10 flex justify-end">
                <Button variant="secondary" onClick={onSignOut}>
                    <ArrowRightStartOnRectangleIcon aria-hidden="true" />
                    Sign out
                </Button>
            </div>
        </div>
    );
}
