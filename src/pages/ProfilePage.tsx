import { useAuth, useCart, useWish } from "../hooks";
import { Button } from "../components/common/Button";

interface ProfilePageProps {
  go: (p: string) => void;
}

export const ProfilePage = ({ go }: ProfilePageProps) => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { wish } = useWish();

  if (!user) return (
    <div className="status-msg-container">
      <div className="text-5xl">🔒</div>
      <div className="text-base font-semibold text-gray mt-12 mb-20">Sign in to view profile</div>
      <Button variant="primary" onClick={() => go("login")}>Sign In</Button>
    </div>
  );

  return (
    <div className="profile-container">
      <div className="profile-header-card">
        <div className="profile-avatar">{user.name[0].toUpperCase()}</div>
        <div>
          <div className="text-lg font-black">{user.name}</div>
          <div className="text-xs text-gray mt-2">{user.email}</div>
        </div>
      </div>
      <div className="profile-stats-grid">
        {[["2","Orders"],[ wish.length,"Wishlist"],[cart.length,"In Cart"]].map(([n,l]) => (
          <div key={l as string} className="profile-stat-card">
            <div className="text-2xl font-black mb-3">{n}</div>
            <div className="form-label">{l as string}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-10">
        <Button variant="outline" onClick={() => go("orders")}>View Orders</Button>
        <Button variant="outline" onClick={() => go("wishlist")}>Wishlist</Button>
        <Button variant="outline" className="text-danger border-danger" onClick={() => { logout(); go("home"); }}>Logout</Button>
      </div>
    </div>
  );
};
