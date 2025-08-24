/* eslint-disable @next/next/no-img-element */
// Replaced next/image with native img for Vercel quota

export default function GlobalLoading({
  text = "Processing...",
}: {
  text?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
      <img
        src="/assets/icons/loader.svg"
        alt="loader"
        width={48}
        height={48}
        className="mb-4 animate-spin"
        style={{
          width: 48,
          height: 48,
          objectFit: "contain",
          aspectRatio: "auto",
        }}
        loading="eager"
        decoding="async"
      />
      <span className="animate-pulse text-lg font-semibold text-white">
        {text}
      </span>
    </div>
  );
}
