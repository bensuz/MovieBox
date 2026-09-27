const { requestTMDB, tmdbHeaders } = require("./tmdb");

const IMAGE_BASE = "https://image.tmdb.org/t/p";
const BACKDROP_WIDTHS = [300, 780, 1280];

// Builds a <link rel="preload"> for the homepage hero image so the browser
// downloads it together with the HTML instead of after the JS has run.
// Must mirror pickFeatured() in client/src/pages/Home.jsx and backdropImage()
// in client/src/lib/tmdb.js, or the preload goes unused.
const featuredPreload = async () => {
    const data = await requestTMDB({
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/popular",
        params: { page: 1 },
        headers: tmdbHeaders(),
    });
    const candidates = data.results.slice(0, 5).filter((m) => m.backdrop_path);
    if (candidates.length === 0) return "";

    const day = Math.floor(Date.now() / 86_400_000);
    const { backdrop_path: path } = candidates[day % candidates.length];
    const srcset = BACKDROP_WIDTHS.map((w) => `${IMAGE_BASE}/w${w}${path} ${w}w`).join(", ");
    return `<link rel="preload" as="image" href="${IMAGE_BASE}/w1280${path}" imagesrcset="${srcset}" imagesizes="100vw" fetchpriority="high">`;
};

// Never hold up the page for the hint: give up after a short wait.
const featuredPreloadTag = () =>
    Promise.race([
        featuredPreload(),
        new Promise((resolve) => setTimeout(() => resolve(""), 300)),
    ]).catch(() => "");

module.exports = { featuredPreloadTag };
