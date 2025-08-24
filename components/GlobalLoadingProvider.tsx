"use client";

import { createContext, useContext, useState, ReactNode } from "react";

import GlobalLoading from "./GlobalLoading";

interface LoadingContextType {
  show: (text?: string) => void;
  hide: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useGlobalLoading() {
  const ctx = useContext(LoadingContext);
  if (!ctx)
    throw new Error("useGlobalLoading must be used within LoadingProvider");
  return ctx;
}

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState<string>("Processing...");

  const show = (t?: string) => {
    setText(t || "Processing...");
    setVisible(true);
  };
  const hide = () => setVisible(false);

  return (
    <LoadingContext.Provider value={{ show, hide }}>
      {visible && <GlobalLoading text={text} />}
      {children}
    </LoadingContext.Provider>
  );
}
