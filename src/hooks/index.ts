import { useContext } from "react";
import { AuthCtx, CartCtx, ProductsCtx, ToastCtx, WishCtx, OrdersCtx } from "../contexts";

export const useAuth = () => {
  const context = useContext(AuthCtx);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const useCart = () => {
  const context = useContext(CartCtx);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const useProducts = () => {
  const context = useContext(ProductsCtx);
  if (!context) throw new Error("useProducts must be used within ProductsProvider");
  return context;
};

export const useToast = () => {
  const context = useContext(ToastCtx);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

export const useWish = () => {
  const context = useContext(WishCtx);
  if (!context) throw new Error("useWish must be used within WishlistProvider");
  return context;
};

export const useOrders = () => {
  const context = useContext(OrdersCtx);
  if (!context) throw new Error("useOrders must be used within OrdersProvider");
  return context;
};

