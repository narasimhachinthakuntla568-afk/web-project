import React, { useContext, useReducer, useEffect, useCallback } from "react";
import type { Product } from "../types";
import { INIT_PRODUCTS } from "../utils/constants";
import { productsReducer } from "../reducers/productsReducer";
import { ProductsCtx, ToastCtx } from "./index";

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const showToast = useContext(ToastCtx);
  if (!showToast) throw new Error("ToastContext not found");

  const [products, dispatch] = useReducer(productsReducer, null, () => {
    try { 
      const cached = JSON.parse(localStorage.getItem("drip_products") || "null");
      if (cached) {
        return cached.map((p: Product) => {
          const base = INIT_PRODUCTS.find(i => i.id === p.id);
          return base ? { ...p, image: base.image } : p;
        });
      }
      return INIT_PRODUCTS; 
    } catch { return INIT_PRODUCTS; }
  });

  useEffect(() => {
    localStorage.setItem("drip_products", JSON.stringify(products));
  }, [products]);

  const updateProduct = useCallback((id: string, payload: Partial<Product>) => {
    dispatch({ type: "UPDATE", id, payload });
    showToast("Product updated ✓");
  }, [showToast]);

  const deleteProduct = useCallback((id: string) => {
    dispatch({ type: "DELETE", id });
    showToast("Product deleted");
  }, [showToast]);

  const addProduct = useCallback((p: Omit<Product, "id" | "rating" | "reviews">) => {
    dispatch({ type: "ADD", product: { ...p, id: "p" + Date.now(), rating: 4.0, reviews: 0 } as Product });
    showToast("Product added ✓");
  }, [showToast]);

  return (
    <ProductsCtx.Provider value={{ products, updateProduct, deleteProduct, addProduct }}>
      {children}
    </ProductsCtx.Provider>
  );
}
