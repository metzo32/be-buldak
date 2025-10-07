"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/components/fetch/fetchUsers";
import Loading from "@/components/ui/Loading/Loading";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && !userData?.id) {
      router.replace("/login");
    }
  }, [isLoading, userData, router]);

  if (isLoading || !userData?.id) {
    return <Loading />;
  }

  return <>{children}</>;
}
