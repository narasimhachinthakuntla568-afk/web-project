import { useState } from "react";
import type { Product } from "../../types";
import { useWish, useCart } from "../../hooks";
import { disc } from "../../utils/helpers";

interface ProductCardProps {
  product: Product;
  onClick: (p: Product) => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const { wish, toggleWish } = useWish();
  const { addToCart } = useCart();
  const [hov, setHov] = useState(false);
  const wished = wish.some(i => i.id === product.id);

  return (
    <div onClick={() => onClick(product)} className={`product-card-v2 ${hov ? "hov" : ""}`} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div className="relative overflow-hidden">
        <img src={product.image} alt={product.name} className={`product-img-v2 ${hov ? "zoom" : ""}`} />
        <div className="card-badges">
          {product.isNew    && <span className="badge-new">NEW</span>}
          {product.trending && <span className="badge-hot">🔥 TRENDING</span>}
        </div>
        <button className="wish-btn-v2" onClick={e => { e.stopPropagation(); toggleWish(product); }}>
          {wished ? "❤️" : "🤍"}
        </button>
        {hov && (
          <button className="quick-add-btn" onClick={e => { e.stopPropagation(); addToCart(product, product.sizes[0]); }}>
            Quick Add
          </button>
        )}
      </div>
      <div className="p-16">
        <div className="product-brand mb-4">{product.brand}</div>
        <div className="product-name mb-8">{product.name}</div>
        <div className="flex items-center justify-between">
          <div className="flex gap-8 items-center">
            <span className="font-bold text-sm">₹{product.price.toLocaleString()}</span>
            <span className="price-old-v2">₹{product.originalPrice.toLocaleString()}</span>
          </div>
          <span className="price-discount-v2">{disc(product.price, product.originalPrice)}% off</span>
        </div>
        <div className="text-xs text-star mt-6">
          {"★".repeat(Math.floor(product.rating))} <span className="text-gray">({product.reviews})</span>
        </div>
      </div>
    </div>
  );
};
