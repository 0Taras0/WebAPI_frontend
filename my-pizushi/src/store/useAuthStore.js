import { create } from "zustand";
import {useCartStore} from "./cartStore";

export const useAuthStore = create((set) => ({
    user: null,
    setUser: async (user) => {
        set({ user, isAuthenticated: !!user })

        //об'єднуємо кошика
        await useCartStore.getState().mergeLocalCartToServer();
    },

    logout: async () => {
        localStorage.removeItem("jwt");
        set({ user: null, isAuthenticated: false });

        //після виходу очисщаємо локально кошик
        await useCartStore.getState().clearCart();
    },
}));