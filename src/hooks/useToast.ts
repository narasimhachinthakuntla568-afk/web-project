import { useContext, createContext } from "react";

const ToastCtx = createContext<((msg: string) => void) | null>(null);

export const useToastState = () => {
  const context = useContext(ToastCtx);
  if (!context) {
    throw new Error("useToastState must be used within ToastProvider");
  }
  return [null, context] as const;
};
