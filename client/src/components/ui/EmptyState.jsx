export default function EmptyState({ icon: Icon, title, children, actions, as: Heading = "h2" }) {
    return (
        <div className="mx-auto flex max-w-md flex-col items-center py-16 text-center sm:py-24">
            {Icon && (
                <div className="grid size-16 place-items-center rounded-2xl bg-white/5 text-brand-400 ring-1 ring-white/10">
                    <Icon className="size-8" aria-hidden="true" />
                </div>
            )}
            <Heading className="mt-6 font-display text-2xl font-bold">{title}</Heading>
            {children && <div className="mt-3 text-pretty text-ink-400">{children}</div>}
            {actions && (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    {actions}
                </div>
            )}
        </div>
    );
}
