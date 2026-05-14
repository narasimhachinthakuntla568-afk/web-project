import { useState } from "react";
import { CATS, BRANDS } from "../../utils/constants";
import type { Product } from "../../types";
import { Button } from "../common/Button";

interface AddProductModalProps {
  onAdd: (p: Omit<Product, "id" | "rating" | "reviews">) => void;
  onClose: () => void;
}

export const AddProductModal = ({ onAdd, onClose }: AddProductModalProps) => {
  const [form, setForm] = useState({ 
    name:"", 
    brand:"ZARA", 
    category:"Tops", 
    price:"", 
    originalPrice:"", 
    stock:"", 
    image:"", 
    isNew:false, 
    trending:false, 
    sizes:["S","M","L"] 
  });

  const submit = () => {
    if (!form.name || !form.price || !form.stock) { alert("Name, price and stock are required"); return; }
    onAdd({ 
      ...form, 
      price:Number(form.price), 
      originalPrice:Number(form.originalPrice)||Number(form.price), 
      stock:Number(form.stock),
      image: form.image || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80" 
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="text-xl font-black mb-24">Add New Product</div>
        {(["name", "price", "originalPrice", "stock", "image"] as const).map((k) => (
          <div key={k} className="form-group">
            <label className="form-label">
              {k === "name" ? "Product Name" : k === "price" ? "Price (₹)" : k === "originalPrice" ? "Original Price (₹)" : k === "stock" ? "Stock Quantity" : "Image URL"}
            </label>
            <input 
              type={k === "price" || k === "originalPrice" || k === "stock" ? "number" : "text"} 
              value={form[k] as string} 
              placeholder={k === "name" ? "e.g. Slim Fit Jacket" : k === "price" ? "e.g. 1999" : k === "originalPrice" ? "e.g. 2499" : k === "stock" ? "e.g. 30" : "https://…"} 
              onChange={e => setForm({ ...form, [k]: e.target.value })}
              className="form-input"
            />
          </div>
        ))}
        <div className="grid grid-cols-2 gap-14 mb-14">
          <div>
            <label className="form-label">Category</label>
            <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="form-input bg-white">
              {CATS.filter(c=>c!=="All").map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label">Brand</label>
            <select value={form.brand} onChange={e=>setForm({...form,brand:e.target.value})} className="form-input bg-white">
              {BRANDS.filter(b=>b!=="All").map(b=><option key={b}>{b}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-20 mb-22">
          <label className="flex items-center gap-8 text-sm cursor-pointer">
            <input type="checkbox" checked={form.isNew} onChange={e=>setForm({...form,isNew:e.target.checked})} /> New Arrival
          </label>
          <label className="flex items-center gap-8 text-sm cursor-pointer">
            <input type="checkbox" checked={form.trending} onChange={e=>setForm({...form,trending:e.target.checked})} /> Trending
          </label>
        </div>
        <div className="flex gap-10">
          <Button variant="primary" className="flex-1 p-13" onClick={submit}>Add Product</Button>
          <Button variant="outline" className="p-13-20" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};
