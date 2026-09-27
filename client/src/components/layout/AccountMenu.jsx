import { useRef } from "react";
import { Link, useNavigate } from "react-router";
import {
    ArrowRightStartOnRectangleIcon,
    HeartIcon,
    PlusCircleIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { useAuth } from "../../context/Auth";
import Avatar from "../ui/Avatar";

const itemClasses =
    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-200 transition hover:bg-white/10 hover:text-ink-50 [&_svg]:size-5 [&_svg]:text-ink-400";

// A disclosure built on the native Popover API: light dismiss, Escape and
// top-layer rendering are handled by the browser.
export default function AccountMenu({ user }) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const popover = useRef(null);
    const close = () => popover.current?.hidePopover();

    const signOut = async () => {
        close();
        try {
            await logout();
            toast("You're signed out", { description: "See you next time." });
            navigate("/");
        } catch {
            toast.error("Couldn't sign you out. Please try again.");
        }
    };

    return (
        <>
            <button
                type="button"
                popoverTarget="account-menu"
                aria-label="Account menu"
                className="rounded-full ring-2 ring-transparent transition hover:ring-white/30"
            >
                <Avatar user={user} />
            </button>

            <div
                id="account-menu"
                ref={popover}
                popover="auto"
                className="menu-popover w-64 rounded-2xl bg-ink-900/95 p-2 text-ink-200 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl"
            >
                <div className="flex items-center gap-3 px-3 py-3">
                    <Avatar user={user} size="md" />
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink-50">
                            {user.first_name} {user.last_name}
                        </p>
                        <p className="truncate text-xs text-ink-400">@{user.user_name}</p>
                    </div>
                </div>
                <hr className="my-1 border-white/10" />
                <ul>
                    <li>
                        <Link to="/profile" onClick={close} className={itemClasses}>
                            <UserCircleIcon aria-hidden="true" /> Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/mylist" onClick={close} className={itemClasses}>
                            <HeartIcon aria-hidden="true" /> My List
                        </Link>
                    </li>
                    <li>
                        <Link to="/movies/new" onClick={close} className={itemClasses}>
                            <PlusCircleIcon aria-hidden="true" /> Add a movie
                        </Link>
                    </li>
                </ul>
                <hr className="my-1 border-white/10" />
                <button type="button" onClick={signOut} className={itemClasses}>
                    <ArrowRightStartOnRectangleIcon aria-hidden="true" /> Sign out
                </button>
            </div>
        </>
    );
}
