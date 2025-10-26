import { create } from "zustand";
import { persist } from "zustand/middleware";
import { _get } from "@/api/api";

type User = {
  id: number;
  name: string;
  email: string;
};

type UserStore = {
  user: User | null;
  isUserLoading: boolean;
  setUserInfo: (user: User) => void;
  fetchUserInfo: () => Promise<void>;
  resetUser: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isUserLoading: true,

      setUserInfo: (user) => set({ user }),

      fetchUserInfo: async () => {
        try {
          const res = await _get("/user/me");
          set({ user: res.data, isUserLoading: false });
        } catch (err: any) {
          console.log("유저 정보 요청 실패:", err);
          if (err?.response?.status === 401 || err?.response?.status === 419) {
            set({ user: null });
          }
          set({ isUserLoading: false });
        }
      },

      resetUser: () => {
        set({ user: null, isUserLoading: true });
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
