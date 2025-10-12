"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/components/fetch/fetchUsers";
import Loading from "@/components/ui/Loading/Loading";
import { useEffect } from "react";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: userData, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(),
    retry: false,
  });

  useEffect(() => {
    if (userData?.id) {
      router.replace("/user");
    }
  }, [userData, router]);

  if (isLoading) return <Loading />;
  if (userData?.id) return <Loading />; // redirect 중 로딩 유지

  return <>{children}</>;
}
