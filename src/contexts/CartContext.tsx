import React, { useContext, useState, useEffect, useCallback } from "react";
import type { Product, CartItem } from "../types";
import { CartCtx, ToastCtx } from "./index";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const showToast = useContext(ToastCtx);
  if (!showToast) throw new Error("ToastContext not found");

  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem("drip_cart") || "[]"); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("drip_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product: Product, size: string) => {
    const key = product.id + "_" + size;
    setCart(prev => {
      const ex = prev.find(i => i.key === key);
      if (ex) return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, size, qty: 1, key }];
    });
    showToast("Added to cart ✓");
  }, [showToast]);

  const removeFromCart = useCallback((key: string) => setCart(p => p.filter(i => i.key !== key)), []);
  
  const updateQty = useCallback((key: string, d: number) => 
    setCart(p => p.map(i => i.key === key ? { ...i, qty: Math.max(1, i.qty + d) } : i)), []);
  
  const clearCart = useCallback(() => setCart([]), []);

  return (
    <CartCtx.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartCtx.Provider>
  );
}
