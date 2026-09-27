import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../context/Auth";
import Seo from "../components/ui/Seo";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import { FormAlert, PasswordField, TextField } from "../components/ui/Field";
import AuthLayout from "../components/layout/AuthLayout";

const linkClasses = "font-semibold text-brand-400 underline-offset-4 hover:underline";

export default function Login() {
    const { user, loading, login } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname ?? "/";

    const [values, setValues] = useState({ userName: "", password: "" });
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    if (!loading && user) return <Navigate to={from} replace />;

    const onChange = (event) =>
        setValues((v) => ({ ...v, [event.target.name]: event.target.value }));

    const onSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            const signedIn = await login(values);
            toast.success(`Welcome back, ${signedIn.first_name || signedIn.user_name}!`);
        } catch (err) {
            setError(
                err.status === 400
                    ? "That username and password don't match. Please try again."
                    : "We couldn't sign you in right now. Please try again in a moment."
            );
            setSubmitting(false);
        }
    };

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in to pick up where you left off."
            footer={
                <>
                    New to MovieBox?{" "}
                    <Link to="/register" state={location.state} className={linkClasses}>
                        Create an account
                    </Link>
                </>
            }
        >
            <Seo title="Sign in" description="Sign in to MovieBox to see your saved movies." />
            <form onSubmit={onSubmit} className="space-y-5">
                <FormAlert>{error}</FormAlert>
                <TextField
                    label="Username"
                    name="userName"
                    value={values.userName}
                    onChange={onChange}
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    required
                />
                <PasswordField
                    label="Password"
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    autoComplete="current-password"
                    required
                />
                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                    {submitting && <Spinner />}
                    {submitting ? "Signing in…" : "Sign in"}
                </Button>
            </form>
        </AuthLayout>
    );
}
