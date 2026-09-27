import { Link } from "react-router";
import Seo from "../components/ui/Seo";
import { REPO_URL } from "../lib/site";

const linkClasses = "font-medium text-brand-400 underline-offset-4 hover:underline";

function LegalPage({ title, description, updated, children }) {
    return (
        <article className="shell max-w-3xl pt-10 sm:pt-14">
            <Seo title={title} description={description} />
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">Legal</p>
            <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
            <p className="mt-3 text-sm text-ink-400">Last updated {updated}</p>
            <div className="mt-10 space-y-8 leading-relaxed text-ink-300 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">
                {children}
            </div>
        </article>
    );
}

export function Privacy() {
    return (
        <LegalPage
            title="Privacy notice"
            description="What data MovieBox stores, why, and how to have it removed."
            updated="September 2026"
        >
            <p>
                MovieBox is a personal portfolio project. It collects only what it needs to run your
                account, and never sells or shares your data.
            </p>
            <section>
                <h2>What we store</h2>
                <ul>
                    <li>Your first name, last name, username and email address.</li>
                    <li>Your password, stored only as a salted hash that can&apos;t be reversed.</li>
                    <li>An optional profile photo, hosted on Cloudinary.</li>
                    <li>The movies you save and any details you add or edit.</li>
                </ul>
            </section>
            <section>
                <h2>Cookies</h2>
                <p>
                    A single, HTTP-only cookie keeps you signed in for up to a day. There are no
                    analytics, advertising or tracking cookies. Trailers load from YouTube&apos;s
                    privacy-enhanced domain, and only after you press play.
                </p>
            </section>
            <section>
                <h2>Third-party services</h2>
                <p>
                    Movie information and images come from{" "}
                    <a href="https://www.themoviedb.org/" className={linkClasses}>
                        The Movie Database (TMDB)
                    </a>
                    . Your requests to MovieBox are proxied, so TMDB never receives your account
                    details.
                </p>
            </section>
            <section>
                <h2>Removing your data</h2>
                <p>
                    To have your account and saved movies deleted, open an issue on the{" "}
                    <a href={REPO_URL} className={linkClasses}>
                        project&apos;s GitHub repository
                    </a>
                    .
                </p>
            </section>
        </LegalPage>
    );
}

export function Terms() {
    return (
        <LegalPage
            title="Terms of use"
            description="The ground rules for using MovieBox."
            updated="September 2026"
        >
            <p>
                MovieBox is a free, non-commercial demo built to showcase front-end development. By
                creating an account you agree to the following.
            </p>
            <section>
                <h2>Your account</h2>
                <ul>
                    <li>Keep your password private. You&apos;re responsible for activity on your account.</li>
                    <li>Don&apos;t upload images or text you don&apos;t have the right to share.</li>
                    <li>Accounts may be reset or removed as the project evolves.</li>
                </ul>
            </section>
            <section>
                <h2>Content</h2>
                <p>
                    Movie data and artwork belong to their respective owners and are provided by TMDB.
                    This product uses the TMDB API but is not endorsed or certified by TMDB.
                </p>
            </section>
            <section>
                <h2>No warranty</h2>
                <p>
                    The service is provided as-is, without guarantees of availability or accuracy.
                    See the <Link to="/privacy" className={linkClasses}>privacy notice</Link> for how
                    your data is handled.
                </p>
            </section>
        </LegalPage>
    );
}
