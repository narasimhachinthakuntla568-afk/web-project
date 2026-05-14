import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import { RootProvider } from "./contexts/RootProvider";
import { Navbar } from "./components/common/Navbar";
import { CartSidebar } from "./components/common/CartSidebar";
import { Footer } from "./components/common/Footer";
import { HomePage } from "./pages/HomePage";
import { ShopPage } from "./pages/ShopPage";
import { ProductPage } from "./pages/ProductPage";
import { AuthPage } from "./pages/AuthPage";
import { WishlistPage } from "./pages/WishlistPage";
import { OrdersPage } from "./pages/OrdersPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { AdminPanel } from "./pages/admin/AdminPanel";
import type { Product } from "./types";
import "./App.css";

export default function App() {
  const [page, setPage]       = useState("home");
  const [cartOpen, setCartOpen] = useState(false);
  const [product, setProduct]   = useState<Product | null>(null);

  const go = useCallback((p: string) => { 
    setPage(p); 
    window.scrollTo(0, 0); 
  }, []);

  const pages: Record<string, ReactNode> = {
    home:     <HomePage go={go} setProduct={setProduct} />,
    shop:     <ShopPage go={go} setProduct={setProduct} />,
    product:  product ? <ProductPage product={product} go={go} setProduct={setProduct} /> : <HomePage go={go} setProduct={setProduct} />,
    login:    <AuthPage go={go} />,
    wishlist: <WishlistPage go={go} setProduct={setProduct} />,
    orders:   <OrdersPage go={go} />,
    profile:  <ProfilePage go={go} />,
    checkout: <CheckoutPage go={go} />,
    admin:    <AdminPanel go={go} />
  };

  return (
    <RootProvider>
      <div className="app-wrapper">
        <Navbar page={page} go={go} openCart={() => setCartOpen(true)} />
        <CartSidebar open={cartOpen} close={() => setCartOpen(false)} go={go} />

        <main>
          {pages[page] || pages.home}
        </main>

        {page !== "admin" && <Footer go={go} />}
      </div>
    </RootProvider>
  );
}
