import { useAuth, useCart, useWish } from "../../hooks";
import { Button } from "./Button";
import "../../App.css";

interface NavbarProps {
  page: string;
  go: (p: string) => void;
  openCart: () => void;
}

export const Navbar = ({ page, go, openCart }: NavbarProps) => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { wish } = useWish();
  const cartN = cart.reduce((s, i) => s + i.qty, 0);

  if (user?.isAdmin) return (
    <nav className="nav-bar">
      <div className="nav-logo" onClick={() => go("admin")}>
        DRIP <span className="nav-admin-chip">ADMIN</span>
      </div>
      <div className="nav-right">
        <span style={{ fontSize:13, color:"#888", fontWeight:600 }}>👑 Admin Panel</span>
        <Button variant="outline" onClick={() => { logout(); go("home"); }}>Logout</Button>
      </div>
    </nav>
  );

  return (
    <nav className="nav-bar">
      <div className="nav-logo" onClick={() => go("home")}>DRIP</div>
      <ul className="nav-links">
        {["home","shop","wishlist","orders"].map(p => (
          <li key={p} onClick={() => go(p)}
            className={`nav-link ${page === p ? "active" : ""}`}>
            {p[0].toUpperCase() + p.slice(1)}
          </li>
        ))}
      </ul>
      <div className="nav-right">
        <button className="nav-ico" onClick={() => go("shop")}>🔍</button>
        <button className="nav-ico" onClick={() => go("wishlist")}>
          🤍 {wish.length > 0 && <span className="nav-badge">{wish.length}</span>}
        </button>
        <button className="nav-ico" onClick={openCart}>
          🛍️ {cartN > 0 && <span className="nav-badge">{cartN}</span>}
        </button>
        {user
          ? <>
              <span style={{ fontSize:13, fontWeight:600, cursor:"pointer" }} onClick={() => go("profile")}>👤 {user.name}</span>
              <Button variant="outline" onClick={logout}>Logout</Button>
            </>
          : <Button variant="primary" onClick={() => go("login")}>Sign In</Button>
        }
      </div>
    </nav>
  );
};
