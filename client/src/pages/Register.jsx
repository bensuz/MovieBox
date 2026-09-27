import { useRef, useState } from "react";
import { Link, Navigate, useLocation } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../context/Auth";
import Seo from "../components/ui/Seo";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import { FormAlert, PasswordField, TextField } from "../components/ui/Field";
import AuthLayout from "../components/layout/AuthLayout";

const linkClasses = "font-semibold text-brand-400 underline-offset-4 hover:underline";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
    const errors = {};
    if (!values.firstName.trim()) errors.firstName = "Enter your first name.";
    if (!values.lastName.trim()) errors.lastName = "Enter your last name.";
    if (!values.userName.trim()) errors.userName = "Choose a username.";
    else if (/\s/.test(values.userName)) errors.userName = "Usernames can't contain spaces.";
    if (!EMAIL.test(values.email)) errors.email = "Enter a valid email, like name@example.com.";
    if (values.password.length < 8) errors.password = "Use at least 8 characters.";
    if (values.confirmPassword !== values.password) errors.confirmPassword = "Passwords don't match.";
    if (!values.terms) errors.terms = "Please accept the terms to continue.";
    return errors;
}

export default function Register() {
    const { user, loading, register } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname ?? "/";
    const formRef = useRef(null);

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
    });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    if (!loading && user) return <Navigate to={from} replace />;

    const onChange = (event) => {
        const { name, type, checked, value } = event.target;
        setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
        // Clear a field's error as soon as the user starts fixing it.
        if (errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setServerError("");
        const found = validate(values);
        setErrors(found);
        if (Object.keys(found).length > 0) {
            // Move focus to the first problem so keyboard and screen reader
            // users land on it.
            const first = Object.keys(found)[0];
            formRef.current.elements.namedItem(first)?.focus();
            return;
        }

        setSubmitting(true);
        try {
            const created = await register(values);
            toast.success(`Welcome to MovieBox, ${created.first_name}!`, {
                description: "Tap the heart on any movie to start your list.",
            });
        } catch (err) {
            setServerError(
                err.status === 400
                    ? `${err.message}. Try signing in, or choose a different username and email.`
                    : "We couldn't create your account right now. Please try again in a moment."
            );
            setSubmitting(false);
        }
    };

    return (
        <AuthLayout
            title="Create your account"
            subtitle="It's free and takes less than a minute."
            footer={
                <>
                    Already have an account?{" "}
                    <Link to="/login" state={location.state} className={linkClasses}>
                        Sign in
                    </Link>
                </>
            }
        >
            <Seo
                title="Create account"
                description="Create a free MovieBox account to save movies, watch trailers and build your personal watchlist."
            />
            <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
                <FormAlert>{serverError}</FormAlert>
                <div className="grid gap-5 sm:grid-cols-2">
                    <TextField
                        label="First name"
                        name="firstName"
                        value={values.firstName}
                        onChange={onChange}
                        error={errors.firstName}
                        autoComplete="given-name"
                        required
                    />
                    <TextField
                        label="Last name"
                        name="lastName"
                        value={values.lastName}
                        onChange={onChange}
                        error={errors.lastName}
                        autoComplete="family-name"
                        required
                    />
                </div>
                <TextField
                    label="Username"
                    name="userName"
                    value={values.userName}
                    onChange={onChange}
                    error={errors.userName}
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={onChange}
                    error={errors.email}
                    autoComplete="email"
                    required
                />
                <PasswordField
                    label="Password"
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    error={errors.password}
                    hint="At least 8 characters."
                    autoComplete="new-password"
                    required
                />
                <PasswordField
                    label="Confirm password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={onChange}
                    error={errors.confirmPassword}
                    autoComplete="new-password"
                    required
                />

                <div>
                    <div className="flex items-start gap-3">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            checked={values.terms}
                            onChange={onChange}
                            aria-invalid={errors.terms ? true : undefined}
                            aria-describedby={errors.terms ? "terms-error" : undefined}
                            className="mt-0.5 size-5 shrink-0 rounded accent-brand-600"
                        />
                        <label htmlFor="terms" className="text-sm leading-relaxed text-ink-300">
                            I agree to the{" "}
                            <Link to="/terms" target="_blank" className={linkClasses}>
                                Terms of use
                                <span className="sr-only"> (opens in a new tab)</span>
                            </Link>{" "}
                            and{" "}
                            <Link to="/privacy" target="_blank" className={linkClasses}>
                                Privacy notice
                                <span className="sr-only"> (opens in a new tab)</span>
                            </Link>
                            .
                        </label>
                    </div>
                    {errors.terms && (
                        <p id="terms-error" className="mt-2 text-sm font-medium text-red-300">
                            {errors.terms}
                        </p>
                    )}
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                    {submitting && <Spinner />}
                    {submitting ? "Creating account…" : "Create account"}
                </Button>
            </form>
        </AuthLayout>
    );
}
