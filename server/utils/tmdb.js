const axios = require("axios");

// Catalog data changes slowly. A short in-memory cache makes repeat requests
// instant and keeps us far below TMDB's rate limits.
const CACHE_TTL_MS = 10 * 60 * 1000;
const CACHE_MAX_ENTRIES = 500;
const cache = new Map();

const requestTMDB = async (options) => {
    const key = JSON.stringify([options.url, options.params]);
    const hit = cache.get(key);
    if (hit && hit.expires > Date.now()) return hit.data;

    const { data } = await axios.request(options);
    cache.set(key, { data, expires: Date.now() + CACHE_TTL_MS });
    if (cache.size > CACHE_MAX_ENTRIES) cache.delete(cache.keys().next().value);
    return data;
};

const tmdbHeaders = () => ({
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
});

module.exports = { requestTMDB, tmdbHeaders };
