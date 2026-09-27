import { NavLink } from "react-router";
import {
    ArrowRightEndOnRectangleIcon,
    HeartIcon,
    HomeIcon,
    MagnifyingGlassIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
    HeartIcon as HeartSolidIcon,
    HomeIcon as HomeSolidIcon,
    MagnifyingGlassIcon as MagnifyingGlassSolidIcon,
    UserCircleIcon as UserCircleSolidIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "../../context/Auth";

function Tab({ to, end, label, icon: Icon, activeIcon: ActiveIcon }) {
    return (
        <li>
            <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                    `flex h-16 flex-col items-center justify-center gap-1 text-xs font-medium transition ${
                        isActive ? "text-ink-50" : "text-ink-400 hover:text-ink-200"
                    }`
                }
            >
                {({ isActive }) => (
                    <>
                        {isActive ? (
                            <ActiveIcon className="size-6 text-brand-500" aria-hidden="true" />
                        ) : (
                            <Icon className="size-6" aria-hidden="true" />
                        )}
                        {label}
                    </>
                )}
            </NavLink>
        </li>
    );
}

// App-style tab bar for phones, where the header has no room for navigation.
export default function MobileNav() {
    const { user } = useAuth();

    return (
        <nav
            aria-label="Main"
            className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-950/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
        >
            <ul className="grid grid-cols-4">
                <Tab to="/" end label="Home" icon={HomeIcon} activeIcon={HomeSolidIcon} />
                <Tab
                    to="/search"
                    label="Search"
                    icon={MagnifyingGlassIcon}
                    activeIcon={MagnifyingGlassSolidIcon}
                />
                <Tab to="/mylist" label="My List" icon={HeartIcon} activeIcon={HeartSolidIcon} />
                {user ? (
                    <Tab
                        to="/profile"
                        label="Profile"
                        icon={UserCircleIcon}
                        activeIcon={UserCircleSolidIcon}
                    />
                ) : (
                    <Tab
                        to="/login"
                        label="Sign in"
                        icon={ArrowRightEndOnRectangleIcon}
                        activeIcon={ArrowRightEndOnRectangleIcon}
                    />
                )}
            </ul>
        </nav>
    );
}
