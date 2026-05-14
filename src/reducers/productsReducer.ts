import type { Product } from "../types";

export type ProductAction = 
  | { type: "UPDATE"; id: string; payload: Partial<Product> }
  | { type: "DELETE"; id: string }
  | { type: "ADD"; product: Product };

export function productsReducer(state: Product[], action: ProductAction): Product[] {
  switch (action.type) {
    case "UPDATE": return state.map(p => p.id === action.id ? { ...p, ...action.payload } : p);
    case "DELETE":  return state.filter(p => p.id !== action.id);
    case "ADD":     return [...state, action.product];
    default: return state;
  }
}
