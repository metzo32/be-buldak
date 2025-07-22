import { create } from "zustand";
import { get } from "@/api/api";
import { persist } from "zustand/middleware";

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

      // ✅ 쿠키 기반 사용자 정보 요청
      fetchUserInfo: async () => {
        try {
          const res = await get("/user/me");
          set({ user: res.data, isLoading: false });
        } catch (err) {
          console.error("유저 정보 요청 실패:", err);
          set({ user: null, isLoading: false });
        }
      },

      // ✅ 로그아웃 시 상태 초기화
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
