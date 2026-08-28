const API_URL = "http://localhost:3000/api";

export async function apiFetch(endpoint, options = {}) {
    const {
        method = "GET",
        token,
        body,
    } = options;

    const headers = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(
            data?.message || "An error occurred."
        );
    }

    return data;
}