"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/components/fetch/fetchUsers";
import Loading from "@/components/ui/Loading/Loading";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: userData, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });

  if (isLoading) return <Loading />;

  if (userData?.id) {
    router.push("/user");
    return <Loading />;
  }

  return <>{children}</>;
}
