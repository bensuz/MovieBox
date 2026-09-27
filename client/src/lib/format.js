const pad = (n) => String(n).padStart(2, "0");

// Normalises dates from TMDB ("2023-07-19") and PostgreSQL (serialised as an
// ISO timestamp) to a plain "YYYY-MM-DD" string without timezone drift.
export function toDateOnly(value) {
    if (!value) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    if (/^\d{4}-\d{2}-\d{2}T00:00:00(\.000)?Z$/.test(value)) {
        return value.slice(0, 10);
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function formatDate(value, options = { dateStyle: "long" }) {
    const iso = toDateOnly(value);
    if (!iso) return "";
    const [y, m, d] = iso.split("-").map(Number);
    return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(
        new Date(Date.UTC(y, m - 1, d))
    );
}

export const yearOf = (value) => toDateOnly(value).slice(0, 4);

export function formatRuntime(minutes) {
    if (!minutes) return "";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h ? `${h}h ${pad(m)}m` : `${m}m`;
}

// Ratings arrive as numbers (TMDB) or numeric strings (PostgreSQL).
export function formatRating(value) {
    const n = Number(value);
    return Number.isFinite(n) && n > 0 ? n.toFixed(1) : null;
}

const languageNames = new Intl.DisplayNames(["en"], { type: "language" });

export function languageName(code) {
    if (!code) return "";
    try {
        return languageNames.of(code);
    } catch {
        return code;
    }
}

const compact = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
});
export const formatCount = (n) => compact.format(n);

const usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
});
export const formatMoney = (n) => (n > 0 ? usd.format(n) : "");

// Genres are stored as a PostgreSQL array literal ('{"Action","Drama"}'),
// but may also arrive as a real array or a comma separated string.
export function parseGenres(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value.filter(Boolean);
    return String(value)
        .replace(/^\{|\}$/g, "")
        .split(",")
        .map((g) => g.trim().replace(/^"|"$/g, ""))
        .filter(Boolean);
}

export const truncate = (text = "", max = 160) =>
    text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
