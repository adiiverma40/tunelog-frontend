import { createContext, useContext, ReactNode } from "react";
import { useWhatsNew } from "../hooks/useWhatsNew";

const WhatsNewContext = createContext<ReturnType<typeof useWhatsNew> | null>(null);

export const WhatsNewProvider = ({ children }: { children: ReactNode }) => {
  const value = useWhatsNew();
  return <WhatsNewContext.Provider value={value}>{children}</WhatsNewContext.Provider>;
};

export const useWhatsNewContext = () => {
  const ctx = useContext(WhatsNewContext);
  if (!ctx) {
    throw new Error("useWhatsNewContext must be used within a WhatsNewProvider");
  }
  return ctx;
};