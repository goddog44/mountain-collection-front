export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

type FetchOptions = RequestInit & {
    requireAuth?: boolean;
};

export async function fetchApi(endpoint: string, options: FetchOptions = {}) {
    const { requireAuth = false, ...fetchOptions } = options;

    const headers = new Headers(fetchOptions.headers || {});
    headers.set("Content-Type", "application/json");

    // Attempt to attach token if required or available
    if (requireAuth) {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }
    }

    const url = `${API_BASE_URL}${endpoint}`;

    let response = await fetch(url, {
        ...fetchOptions,
        headers,
    });

    // Basic interceptor for 401 Unauthorized - Token refresh logic
    if (response.status === 401 && requireAuth) {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
            const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (refreshRes.ok) {
                const data = await refreshRes.json();
                localStorage.setItem("accessToken", data.access);
                // Retry original request
                headers.set("Authorization", `Bearer ${data.access}`);
                response = await fetch(url, { ...fetchOptions, headers });
            } else {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                // Force logout if refresh also fails
            }
        }
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.detail || data?.message || "An error occurred");
    }

    return data;
}
