import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchApi } from "@/lib/api";

type UserProfile = {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    address?: string;
};

interface AuthState {
    user: UserProfile | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (credentials: any) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => void;
    fetchProfile: () => Promise<void>;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            clearError: () => set({ error: null }),

            login: async (credentials) => {
                try {
                    set({ isLoading: true, error: null });
                    const data = await fetchApi("/auth/login/", {
                        method: "POST",
                        body: JSON.stringify({
                            username: credentials.email, // using email as username on backend usually, or mapped differently
                            password: credentials.password
                        }),
                    });

                    localStorage.setItem("accessToken", data.access);
                    localStorage.setItem("refreshToken", data.refresh);

                    set({ isAuthenticated: true });
                    await get().fetchProfile();

                } catch (error: any) {
                    set({ error: error.message || "Failed to login", isAuthenticated: false });
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            register: async (credentials) => {
                try {
                    set({ isLoading: true, error: null });

                    // Using email as username as fallback if not provided
                    const payload = {
                        username: credentials.email,
                        email: credentials.email,
                        password: credentials.password
                    };

                    await fetchApi("/auth/register/", {
                        method: "POST",
                        body: JSON.stringify(payload),
                    });

                    // Automatically login after successful registration
                    await get().login(credentials);

                } catch (error: any) {
                    // Handle DJango DRF validation errors mapped to arrays
                    let errorMsg = error.message;
                    set({ error: errorMsg || "Registration failed", isLoading: false });
                    throw error;
                }
            },

            logout: () => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                set({ user: null, isAuthenticated: false, error: null });
            },

            fetchProfile: async () => {
                try {
                    const userProfile = await fetchApi("/users/me/", {
                        method: "GET",
                        requireAuth: true,
                    });
                    set({ user: userProfile });
                } catch (error) {
                    get().logout();
                }
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
        }
    )
);
