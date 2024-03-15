"use client";

import { Descope } from "@descope/nextjs-sdk";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  const handleLogin = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleLogout = useCallback(() => {
    router.push("/sign-out");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className={
          "fixed inset-0 transition-color delay-100 duration-700 opacity-25 bg-blue-300"
        }
      />
      <div className="max-w-7xl mt-20 mx-auto">
        <div className="flex flex-col items-center relative z-10">
          <Descope
            flowId={process.env.NEXT_PUBLIC_DESCOPE_FLOW_ID || "sign-up-or-in"}
            onSuccess={handleLogin}
            onError={handleLogout}
          />
        </div>
      </div>
    </div>
  );
}
