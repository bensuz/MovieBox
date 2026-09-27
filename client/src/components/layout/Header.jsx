import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/Auth";
import Logo from "../ui/Logo";
import { buttonClasses } from "../ui/Button";
import AccountMenu from "./AccountMenu";

const navLinkClasses = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
        isActive ? "bg-white/10 text-ink-50" : "text-ink-300 hover:text-ink-50"
    }`;

// Pages whose artwork runs underneath a transparent header.
const hasHero = (pathname) => pathname === "/" || /^\/movies\/(discover\/)?\d+$/.test(pathname);

function useScrolled(threshold = 8) {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > threshold);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [threshold]);
    return scrolled;
}

function HeaderSearch() {
    const navigate = useNavigate();
    const inputRef = useRef(null);

    // "/" focuses search from anywhere, like GitHub or YouTube.
    useEffect(() => {
        const onKeyDown = (event) => {
            const target = event.target;
            const typing =
                target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
            if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey) {
                event.preventDefault();
                inputRef.current?.focus();
            }
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        const query = new FormData(event.currentTarget).get("q").trim();
        if (!query) return;
        navigate(`/search/${encodeURIComponent(query)}`);
        event.currentTarget.reset();
        inputRef.current.blur();
    };

    return (
        <form role="search" onSubmit={onSubmit} className="relative hidden md:block">
            <label htmlFor="header-search" className="sr-only">
                Search movies
            </label>
            <MagnifyingGlassIcon
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-400"
                aria-hidden="true"
            />
            <input
                ref={inputRef}
                id="header-search"
                name="q"
                type="search"
                placeholder="Search movies"
                autoComplete="off"
                enterKeyHint="search"
                className="h-10 w-56 rounded-full border-0 bg-white/10 pl-10 pr-9 text-sm text-ink-50 ring-1 ring-inset ring-white/10 transition-[width,background-color] duration-300 placeholder:text-ink-400 hover:bg-white/15 focus:w-72 focus:bg-ink-900 lg:w-64 lg:focus:w-80"
            />
            <kbd
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-white/15 px-1.5 font-sans text-[0.75rem] text-ink-400 lg:block"
            >
                /
            </kbd>
        </form>
    );
}

export default function Header() {
    const { user, loading, likelySignedIn } = useAuth();
    const { pathname } = useLocation();
    const scrolled = useScrolled();
    const solid = scrolled || !hasHero(pathname);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
                solid
                    ? "border-white/5 bg-ink-950/85 backdrop-blur-xl"
                    : "border-transparent bg-linear-to-b from-ink-950/80 to-transparent bg-origin-border"
            }`}
        >
            <div className="shell flex h-16 items-center gap-6 lg:gap-10">
                <Link to="/" aria-label="MovieBox home" className="rounded-lg">
                    <Logo />
                </Link>

                <nav aria-label="Primary" className="hidden md:block">
                    <ul className="flex items-center gap-1">
                        <li>
                            <NavLink to="/" end className={navLinkClasses}>
                                Browse
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/mylist" className={navLinkClasses}>
                                My List
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div className="ml-auto flex items-center gap-3">
                    {!pathname.startsWith("/search") && <HeaderSearch />}
                    {loading && likelySignedIn ? (
                        <span className="size-9 animate-pulse rounded-full bg-white/10" aria-hidden="true" />
                    ) : user ? (
                        <AccountMenu user={user} />
                    ) : (
                        <>
                            <Link
                                to="/login"
                                state={{ from: { pathname } }}
                                className={buttonClasses({ variant: "ghost", size: "sm" })}
                            >
                                Sign in
                            </Link>
                            <Link
                                to="/register"
                                className={buttonClasses({ size: "sm", className: "max-sm:hidden" })}
                            >
                                Create account
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
