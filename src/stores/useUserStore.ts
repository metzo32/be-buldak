import { create } from "zustand";
import { persist } from "zustand/middleware";
import { get } from "@/api/api";

type User = {
  id: number;
  name: string;
  email: string;
};

type UserStore = {
  user: User | null;
  isLoading: boolean;
  setUserInfo: (user: User) => void;
  fetchUserInfo: () => Promise<void>;
  resetUser: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,

      setUserInfo: (user) => set({ user }),

      fetchUserInfo: async () => {
        try {
          const res = await get("/user/me");
          set({ user: res.data, isLoading: false });
        } catch (err) {
          console.error("유저 정보 요청 실패:", err);
          set({ user: null, isLoading: false });
        }
      },

      resetUser: () => {
        set({ user: null, isLoading: true });
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
