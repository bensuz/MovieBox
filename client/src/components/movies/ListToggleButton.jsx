import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Button from "../ui/Button";
import { useListToggle } from "./useListToggle";

// Compact heart toggle shown on posters.
export function ListToggleIcon({ item }) {
    const { inList, disabled, toggle } = useListToggle(item);
    const Icon = inList ? HeartSolidIcon : HeartIcon;

    return (
        <button
            type="button"
            onClick={toggle}
            disabled={disabled}
            aria-pressed={inList}
            aria-label={`Save ${item.title} to My List`}
            title={inList ? "In My List" : "Add to My List"}
            className="grid size-9 place-items-center rounded-full bg-ink-950/70 text-ink-50 ring-1 ring-white/15 backdrop-blur-md transition hover:scale-110 hover:bg-ink-950/90 disabled:opacity-50 aria-pressed:bg-brand-600 aria-pressed:ring-brand-400"
        >
            <Icon className="size-[1.125rem]" aria-hidden="true" />
        </button>
    );
}

// Full-size button used in the hero and on the details page.
export default function ListToggleButton({ item, size = "lg" }) {
    const { inList, disabled, toggle } = useListToggle(item);

    return (
        <Button
            variant={inList ? "secondary" : "primary"}
            size={size}
            onClick={toggle}
            disabled={disabled}
        >
            {inList ? (
                <>
                    <HeartSolidIcon className="text-brand-400" aria-hidden="true" />
                    In My List
                </>
            ) : (
                <>
                    <HeartIcon aria-hidden="true" />
                    Add to My List
                </>
            )}
        </Button>
    );
}
