import { useState } from "react";
import { useCart, useWish, useProducts } from "../hooks";
import { ProductCard } from "../components/common/ProductCard";
import { disc } from "../utils/helpers";
import type { Product } from "../types";
import { Button } from "../components/common/Button";

interface ProductPageProps {
  product: Product;
  go: (p: string) => void;
  setProduct: (p: Product) => void;
}

export const ProductPage = ({ product, go, setProduct }: ProductPageProps) => {
  const { addToCart } = useCart();
  const { wish, toggleWish } = useWish();
  const { products } = useProducts();
  const [size, setSize] = useState<string | null>(null);
  const [tab, setTab]   = useState("details");
  const wished = wish.some(i => i.id === product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const tabContent: Record<string, string> = {
    details: "Premium quality piece crafted from sustainable materials. Designed for the modern wardrobe — versatile, comfortable, and effortlessly stylish.",
    sizing: `True to size. Model is 175cm and wears size S. Available in ${product.sizes.join(", ")}.`,
    delivery: "Free delivery on orders above ₹999. Standard: 3–5 business days. Free returns within 30 days."
  };

  return (
    <div>
      <div className="breadcrumb">
        {["Home", "Shop", product.name].map((item, idx, arr) => (
          <span key={item}>
            <span 
              onClick={() => idx === 0 ? go("home") : idx === 1 ? go("shop") : null}
              className={idx === arr.length - 1 ? "active" : ""}
            >
              {item}
            </span>
            {idx < arr.length - 1 && <span>/</span>}
          </span>
        ))}
      </div>

      <div className="product-grid-layout">
        <div className="relative">
          <img src={product.image} alt={product.name} className="product-hero-img" />
          {product.isNew && <span className="new-drop-tag">NEW DROP</span>}
        </div>

        <div>
          <div className="product-brand mb-8">{product.brand}</div>
          <div className="product-name-large mb-10">{product.name}</div>
          <div className="product-rating">
            <span className="stars">{"★".repeat(Math.floor(product.rating))}</span>
            <span>{product.rating} · {product.reviews} reviews</span>
          </div>

          <div className="price-tag">
            <span className="price-current">₹{product.price.toLocaleString()}</span>
            <span className="price-old">₹{product.originalPrice.toLocaleString()}</span>
            <span className="price-discount">{disc(product.price, product.originalPrice)}% off</span>
          </div>

          <div className="size-label mb-10">Select Size</div>
          <div className="flex gap-10 mb-24 flex-wrap">
            {product.sizes.map(s => (
              <button key={s} onClick={() => setSize(s)}
                className={`size-chip ${size === s ? "active" : ""}`}>{s}</button>
            ))}
          </div>

          <div className="flex gap-10 mb-24">
            <Button variant="primary" className="flex-1 p-15"
              onClick={() => { if (!size) { alert("Please select a size"); return; } addToCart(product, size); }}>
              Add to Bag
            </Button>
            <Button variant="outline" className="p-15-18 text-lg" onClick={() => toggleWish(product)}>
              {wished ? "❤️" : "🤍"}
            </Button>
          </div>

          <div className="tabs-container">
            {Object.keys(tabContent).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`tab-btn ${tab === t ? "active" : ""}`}>{t}</button>
            ))}
          </div>

          <div className="tab-content">
            {tabContent[tab]}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="related-section">
          <div className="section-title mb-22">You Might Also Like</div>
          <div className="grid grid-cols-4 gap-22">
            {related.map(p => <ProductCard key={p.id} product={p} onClick={prod => { setProduct(prod); go("product"); window.scrollTo(0,0); }} />)}
          </div>
        </div>
      )}
    </div>
  );
};
