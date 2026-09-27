import { profileImage } from "../../lib/tmdb";

export default function CastGrid({ cast }) {
    return (
        <section aria-labelledby="cast-heading" className="shell mt-14">
            <h2 id="cast-heading" className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Top cast
            </h2>
            <ul className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4 md:grid-cols-6">
                {cast.map((person) => {
                    const photo = profileImage(person.profile_path);
                    return (
                        <li key={person.credit_id} className="text-center">
                            <div className="mx-auto size-20 overflow-hidden rounded-full bg-ink-800 ring-1 ring-white/10 sm:size-24">
                                {photo ? (
                                    <img
                                        src={photo.src}
                                        alt=""
                                        width="185"
                                        height="278"
                                        loading="lazy"
                                        decoding="async"
                                        className="size-full object-cover object-top"
                                    />
                                ) : (
                                    <span
                                        aria-hidden="true"
                                        className="grid size-full place-items-center font-display text-xl font-bold text-ink-400"
                                    >
                                        {person.name
                                            .split(" ")
                                            .map((part) => part[0])
                                            .slice(0, 2)
                                            .join("")}
                                    </span>
                                )}
                            </div>
                            <p className="mt-3 line-clamp-1 text-sm font-semibold text-ink-100">
                                {person.name}
                            </p>
                            {person.character && (
                                <p className="line-clamp-1 text-xs text-ink-400">{person.character}</p>
                            )}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
