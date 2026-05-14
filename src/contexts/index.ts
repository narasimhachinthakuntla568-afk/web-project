import { createContext } from "react";
import type { User, Product, CartItem } from "../types";

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, name?: string) => { isAdmin: boolean };
  logout: () => void;
}
export const AuthCtx = createContext<AuthContextType | null>(null);

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (key: string) => void;
  updateQty: (key: string, d: number) => void;
  clearCart: () => void;
}
export const CartCtx = createContext<CartContextType | null>(null);

export interface ProductsContextType {
  products: Product[];
  updateProduct: (id: string, payload: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addProduct: (p: Omit<Product, "id" | "rating" | "reviews">) => void;
}
export const ProductsCtx = createContext<ProductsContextType | null>(null);

export const ToastCtx = createContext<((msg: string) => void) | null>(null);

export interface WishlistContextType {
  wish: Product[];
  toggleWish: (product: Product) => void;
}
export const WishCtx = createContext<WishlistContextType | null>(null);

export * from "./OrdersContext";

