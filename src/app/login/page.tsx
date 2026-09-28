"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoginScreen from "@/components/auth/LoginScreen";

function safeRedirectPath(from: string | null): string {
  if (!from || !from.startsWith("/") || from.startsWith("//")) return "/";
  return from;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSuccess() {
    router.push(safeRedirectPath(searchParams.get("from")));
    router.refresh();
  }

  return <LoginScreen onSuccess={handleSuccess} />;
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
