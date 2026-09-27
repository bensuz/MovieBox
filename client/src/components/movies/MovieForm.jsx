import { useRef, useState } from "react";
import { Link } from "react-router";
import { CheckIcon } from "@heroicons/react/20/solid";
import { GENRES } from "../../lib/tmdb";
import { yearOf } from "../../lib/format";
import Button, { buttonClasses } from "../ui/Button";
import Field, { FormAlert, TextField, inputClasses } from "../ui/Field";
import Spinner from "../ui/Spinner";
import MovieCard from "./MovieCard";

const GENRE_OPTIONS = Object.values(GENRES).sort();

const LANGUAGES = [
    "Arabic", "Chinese", "Danish", "Dutch", "English", "French", "German", "Greek",
    "Hindi", "Italian", "Japanese", "Korean", "Norwegian", "Polish", "Portuguese",
    "Russian", "Spanish", "Swedish", "Turkish", "Ukrainian",
];

const isHttpUrl = (value) => {
    try {
        return ["http:", "https:"].includes(new URL(value).protocol);
    } catch {
        return false;
    }
};

function validate(values, isDuplicate) {
    const errors = {};
    if (!values.title.trim()) errors.title = "Enter the movie's title.";
    else if (isDuplicate(values.title)) errors.title = `“${values.title.trim()}” is already in your list.`;
    if (values.rating !== "") {
        const rating = Number(values.rating);
        if (!(rating >= 0 && rating <= 10)) errors.rating = "Use a number from 0 to 10.";
    }
    if (values.poster && !isHttpUrl(values.poster)) {
        errors.poster = "Enter a full image address starting with https://";
    }
    return errors;
}

// Shared by "Add a movie" and "Edit details". Existing genres and languages
// that aren't in the standard lists are kept as options so editing never
// silently drops data.
export default function MovieForm({ initialValues, submitLabel, cancelTo, onSubmit, isDuplicate = () => false }) {
    const formRef = useRef(null);
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const genreOptions = [...new Set([...GENRE_OPTIONS, ...initialValues.genre])];
    const languages = [...new Set([...LANGUAGES, initialValues.language].filter(Boolean))].sort();

    const set = (name) => (event) => {
        setValues((v) => ({ ...v, [name]: event.target.value }));
        if (errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest);
    };

    const toggleGenre = (genre) =>
        setValues((v) => ({
            ...v,
            genre: v.genre.includes(genre) ? v.genre.filter((g) => g !== genre) : [...v.genre, genre],
        }));

    const submit = async (event) => {
        event.preventDefault();
        setFormError("");
        const found = validate(values, isDuplicate);
        setErrors(found);
        if (Object.keys(found).length > 0) {
            formRef.current.elements.namedItem(Object.keys(found)[0])?.focus();
            return;
        }
        setSubmitting(true);
        try {
            await onSubmit({
                title: values.title.trim(),
                genre: values.genre,
                releaseDate: values.releaseDate || null,
                rating: values.rating === "" ? null : Number(values.rating).toFixed(1),
                language: values.language || null,
                poster: values.poster.trim(),
                overview: values.overview.trim(),
            });
        } catch {
            setFormError("We couldn't save this movie. Please try again.");
            setSubmitting(false);
        }
    };

    const preview = {
        key: "preview",
        href: "#",
        title: values.title.trim() || "Untitled movie",
        year: yearOf(values.releaseDate),
        rating: values.rating,
        image: isHttpUrl(values.poster) ? { src: values.poster } : null,
    };

    return (
        <div className="grid gap-12 lg:grid-cols-[1fr_18rem]">
            <form ref={formRef} onSubmit={submit} noValidate className="space-y-6">
                <FormAlert>{formError}</FormAlert>

                <TextField
                    label="Title"
                    name="title"
                    value={values.title}
                    onChange={set("title")}
                    error={errors.title}
                    required
                />

                <fieldset>
                    <legend className="mb-3 text-sm font-medium text-ink-100">
                        Genres <span className="font-normal text-ink-400">(pick any)</span>
                    </legend>
                    <div className="flex flex-wrap gap-2">
                        {genreOptions.map((genre) => {
                            const checked = values.genre.includes(genre);
                            return (
                                <label
                                    key={genre}
                                    className="relative inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white/5 px-3.5 py-2 text-sm font-medium text-ink-200 ring-1 ring-inset ring-white/10 transition select-none hover:bg-white/10 has-checked:bg-brand-600 has-checked:text-white has-checked:ring-brand-500 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-400"
                                >
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={checked}
                                        onChange={() => toggleGenre(genre)}
                                    />
                                    {checked && <CheckIcon className="-ml-1 size-4" aria-hidden="true" />}
                                    {genre}
                                </label>
                            );
                        })}
                    </div>
                </fieldset>

                <div className="grid gap-6 sm:grid-cols-3">
                    <TextField
                        label="Release date"
                        name="releaseDate"
                        type="date"
                        value={values.releaseDate}
                        onChange={set("releaseDate")}
                        className="sm:col-span-1"
                    />
                    <TextField
                        label="Rating"
                        name="rating"
                        type="number"
                        inputMode="decimal"
                        min="0"
                        max="10"
                        step="0.1"
                        placeholder="0–10"
                        value={values.rating}
                        onChange={set("rating")}
                        error={errors.rating}
                    />
                    <Field label="Language">
                        {(aria) => (
                            <select
                                {...aria}
                                name="language"
                                value={values.language}
                                onChange={set("language")}
                                className={inputClasses}
                            >
                                <option value="">Select…</option>
                                {languages.map((language) => (
                                    <option key={language}>{language}</option>
                                ))}
                            </select>
                        )}
                    </Field>
                </div>

                <TextField
                    label="Poster image URL"
                    name="poster"
                    type="url"
                    inputMode="url"
                    placeholder="https://"
                    value={values.poster}
                    onChange={set("poster")}
                    error={errors.poster}
                    hint="Paste a link to a poster image. The preview updates as you type."
                />

                <Field label="Overview" hint={`${values.overview.length}/1000 characters`}>
                    {(aria) => (
                        <textarea
                            {...aria}
                            name="overview"
                            rows={5}
                            maxLength={1000}
                            value={values.overview}
                            onChange={set("overview")}
                            className={`${inputClasses} resize-y`}
                        />
                    )}
                </Field>

                <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
                    <Link to={cancelTo} className={buttonClasses({ variant: "ghost", size: "lg" })}>
                        Cancel
                    </Link>
                    <Button type="submit" size="lg" disabled={submitting}>
                        {submitting && <Spinner />}
                        {submitLabel}
                    </Button>
                </div>
            </form>

            <aside aria-label="Preview" className="order-first lg:order-none">
                <div className="lg:sticky lg:top-24">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-400">
                        Preview
                    </p>
                    {/* The preview is a visual aid only; its link goes nowhere. */}
                    <div className="mx-auto w-48 lg:w-full" inert>
                        <MovieCard item={preview} showToggle={false} sizes="288px" />
                    </div>
                </div>
            </aside>
        </div>
    );
}
