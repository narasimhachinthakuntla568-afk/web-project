export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  sizes: string[];
  isNew: boolean;
  trending: boolean;
  rating: number;
  reviews: number;
  stock: number;
}

export interface User {
  email: string;
  name: string;
  isAdmin: boolean;
  token: string;
}

export interface CartItem extends Product {
  size: string;
  qty: number;
  key: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  status: 'Delivered' | 'Shipped' | 'Pending';
  total: number;
}
