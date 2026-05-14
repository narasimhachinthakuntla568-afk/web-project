import { useState } from "react";
import { useAuth, useCart, useOrders } from "../hooks";
import { Button } from "../components/common/Button";

interface CheckoutPageProps {
  go: (p: string) => void;
}

export const CheckoutPage = ({ go }: CheckoutPageProps) => {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [form, setForm] = useState({ name:"", address:"", city:"", pin:"", phone:"" });
  const [pay, setPay]   = useState("upi");
  const [placed, setPlaced] = useState(false);
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    const newOrder = {
      id: `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`,
      date: new Date().toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" }),
      items: cart,
      status: "Pending" as const,
      total
    };
    addOrder(newOrder);
    setPlaced(true);
    clearCart();
  };


  if (!user) return (
    <div className="status-msg-container">
      <div className="text-5xl mb-12">🔒</div>
      <div className="text-base font-semibold mb-20">Sign in to checkout</div>
      <Button variant="primary" onClick={() => go("login")}>Sign In</Button>
    </div>
  );

  if (placed) return (
    <div className="status-msg-container">
      <div className="text-6xl mb-16">✅</div>
      <div className="section-title mb-8">Order Placed!</div>
      <div className="section-subtitle mb-28">You'll receive a confirmation shortly</div>
      <Button variant="primary" onClick={() => go("orders")}>Track Order</Button>
    </div>
  );

  const f = (key: keyof typeof form, label: string, ph: string, type="text") => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input type={type} value={form[key]} onChange={e => setForm({...form,[key]:e.target.value})} placeholder={ph} className="form-input" />
    </div>
  );

  return (
    <div className="checkout-grid">
      <div>
        <div className="section-title mb-20">Delivery Address</div>
        {f("name","Full Name","John Doe")}
        {f("address","Address","Street, Apartment")}
        {f("city","City","Hyderabad")}
        {f("pin","PIN Code","500001")}
        {f("phone","Phone","10-digit number","tel")}
        <div className="section-title mt-22 mb-14">Payment Method</div>
        {[["upi","📱","UPI / GPay / PhonePe"],["card","💳","Debit / Credit Card"],["cod","🏠","Cash on Delivery"]].map(([id,icon,label]) => (
          <div key={id} onClick={() => setPay(id)}
            className={`payment-option ${pay === id ? "active" : ""}`}>
            <span className="text-xl">{icon}</span>
            <span className="text-sm font-semibold">{label}</span>
          </div>
        ))}
      </div>
      <div>
        <div className="section-title mb-20">Order Summary</div>
        {cart.map(i => (
          <div key={i.key} className="summary-item">
            <span>{i.name} × {i.qty}</span>
            <span className="font-bold">₹{(i.price*i.qty).toLocaleString()}</span>
          </div>
        ))}
        <div className="summary-total">
          <span>Total</span><span>₹{total.toLocaleString()}</span>
        </div>
        <div className="text-xs text-success mb-16">✓ Free delivery on this order</div>
        <Button variant="primary" className="w-full p-16"
          onClick={handlePlaceOrder}>
          Place Order · ₹{total.toLocaleString()}
        </Button>
      </div>
    </div>
  );
};
