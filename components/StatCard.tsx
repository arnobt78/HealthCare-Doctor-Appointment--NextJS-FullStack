/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
// Replaced next/image with native img for Vercel quota

type StatCardProps = {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
};

export const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex items-center gap-4">
        <img
          src={icon}
          height={32}
          width={32}
          alt="appointments"
          className="size-8 w-fit"
          loading="lazy"
          decoding="async"
        />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>

      <p className="text-14-regular">{label}</p>
    </div>
  );
};
