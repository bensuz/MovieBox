import { StarIcon } from "@heroicons/react/20/solid";
import { formatRating } from "../../lib/format";

export default function Rating({ value, className = "" }) {
    const rating = formatRating(value);
    if (!rating) return null;

    return (
        <span className={`inline-flex items-center gap-1 tabular-nums ${className}`}>
            <StarIcon className="size-[1.1em] text-gold-400" aria-hidden="true" />
            <span className="sr-only">Rated </span>
            {rating}
            <span className="sr-only"> out of 10</span>
        </span>
    );
}
