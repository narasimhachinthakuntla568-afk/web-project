import { useState, useEffect } from "react";
import { useProducts } from "../hooks";
import { ProductCard } from "../components/common/ProductCard";
import { CATS, BRANDS } from "../utils/constants";
import type { Product } from "../types";

interface ShopPageProps {
  go: (p: string) => void;
  setProduct: (p: Product) => void;
}

export const ShopPage = ({ go, setProduct }: ShopPageProps) => {
  const { products } = useProducts();
  const [cat, setCat]     = useState("All");
  const [brand, setBrand] = useState("All");
  const [sort, setSort]   = useState("default");
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    const startLoading = setTimeout(() => setLoading(true), 0);
    const endLoading = setTimeout(() => setLoading(false), 500);
    return () => {
      clearTimeout(startLoading);
      clearTimeout(endLoading);
    };
  }, [cat, brand]);

  let list = products
    .filter(p => cat === "All" || p.category === cat)
    .filter(p => brand === "All" || p.brand === brand)
    .filter(p => p.price <= maxPrice)
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));
  
  if (sort === "priceLow")  list = [...list].sort((a,b) => a.price - b.price);
  if (sort === "priceHigh") list = [...list].sort((a,b) => b.price - a.price);
  if (sort === "rating")    list = [...list].sort((a,b) => b.rating - a.rating);
  if (sort === "new")       list = list.filter(p => p.isNew);

  const chip = (val: string, active: boolean, onClick: () => void) => (
    <button onClick={onClick} className={`filter-chip ${active ? "active" : ""}`}>
      {val}
    </button>
  );

  return (
    <div className="shop-container">
      <div className="flex justify-between items-center mb-28">
        <div><div className="section-title">All Products</div><div className="text-sm text-gray mt-3">{list.length} items</div></div>
        <div className="search-bar-shop">
          <span className="text-gray">🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search styles, brands…" className="search-input-shop" />
          {search && <button onClick={() => setSearch("")} className="btn-close-mini">×</button>}
        </div>
      </div>

      <div className="mb-10">
        <div className="form-label mb-8">Category</div>
        <div className="flex gap-10 flex-wrap mb-18">{CATS.map(c => chip(c, cat===c, ()=>setCat(c)))}</div>
        <div className="form-label mb-8">Brand</div>
        <div className="flex gap-10 flex-wrap mb-18">{BRANDS.map(b => chip(b, brand===b, ()=>setBrand(b)))}</div>
        <div className="flex gap-40 items-center mb-28">
          <div>
            <div className="form-label mb-8">Max Price: ₹{maxPrice.toLocaleString()}</div>
            <input type="range" min={500} max={10000} step={100} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
              className="price-range-v2" />
          </div>
          <div>
            <div className="form-label mb-8">Sort</div>
            <select value={sort} onChange={e => setSort(e.target.value)} className="admin-select">
              <option value="default">Default</option>
              <option value="priceLow">Price: Low → High</option>
              <option value="priceHigh">Price: High → Low</option>
              <option value="rating">Top Rated</option>
              <option value="new">New Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {loading
        ? <div className="shop-grid">
            {Array(8).fill(0).map((_,i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-img" />
                <div className="p-16"><div className="skeleton-text" /></div>
              </div>
            ))}
          </div>
        : list.length === 0
          ? <div className="status-msg-container">
              <div className="text-5xl">🔍</div>
              <div className="text-base font-semibold mt-12">No items found</div>
            </div>
          : <div className="shop-grid">
              {list.map(p => <ProductCard key={p.id} product={p} onClick={prod => { setProduct(prod); go("product"); }} />)}
            </div>
      }
    </div>
  );
};
