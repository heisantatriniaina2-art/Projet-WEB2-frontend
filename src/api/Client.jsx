const API_BASE_URL = "http://localhost:8080"; // Adapte l'URL selon ton backend si besoin

export async function apiFetch(endpoint, options = {}) {
    const { token, headers = {}, body, ...customOptions } = options;

    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    const config = {
        ...customOptions,
        headers: {
            "Content-Type": "application/json",
            ...authHeaders,
            ...headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur HTTP : ${response.status}`);
    }

    // Si la réponse est vide (204 No Content par exemple)
    const text = await response.text();
    return text ? JSON.parse(text) : null;
}