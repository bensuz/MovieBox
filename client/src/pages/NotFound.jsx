import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Seo from "../components/ui/Seo";
import { ButtonLink } from "../components/ui/Button";

export default function NotFound() {
    return (
        <div className="shell grid min-h-[70dvh] place-items-center py-16 text-center">
            <Seo title="Page not found" noindex />
            <div className="animate-fade-up">
                <p className="bg-linear-to-b from-brand-400 to-brand-700 bg-clip-text font-display text-8xl font-extrabold tracking-tighter text-transparent sm:text-9xl">
                    404
                </p>
                <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                    This page left the theater
                </h1>
                <p className="mx-auto mt-3 max-w-md text-ink-400">
                    The link may be broken, or the page may have moved. Let&apos;s get you back to the
                    movies.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <ButtonLink to="/">
                        <HomeIcon aria-hidden="true" />
                        Back to home
                    </ButtonLink>
                    <ButtonLink to="/search" variant="secondary">
                        <MagnifyingGlassIcon aria-hidden="true" />
                        Search movies
                    </ButtonLink>
                </div>
            </div>
        </div>
    );
}
