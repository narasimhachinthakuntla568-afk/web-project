import type { Product } from "../types";

export const ADMIN_EMAIL = "admin@gmail.com";
export const ADMIN_PASS  = "admin@12345";

export const CATS   = ["All","Tops","Bottoms","Outerwear","Dresses","Accessories"];
export const BRANDS = ["All","ZARA","H&M","Uniqlo","COS","Arket"];

export const INIT_PRODUCTS: Product[] = [
  {id:"p1",  name:"Oversized Cotton Tee",  brand:"Uniqlo", category:"Tops",        price:799,  originalPrice:1199, image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80", sizes:["S","M","L","XL"], isNew:true,  trending:true,  rating:4.5, reviews:128, stock:45},
  {id:"p2",  name:"Wide Leg Trousers",     brand:"ZARA",   category:"Bottoms",     price:2199, originalPrice:2999, image:"https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80", sizes:["XS","S","M","L"], isNew:true,  trending:false, rating:4.2, reviews:89,  stock:23},
  {id:"p3",  name:"Minimal Blazer",        brand:"COS",    category:"Outerwear",   price:4499, originalPrice:5999, image:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80", sizes:["S","M","L"],      isNew:false, trending:true,  rating:4.8, reviews:203, stock:12},
  {id:"p4",  name:"Slip Midi Dress",       brand:"Arket",  category:"Dresses",     price:2799, originalPrice:3499, image:"https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80", sizes:["XS","S","M"],     isNew:true,  trending:true,  rating:4.6, reviews:156, stock:18},
  {id:"p5",  name:"Linen Shirt",           brand:"H&M",    category:"Tops",        price:999,  originalPrice:1499, image:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80", sizes:["S","M","L","XL"], isNew:false, trending:false, rating:4.1, reviews:67,  stock:67},
  {id:"p6",  name:"Cargo Pants",           brand:"ZARA",   category:"Bottoms",     price:2499, originalPrice:3299, image:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80", sizes:["S","M","L","XL"], isNew:true,  trending:true,  rating:4.7, reviews:312, stock:34},
  {id:"p7",  name:"Knit Cardigan",         brand:"Uniqlo", category:"Tops",        price:1799, originalPrice:2299, image:"https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80", sizes:["XS","S","M","L"], isNew:false, trending:false, rating:4.4, reviews:94,  stock:29},
  {id:"p8",  name:"Mini Skirt",            brand:"H&M",    category:"Bottoms",     price:1299, originalPrice:1799, image:"https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=400&q=80", sizes:["XS","S","M"],     isNew:true,  trending:true,  rating:4.3, reviews:178, stock:8},
  {id:"p9",  name:"Trench Coat",           brand:"COS",    category:"Outerwear",   price:6999, originalPrice:8999, image:"https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80", sizes:["S","M","L"],      isNew:false, trending:false, rating:4.9, reviews:445, stock:5},
  {id:"p10", name:"Floral Maxi Dress",     brand:"Arket",  category:"Dresses",     price:3299, originalPrice:4499, image:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80", sizes:["XS","S","M","L"], isNew:true,  trending:false, rating:4.5, reviews:134, stock:21},
  {id:"p11", name:"Canvas Tote Bag",       brand:"Uniqlo", category:"Accessories", price:599,  originalPrice:899,  image:"https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80", sizes:["M"],              isNew:false, trending:true,  rating:4.2, reviews:89,  stock:52},
  {id:"p12", name:"Leather Belt",          brand:"ZARA",   category:"Accessories", price:899,  originalPrice:1299, image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80", sizes:["S","M","L"],      isNew:false, trending:false, rating:4.0, reviews:56,  stock:40},
];
