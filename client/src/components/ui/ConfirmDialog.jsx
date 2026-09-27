import Button from "./Button";
import Modal from "./Modal";
import Spinner from "./Spinner";

export default function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    title,
    children,
    confirmLabel = "Confirm",
    busy = false,
}) {
    return (
        <Modal open={open} onClose={onClose} title={title} size="sm">
            <div className="text-sm leading-relaxed text-ink-300">{children}</div>
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button variant="ghost" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm} disabled={busy}>
                    {busy && <Spinner />}
                    {confirmLabel}
                </Button>
            </div>
        </Modal>
    );
}
