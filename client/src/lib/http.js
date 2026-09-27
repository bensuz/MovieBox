// Minimal fetch wrapper: JSON in/out, cookies included, readable errors.

const BASE_URL = (import.meta.env.VITE_SERVER_BASE_URL ?? "").replace(/\/$/, "");

export class HttpError extends Error {
    constructor(status, data) {
        super(
            data?.message ||
                data?.error ||
                `Request failed with status ${status}`
        );
        this.name = "HttpError";
        this.status = status;
        this.data = data;
    }
}

export async function request(path, { method = "GET", body, params, signal } = {}) {
    const url = new URL(BASE_URL + path, window.location.origin);
    for (const [key, value] of Object.entries(params ?? {})) {
        if (value != null) url.searchParams.set(key, value);
    }

    const isForm = body instanceof FormData;
    const response = await fetch(url, {
        method,
        signal,
        credentials: "include",
        headers:
            body != null && !isForm
                ? { "Content-Type": "application/json" }
                : undefined,
        body: body == null ? undefined : isForm ? body : JSON.stringify(body),
    });

    const text = await response.text();
    let data = null;
    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = text;
    }

    if (!response.ok) throw new HttpError(response.status, data);
    return data;
}
