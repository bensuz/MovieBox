import { request } from "./http";

// TMDB catalog, proxied by the Express server so API keys stay private.
export const moviesApi = {
    list: (category = "popular", page = 1) =>
        request("/api/publicmovies/public", { params: { category, page } }),

    search: (query) =>
        request(`/api/publicmovies/public/search/${encodeURIComponent(query)}`),

    details: (id) => request(`/api/publicmovies/public/${id}`),

    // Fallback for movies TMDB has no trailer for: YouTube search by title.
    trailer: async (id, { title, releaseYear }) => {
        const data = await request(`/api/publicmovies/public/${id}/trailer`, {
            method: "POST",
            body: { title, releaseYear },
        });
        return data?.items?.[0]?.id?.videoId ?? null;
    },
};

export const authApi = {
    currentUser: async () => {
        const data = await request("/api/auth/currentUser");
        return data?.user ?? null;
    },
    login: async (credentials) =>
        (await request("/api/auth/login", { method: "POST", body: credentials }))
            .user,
    register: async (details) =>
        (await request("/api/auth/register", { method: "POST", body: details }))
            .user,
    logout: () => request("/api/auth/logout", { method: "POST", body: {} }),
    uploadAvatar: async (file) => {
        const body = new FormData();
        body.append("avatar", file);
        const data = await request("/api/auth/upload-avatar", {
            method: "POST",
            body,
        });
        return data.user.avatar;
    },
    deleteAvatar: () => request("/api/auth/delete-avatar", { method: "DELETE" }),
};

// The signed-in user's saved movies (PostgreSQL).
export const listApi = {
    all: (userId) => request(`/api/usermovies/${userId}`),
    get: (id) => request(`/api/usermovies/details/${id}`),
    create: (movie) => request("/api/usermovies", { method: "POST", body: movie }),
    update: (id, movie) =>
        request(`/api/usermovies/details/${id}`, { method: "PUT", body: movie }),
    remove: (id) => request(`/api/usermovies/details/${id}`, { method: "DELETE" }),
};
