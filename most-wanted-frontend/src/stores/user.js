import { defineStore } from 'pinia'

export const useUserStore = defineStore('user',{
    state: () => ({
        token: localStorage.getItem('user_token') || null, // Persist token in localStorage
        user: null,
    }),
    actions: {
        setUserData(token, userData) {
            this.token = token;
            this.user = userData;
            localStorage.setItem('user_token', token);
        },
        clearUserData() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('user_token');
        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('user_token');
        },
    },
    getters: {
        isAuthenticated() {
            return !!this.token;
        },
    },
});
