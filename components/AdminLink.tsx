"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function AdminLink({ className }: { className?: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className={className}
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          router.push("/?admin=true");
        });
      }}
    >
      {isPending ? "Continuing..." : "Admin"}
    </button>
  );
}
