import { defineStore } from 'pinia';
import type User from "../objects/User.ts";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.user,
        userId: (state) => state.user?.id ?? null,
    },

    actions: {
        login(user: User) {
            this.user = user;
        },
        logout() {
            this.user = null;
        },
    },
});
