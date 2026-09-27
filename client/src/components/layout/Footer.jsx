import { Link } from "react-router";
import { useAuth } from "../../context/Auth";
import { MOVIE_LISTS } from "../../lib/tmdb";
import { AUTHOR_URL, REPO_URL } from "../../lib/site";
import Logo from "../ui/Logo";

const linkClasses = "inline-block py-1 text-sm text-ink-400 transition hover:text-ink-50";

function FooterNav({ id, title, links }) {
    return (
        <nav aria-labelledby={id}>
            <h2 id={id} className="text-sm font-semibold text-ink-100">
                {title}
            </h2>
            <ul className="mt-4 space-y-2">
                {links.map((link) => (
                    <li key={link.to}>
                        <Link to={link.to} className={linkClasses}>
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default function Footer() {
    const { user } = useAuth();

    const explore = MOVIE_LISTS.map((list) => ({
        to: list.id === "popular" ? "/" : `/?list=${list.id}`,
        label: `${list.label} movies`,
    }));

    const account = user
        ? [
              { to: "/mylist", label: "My List" },
              { to: "/movies/new", label: "Add a movie" },
              { to: "/profile", label: "Profile" },
          ]
        : [
              { to: "/login", label: "Sign in" },
              { to: "/register", label: "Create account" },
          ];

    const legal = [
        { to: "/privacy", label: "Privacy" },
        { to: "/terms", label: "Terms of use" },
    ];

    return (
        <footer className="mt-24 border-t border-white/5 bg-ink-950 pb-16 md:pb-0">
            <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
                <div>
                    <Link to="/" aria-label="MovieBox home" className="inline-block rounded-lg">
                        <Logo />
                    </Link>
                    <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
                        Find what to watch next and keep every movie you love in one place.
                    </p>
                </div>
                <FooterNav id="footer-explore" title="Explore" links={explore} />
                <FooterNav id="footer-account" title="Account" links={account} />
                <FooterNav id="footer-legal" title="Legal" links={legal} />
            </div>
            <div className="shell flex flex-col gap-3 border-t border-white/5 py-8 text-xs leading-relaxed text-ink-400 lg:flex-row lg:justify-between">
                <p>
                    © {new Date().getFullYear()} MovieBox · Designed and built by{" "}
                    <a href={AUTHOR_URL} className="font-medium text-ink-200 underline-offset-4 hover:underline">
                        bensuz
                    </a>{" "}
                    ·{" "}
                    <a href={REPO_URL} className="font-medium text-ink-200 underline-offset-4 hover:underline">
                        Source on GitHub
                    </a>
                </p>
                <p>
                    Movie data and images from{" "}
                    <a
                        href="https://www.themoviedb.org/"
                        className="font-medium text-ink-200 underline-offset-4 hover:underline"
                    >
                        TMDB
                    </a>
                    . This product uses the TMDB API but is not endorsed or certified by TMDB.
                </p>
            </div>
        </footer>
    );
}
