import React from "react";
import { ToastProvider } from "./ToastContext";
import { AuthProvider } from "./AuthContext";
import { ProductsProvider } from "./ProductsContext";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { OrdersProvider } from "./OrdersContext";

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <WishlistProvider>
              <OrdersProvider>
                {children}
              </OrdersProvider>
            </WishlistProvider>
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
