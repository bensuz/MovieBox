import { ShareIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { IconButton } from "../ui/Button";

export default function ShareButton({ title }) {
    const share = async () => {
        const url = window.location.href;
        try {
            if (navigator.share) {
                await navigator.share({ title, url });
            } else {
                await navigator.clipboard.writeText(url);
                toast.success("Link copied to clipboard");
            }
        } catch (error) {
            if (error.name !== "AbortError") toast.error("Couldn't share this page.");
        }
    };

    return (
        <IconButton
            label={`Share ${title}`}
            onClick={share}
            size="lg"
            className="bg-white/10 ring-1 ring-inset ring-white/15 backdrop-blur-md"
        >
            <ShareIcon aria-hidden="true" />
        </IconButton>
    );
}
