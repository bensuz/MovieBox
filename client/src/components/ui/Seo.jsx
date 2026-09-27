import { useLocation } from "react-router";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, SITE_URL } from "../../lib/site";

// React 19 hoists these tags into <head> and removes them on unmount.
// `path` overrides the canonical URL when query params select distinct content.
export default function Seo({ title, description = DEFAULT_DESCRIPTION, noindex = false, path }) {
    const { pathname } = useLocation();
    const fullTitle = title ? `${title} · ${SITE_NAME}` : DEFAULT_TITLE;

    return (
        <>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={`${SITE_URL}${path ?? pathname}`} />
            {noindex && <meta name="robots" content="noindex" />}
        </>
    );
}
