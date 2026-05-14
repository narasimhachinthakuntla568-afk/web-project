import { useCart } from "../../hooks";
import { Button } from "./Button";

interface CartSidebarProps {
  open: boolean;
  close: () => void;
  go: (p: string) => void;
}

export const CartSidebar = ({ open, close, go }: CartSidebarProps) => {
  const { cart, removeFromCart, updateQty } = useCart();
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  if (!open) return null;

  return (
    <>
      <div onClick={close} className="modal-overlay-bg" />
      <div className="cart-sidebar-panel">
        <div className="cart-sidebar-header">
          <span className="text-sm font-black tracking-widest">YOUR BAG ({cart.reduce((s,i)=>s+i.qty,0)})</span>
          <button className="btn-close-large" onClick={close}>×</button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0
            ? <div className="status-msg-container">
                <div className="text-5xl">🛍️</div>
                <div className="text-base font-semibold mt-12">Your bag is empty</div>
              </div>
            : cart.map(item => (
              <div key={item.key} className="cart-item-v2">
                <img src={item.image} alt={item.name} className="cart-item-thumb" />
                <div className="flex-1">
                  <div className="product-brand">{item.brand}</div>
                  <div className="text-sm font-semibold my-3">{item.name}</div>
                  <div className="text-xs text-gray">Size: {item.size}</div>
                  <div className="text-base font-black my-6">₹{(item.price * item.qty).toLocaleString()}</div>
                  <div className="flex items-center gap-10">
                    <button className="qty-btn-mini" onClick={() => updateQty(item.key, -1)}>−</button>
                    <span className="text-sm font-bold">{item.qty}</span>
                    <button className="qty-btn-mini" onClick={() => updateQty(item.key, 1)}>+</button>
                    <button className="btn-remove-cart" onClick={() => removeFromCart(item.key)}>🗑</button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        {cart.length > 0 && (
          <div className="cart-sidebar-footer">
            <div className="flex justify-between font-black text-base mb-16">
              <span>Total</span><span>₹{total.toLocaleString()}</span>
            </div>
            <Button variant="primary" className="w-full p-15" onClick={() => { close(); go("checkout"); }}>Checkout</Button>
          </div>
        )}
      </div>
    </>
  );
};
