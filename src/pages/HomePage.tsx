import { useState, useEffect } from "react";
import { useProducts } from "../hooks";
import { ProductCard } from "../components/common/ProductCard";
import { CATS } from "../utils/constants";
import { catIcon } from "../utils/helpers";
import { Button } from "../components/common/Button";
import type { Product } from "../types";

interface HomePageProps {
  go: (p: string) => void;
  setProduct: (p: Product) => void;
}

const ANIMATIONS = ["flyInOutLeft", "flyInOutRight", "flyInOutTop", "flyInOutBottom"];

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

const FloatingCarousel = ({ products }: { products: Product[] }) => {
  const [cycle, setCycle] = useState(0);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [currentAnims, setCurrentAnims] = useState<string[]>([]);

  useEffect(() => {
    if (products.length) {
      setCurrentImages(shuffle(products).slice(0, 5).map(p => p.image));
      setCurrentAnims(shuffle([...ANIMATIONS, "flyInOutTop"]).slice(0, 5));
    }
  }, [products]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCycle(c => c + 1);
      if (products.length) {
        setCurrentImages(shuffle(products).slice(0, 5).map(p => p.image));
        setCurrentAnims(shuffle([...ANIMATIONS, "flyInOutLeft"]).slice(0, 5));
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [products]);

  if (!currentImages.length) return null;

  const positions = [
    { top: "5%", left: "5%", w: 140, h: 180, float: "float-1", dur: "8s" },
    { top: "0%", right: "5%", w: 120, h: 150, float: "float-2", dur: "7s", z: 1 },
    { bottom: "5%", left: "0%", w: 130, h: 160, float: "float-3", dur: "9s", z: 2 },
    { bottom: "0%", right: "10%", w: 150, h: 190, float: "float-1", dur: "10s", rev: true },
    { top: "30%", left: "30%", w: 170, h: 220, float: "float-2", dur: "8.5s", z: 3, shadow: true },
  ];

  return (
    <div key={cycle} className="carousel-container">
      {positions.map((pos, i) => (
        <div key={i} className="carousel-img-wrapper" 
          style={{ 
            top: pos.top, left: pos.left, right: pos.right, bottom: pos.bottom,
            animation: `${currentAnims[i]} 6s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
            zIndex: pos.z || 0 
          }}>
          <img src={currentImages[i]} alt="hero" className="carousel-img" 
            style={{ 
              width: pos.w, height: pos.h, 
              animation: `${pos.float} ${pos.dur} ease-in-out infinite ${pos.rev ? "reverse" : ""}`,
              filter: pos.shadow ? "brightness(0.95)" : "none",
              boxShadow: pos.shadow ? "0 20px 40px rgba(0,0,0,0.5)" : "none"
            }} 
          />
        </div>
      ))}
    </div>
  );
};


export const HomePage = ({ go, setProduct }: HomePageProps) => {
  const { products } = useProducts();
  const trending = products.filter(p => p.trending).slice(0, 4);
  const newArr   = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div>
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-subtitle">New Collection · SS 2025</div>
          <div className="hero-title">Dress<br/>Different</div>
          <div className="hero-desc">Minimalist fashion for the generation that defines cool.</div>
          <div className="flex gap-14">
            <Button variant="light" onClick={() => go("shop")}>Shop Now</Button>
            <Button variant="light" className="hero-btn-alt" onClick={() => go("shop")}>Explore</Button>
          </div>
        </div>

        <FloatingCarousel products={products} />
      </div>

      <div className="p-56">
        <div className="section-title mb-6">Shop by Category</div>
        <div className="section-subtitle mb-28">Find your aesthetic</div>
        <div className="grid grid-cols-5 gap-14">
          {CATS.filter(c => c !== "All").map(cat => (
            <div key={cat} onClick={() => go("shop")} className="cat-grid-item">
              {catIcon(cat)}<br /><span className="block mt-8 text-xs">{cat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-56 bg-f9">
        <div className="flex justify-between items-center mb-28">
          <div>
            <div className="section-title">🔥 Trending Now</div>
            <div className="section-subtitle mt-4">What everyone's wearing</div>
          </div>
          <Button variant="outline" onClick={() => go("shop")}>View All</Button>
        </div>
        <div className="grid grid-cols-4 gap-22">
          {trending.map(p => <ProductCard key={p.id} product={p} onClick={prod => { setProduct(prod); go("product"); }} />)}
        </div>
      </div>

      <div className="p-56">
        <div className="flex justify-between items-center mb-28">
          <div>
            <div className="section-title">New Arrivals</div>
            <div className="section-subtitle mt-4">Fresh drops, just landed</div>
          </div>
          <Button variant="outline" onClick={() => go("shop")}>View All</Button>
        </div>
        <div className="grid grid-cols-4 gap-22">
          {newArr.map(p => <ProductCard key={p.id} product={p} onClick={prod => { setProduct(prod); go("product"); }} />)}
        </div>
      </div>

      <div className="hero-footer text-center">
        <div className="hero-subtitle mb-10">LIMITED TIME</div>
        <div className="promo-title mb-12">End of Season Sale</div>
        <div className="promo-desc mb-28">Up to 60% off on select styles</div>
        <Button variant="light" onClick={() => go("shop")}>Shop the Sale</Button>
      </div>
    </div>
  );
};
