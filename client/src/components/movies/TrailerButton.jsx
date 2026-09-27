import { useState } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner";
import { moviesApi } from "../../lib/api";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Spinner from "../ui/Spinner";

// Click-to-load trailer. No YouTube code or cookies are loaded until the
// visitor asks for the video, which keeps the details page fast.
export default function TrailerButton({ lookupId, title, year, trailerKey = null }) {
    const [videoKey, setVideoKey] = useState(trailerKey);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const openTrailer = async () => {
        if (videoKey) return setOpen(true);
        setLoading(true);
        try {
            const found = await moviesApi.trailer(lookupId, { title, releaseYear: year });
            if (found) {
                setVideoKey(found);
                setOpen(true);
            } else {
                toast("No trailer available yet", { description: title });
            }
        } catch {
            toast.error("Couldn't load the trailer. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button variant="secondary" size="lg" onClick={openTrailer} disabled={loading}>
                {loading ? <Spinner /> : <PlayIcon aria-hidden="true" />}
                Watch trailer
            </Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                title={`${title} trailer`}
                hideTitle
                size="video"
            >
                <div className="aspect-video bg-black">
                    <iframe
                        src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&rel=0`}
                        title={`${title} trailer`}
                        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                        allowFullScreen
                        className="size-full"
                    />
                </div>
            </Modal>
        </>
    );
}
