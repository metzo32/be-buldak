import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";

// 로그인이 필요한 액션에 삽입할 훅
export default function useRequireUser() {
  const { user, fetchUserInfo } = useUserStore();
  const router = useRouter();

  const requireUser = async (action: () => void) => {
    if (!user) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    // 세션 살아있는지 재검토
    try {
      await fetchUserInfo();
      action();
    } catch {
      router.push("/login");
    }
  };

  return { requireUser };
}
