import { Link } from "react-router";
import Poster from "./Poster";
import Rating from "../ui/Rating";
import { ListToggleIcon } from "./ListToggleButton";

export const GRID_SIZES =
    "(min-width: 1280px) 14vw, (min-width: 1024px) 18vw, (min-width: 768px) 23vw, (min-width: 640px) 31vw, 47vw";

export default function MovieCard({ item, sizes = GRID_SIZES, showToggle = true, priority }) {
    return (
        <article className="group relative">
            <Link to={item.href} className="relative block rounded-xl">
                <div className="aspect-2/3 overflow-hidden rounded-xl bg-ink-800 shadow-poster ring-1 ring-white/10 transition duration-300 ease-out group-hover:-translate-y-1 group-hover:ring-white/25">
                    <Poster
                        image={item.image}
                        title={item.title}
                        sizes={sizes}
                        priority={priority}
                        className="transition duration-500 ease-out group-hover:scale-105"
                    />
                </div>
                <div className="mt-3 px-0.5">
                    <p className="line-clamp-2 text-sm font-semibold leading-snug text-ink-100 transition group-hover:text-white">
                        {item.title}
                    </p>
                    {item.year && <p className="mt-1 text-xs text-ink-400">{item.year}</p>}
                </div>
                {/* Positioned over the poster, but after the title in reading order. */}
                <Rating
                    value={item.rating}
                    className="absolute left-2 top-2 rounded-full bg-ink-950/80 px-2 py-1 text-xs font-semibold text-ink-50 ring-1 ring-white/10 backdrop-blur-md transition duration-300 group-hover:-translate-y-1"
                />
            </Link>
            {showToggle && (
                <div className="absolute right-2 top-2 transition duration-300 group-hover:-translate-y-1">
                    <ListToggleIcon item={item} />
                </div>
            )}
        </article>
    );
}
