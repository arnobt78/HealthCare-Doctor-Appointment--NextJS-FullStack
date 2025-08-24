/* eslint-disable @next/next/no-img-element */
// Replaced next/image with native img for Vercel quota

import { Button } from "./ui/button";

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
  loadingText?: string;
}

const SubmitButton = ({
  isLoading,
  className,
  children,
  loadingText,
}: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <img
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
            style={{ width: 24, height: "auto", objectFit: "contain" }}
            loading="eager"
            decoding="async"
          />
          <span>{loadingText || "Processing..."}</span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
