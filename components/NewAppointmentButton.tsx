"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";

export default function NewAppointmentButton({ userId }: { userId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      className="shad-primary-btn"
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          router.push(`/patients/${userId}/new-appointment`);
        });
      }}
    >
      {isPending ? "Continuing..." : "New Appointment"}
    </Button>
  );
}
