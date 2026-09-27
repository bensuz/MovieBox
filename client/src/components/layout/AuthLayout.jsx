import { CheckIcon } from "@heroicons/react/24/outline";
import { useMovieList } from "../../hooks/useMovieList";
import { imageUrl } from "../../lib/tmdb";

const FEATURES = [
    "Save movies to your list in one tap",
    "Watch trailers and browse the full cast",
    "Add and edit movies that aren't in the catalog",
];

export default function AuthLayout({ title, subtitle, children, footer }) {
    const { movies } = useMovieList("popular");
    const posters = movies.filter((m) => m.poster_path).slice(0, 12);

    return (
        <div className="shell grid gap-12 py-10 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-2 lg:items-center lg:py-12">
            <div className="relative hidden h-[42rem] overflow-hidden rounded-3xl bg-ink-900 ring-1 ring-white/10 lg:block">
                <ul
                    aria-hidden="true"
                    className="absolute -inset-x-16 -top-24 grid rotate-[-8deg] grid-cols-4 gap-3 opacity-70"
                >
                    {posters.map((movie) => (
                        <li key={movie.id} className="aspect-2/3 overflow-hidden rounded-xl bg-ink-800">
                            <img
                                src={imageUrl(movie.poster_path, "w185")}
                                alt=""
                                width="185"
                                height="278"
                                loading="lazy"
                                decoding="async"
                                className="size-full object-cover"
                            />
                        </li>
                    ))}
                </ul>
                <div className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/70 to-ink-950/10" />
                <div className="absolute inset-x-0 bottom-0 p-10 xl:p-12">
                    <p className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white xl:text-5xl">
                        Every movie you love,
                        <br />
                        <span className="text-brand-400">all in one place.</span>
                    </p>
                    <ul className="mt-8 space-y-3">
                        {FEATURES.map((feature) => (
                            <li key={feature} className="flex items-center gap-3 text-sm text-ink-200">
                                <span className="grid size-6 place-items-center rounded-full bg-brand-500/15 text-brand-400">
                                    <CheckIcon className="size-4" aria-hidden="true" />
                                </span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mx-auto w-full max-w-md animate-fade-up">
                <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
                <p className="mt-2 text-ink-400">{subtitle}</p>
                <div className="mt-8">{children}</div>
                {footer && <p className="mt-8 text-center text-sm text-ink-400">{footer}</p>}
            </div>
        </div>
    );
}
