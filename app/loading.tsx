/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex-center size-full h-screen gap-3 text-white">
      <img
        src="/assets/icons/loader.svg"
        alt="loader"
        width={40}
        height="auto"
        className="animate-spin"
      />
      Loading...
    </div>
  );
}
