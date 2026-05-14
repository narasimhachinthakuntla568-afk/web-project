import { useWish } from "../hooks";
import { ProductCard } from "../components/common/ProductCard";
import type { Product } from "../types";

interface WishlistPageProps {
  go: (p: string) => void;
  setProduct: (p: Product) => void;
}

export const WishlistPage = ({ go, setProduct }: WishlistPageProps) => {
  const { wish } = useWish();
  return (
    <div className="shop-container">
      <div className="section-title mb-8">Wishlist</div>
      <div className="text-sm text-gray mb-28">{wish.length} saved items</div>
      {wish.length === 0
        ? <div className="status-msg-container">
            <div className="text-5xl">🤍</div>
            <div className="text-base font-semibold text-gray mt-12">Your wishlist is empty</div>
          </div>
        : <div className="shop-grid">
            {wish.map(p => <ProductCard key={p.id} product={p} onClick={prod => { setProduct(prod); go("product"); }} />)}
          </div>
      }
    </div>
  );
};
