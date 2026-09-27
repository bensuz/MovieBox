import { useOptimistic, useTransition } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../../context/Auth";
import { payloadFromRow, useMyList } from "../../context/MyList";

// Add/remove a movie from My List with an optimistic UI and an Undo toast.
export function useListToggle({ title, getPayload }) {
    const { user } = useAuth();
    const list = useMyList();
    const navigate = useNavigate();
    const location = useLocation();
    const saved = list.findByTitle(title);

    const [pending, startTransition] = useTransition();
    const [inList, setOptimisticInList] = useOptimistic(Boolean(saved));

    const toggle = () => {
        if (!user) {
            toast("Sign in to start your list", {
                description: "Save movies and find them again on any device.",
            });
            navigate("/login", { state: { from: location } });
            return;
        }

        startTransition(async () => {
            setOptimisticInList(!saved);
            try {
                if (saved) {
                    await list.removeMovie(saved.id);
                    toast("Removed from My List", {
                        description: title,
                        action: {
                            label: "Undo",
                            onClick: () =>
                                list.addMovie(payloadFromRow(saved)).catch(() =>
                                    toast.error("Couldn't restore that movie.")
                                ),
                        },
                    });
                } else {
                    await list.addMovie(getPayload());
                    toast.success("Added to My List", {
                        description: title,
                        action: { label: "View list", onClick: () => navigate("/mylist") },
                    });
                }
            } catch {
                toast.error("Something went wrong. Please try again.");
            }
        });
    };

    return { inList, pending, toggle, disabled: Boolean(user) && list.status === "loading" };
}
