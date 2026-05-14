import React, { createContext, useState, useEffect } from "react";
import type { Order } from "../types";
import { INIT_PRODUCTS } from "../utils/constants";

export interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const OrdersCtx = createContext<OrdersContextType | null>(null);

const MOCK_ORDERS: Order[] = [
  { 
    id: "ORD-2025-001", 
    date: "12 Apr 2025", 
    items: [
      { ...INIT_PRODUCTS[0], size: "M", qty: 1, key: `${INIT_PRODUCTS[0].id}-M` },
      { ...INIT_PRODUCTS[2], size: "L", qty: 2, key: `${INIT_PRODUCTS[2].id}-L` }
    ], 
    status: "Delivered", 
    total: 5298 
  },
  { 
    id: "ORD-2025-002", 
    date: "28 Mar 2025", 
    items: [
      { ...INIT_PRODUCTS[3], size: "S", qty: 1, key: `${INIT_PRODUCTS[3].id}-S` }
    ], 
    status: "Shipped", 
    total: 2799 
  },
];

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem("drip_orders");
      if (stored) return JSON.parse(stored);
    } catch {}
    return MOCK_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem("drip_orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order: Order) => setOrders(prev => [order, ...prev]);

  return (
    <OrdersCtx.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersCtx.Provider>
  );
}
