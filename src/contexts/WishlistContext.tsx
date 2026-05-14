import React, { useContext, useState, useEffect, useCallback } from "react";
import type { Product } from "../types";
import { WishCtx, ToastCtx } from "./index";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const showToast = useContext(ToastCtx);
  if (!showToast) throw new Error("ToastContext not found");
  const [wish, setWish] = useState<Product[]>(() => {
    try { return JSON.parse(localStorage.getItem("drip_wish") || "[]"); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("drip_wish", JSON.stringify(wish));
  }, [wish]);

  const toggleWish = useCallback((product: Product) => {
    setWish(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) {
        showToast("Removed from wishlist");
        return prev.filter(i => i.id !== product.id);
      }
      showToast("Added to wishlist ♡");
      return [...prev, product];
    });
  }, [showToast]);

  return (
    <WishCtx.Provider value={{ wish, toggleWish }}>
      {children}
    </WishCtx.Provider>
  );
}
