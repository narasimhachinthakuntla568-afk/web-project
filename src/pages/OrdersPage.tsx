import { useAuth, useOrders } from "../hooks";
import { Button } from "../components/common/Button";


interface OrdersPageProps {
  go: (p: string) => void;
}

export const OrdersPage = ({ go }: OrdersPageProps) => {
  const { user } = useAuth();
  const { orders } = useOrders();

  if (!user) return (
    <div className="status-msg-container">
      <div className="text-5xl">🔒</div>
      <div className="text-base font-semibold text-gray mt-12 mb-20">Sign in to view orders</div>
      <Button variant="primary" onClick={() => go("login")}>Sign In</Button>
    </div>
  );

  return (
    <div className="shop-container">
      <div className="section-title mb-8">Your Orders</div>
      <div className="text-sm text-gray mb-28">Track and manage your purchases</div>
      {orders.map(o => (
        <div key={o.id} className="order-card-v2">
          <div className="flex justify-between items-center mb-16">
            <div>
              <div className="text-sm font-bold">{o.id}</div>
              <div className="text-xs text-gray mt-2">{o.date}</div>
            </div>
            <div className="flex gap-16 items-center">
              <span className="text-base font-black">₹{o.total.toLocaleString()}</span>
              <span className={`status-badge-v2 ${o.status === "Delivered" ? "delivered" : "pending"}`}>{o.status}</span>
            </div>
          </div>
          <div className="order-items-flex">
            {o.items.map((item, idx) => (
              <div key={item.key || `${item.id}-${idx}`} className="order-item-v2">
                <img src={item.image} alt={item.name} className="order-item-thumb" />
                <div>
                  <div className="product-brand">{item.brand}</div>
                  <div className="text-sm font-semibold">{item.name}</div>
                  <div className="text-xs text-gray mt-2">Size: {item.size} • Qty: {item.qty}</div>
                  <div className="text-sm font-black mt-3">₹{item.price.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
