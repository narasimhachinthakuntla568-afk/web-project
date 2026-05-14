import { useState } from "react";
import { useAuth, useProducts } from "../../hooks";
import { CATS } from "../../utils/constants";
import { catIcon, stockBg, stockColor } from "../../utils/helpers";
import { Button } from "../../components/common/Button";
import { AddProductModal } from "../../components/admin/AddProductModal";
import type { Product } from "../../types";

export const AdminPanel = ({ go }: { go: (p: string) => void }) => {
  const { user, logout } = useAuth();
  const { products, updateProduct, deleteProduct, addProduct } = useProducts();
  const [tab, setTab]       = useState("dashboard");
  const [editItem, setEditItem]   = useState<Product | null>(null);
  const [addModal, setAddModal]   = useState(false);
  const [searchQ, setSearchQ]     = useState("");
  const [filterCat, setFilterCat] = useState("All");

  if (!user?.isAdmin) return (
    <div className="status-msg-container">
      <div className="text-5xl mb-12">🚫</div>
      <div className="section-title mb-20">Access Denied</div>
      <Button variant="primary" onClick={() => go("home")}>Go Home</Button>
    </div>
  );

  const totalStock     = products.reduce((s,p) => s + p.stock, 0);
  const totalValuation = products.reduce((s,p) => s + p.price * p.stock, 0);
  const lowStock       = products.filter(p => p.stock <= 10).length;
  const catBreakdown   = CATS.filter(c=>c!=="All").map(c => ({
    name: c,
    count: products.filter(p=>p.category===c).length,
    stock: products.filter(p=>p.category===c).reduce((s,p)=>s+p.stock,0),
    val:   products.filter(p=>p.category===c).reduce((s,p)=>s+p.price*p.stock,0),
  }));
  const maxCatVal = Math.max(...catBreakdown.map(c=>c.val), 1);
  const filtered = products
    .filter(p => filterCat==="All" || p.category===filterCat)
    .filter(p => !searchQ || p.name.toLowerCase().includes(searchQ.toLowerCase()) || p.brand.toLowerCase().includes(searchQ.toLowerCase()));

  const kpi = (icon: string, val: string | number, label: string, sub?: string, color="#111") => (
    <div className="kpi-card">
      <div className="text-2xl mb-10">{icon}</div>
      <div className="text-2xl font-black mb-3" style={{ color }}>{val}</div>
      <div className="form-label">{label}</div>
      {sub && <div className="text-xs text-gray mt-4">{sub}</div>}
    </div>
  );

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="nav-admin-chip m-0 mb-8">ADMIN</div>
          <div className="text-sm font-bold">Store Manager</div>
          <div className="text-xs text-gray mt-2">{user.email}</div>
        </div>
        <div className="py-12">
          {[
            { id:"dashboard", icon:"📊", label:"Dashboard" },
            { id:"products",  icon:"👗", label:"Products" },
            { id:"inventory", icon:"📦", label:"Inventory" },
            { id:"analytics", icon:"📈", label:"Analytics" },
          ].map(m => (
            <div key={m.id} onClick={() => setTab(m.id)} className={`admin-menu-item ${tab === m.id ? "active" : ""}`}>
              <span>{m.icon}</span>{m.label}
            </div>
          ))}
        </div>
        <div className="py-12 border-t border-dark mt-8">
          <div onClick={() => go("home")} className="admin-menu-item">🛒 View Store</div>
          <div onClick={() => { logout(); go("home"); }} className="admin-menu-item text-danger">🚪 Logout</div>
        </div>
      </div>

      <div className="admin-content">
        {tab === "dashboard" && (
          <div>
            <div className="mb-32">
              <div className="text-2xl font-black">Dashboard</div>
              <div className="text-sm text-gray mt-3">Welcome back, Admin 👑</div>
            </div>
            <div className="grid grid-cols-4 gap-16 mb-32">
              {kpi("👗", products.length, "Total Products", `${CATS.length-1} categories`)}
              {kpi("📦", totalStock.toLocaleString(), "Total Stock", "Units in inventory")}
              {kpi("💰", "₹" + (totalValuation/100000).toFixed(1) + "L", "Inventory Value", `₹${totalValuation.toLocaleString()}`)}
              {kpi("⚠️", lowStock, "Low Stock Items", "≤ 10 units remaining", lowStock > 0 ? "#cc0022" : "#2d7a2d")}
            </div>

            <div className="admin-table-container">
              <div className="text-base font-extrabold mb-20">Category Breakdown</div>
              <table className="admin-table">
                <thead>
                  <tr>{["Category","Products","Total Stock","Value","Share"].map(h => <th key={h}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {catBreakdown.map(c => (
                    <tr key={c.name}>
                      <td className="font-semibold">{catIcon(c.name)} {c.name}</td>
                      <td>{c.count}</td>
                      <td>{c.stock}</td>
                      <td className="font-bold">₹{c.val.toLocaleString()}</td>
                      <td>
                        <div className="flex items-center gap-8">
                          <div className="progress-bar-bg">
                            <div className="progress-bar-fill" style={{ width:`${(c.val/maxCatVal)*100}%` }} />
                          </div>
                          <span className="text-xs font-bold text-gray">{Math.round((c.val/totalValuation)*100)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {lowStock > 0 && (
              <div className="admin-alert mt-20">
                <div className="text-sm font-black text-danger mb-12">⚠️ Low Stock Alerts</div>
                <div className="flex flex-wrap gap-10">
                  {products.filter(p=>p.stock<=10).map(p => (
                    <div key={p.id} className="bg-white border border-danger-light rounded p-8-14 text-xs">
                      <span className="font-bold">{p.name}</span>
                      <span className="text-danger font-black ml-8">{p.stock} left</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-28">
              <div>
                <div className="text-2xl font-black">Products</div>
                <div className="text-sm text-gray mt-3">Manage your product catalogue</div>
              </div>
              <Button variant="primary" onClick={() => setAddModal(true)}>+ Add Product</Button>
            </div>
            <div className="flex gap-12 mb-20 items-center flex-wrap">
              <div className="search-bar-admin">
                <span className="text-gray">🔍</span>
                <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="Search..." className="search-input-admin" />
              </div>
              <select value={filterCat} onChange={e=>setFilterCat(e.target.value)} className="admin-select">
                {CATS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="admin-table-container p-0">
              <table className="admin-table">
                <thead>
                  <tr>{["Product","Category","Brand","Price","Stock","Status","Actions"].map(h=><th key={h}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <tr key={p.id}>
                      <td>
                        <div className="flex items-center gap-10">
                          <img src={p.image} alt={p.name} className="admin-thumb" />
                          <div><div className="font-semibold">{p.name}</div><div className="text-xs text-gray mt-2">{p.id}</div></div>
                        </div>
                      </td>
                      <td className="text-sm text-gray">{p.category}</td>
                      <td className="text-sm text-gray">{p.brand}</td>
                      <td className="font-bold">₹{p.price.toLocaleString()}</td>
                      <td><span className="stock-badge" style={{ background: stockBg(p.stock), color: stockColor(p.stock) }}>{p.stock}</span></td>
                      <td>
                        <div className="flex gap-5 flex-wrap">
                          {p.isNew && <span className="badge-new">NEW</span>}
                          {p.trending && <span className="badge-hot">HOT</span>}
                        </div>
                      </td>
                      <td>
                        <div className="flex gap-6">
                          <Button variant="ghost" onClick={() => setEditItem({...p})}>✏️</Button>
                          <Button variant="danger" onClick={() => { if(window.confirm("Delete?")) deleteProduct(p.id); }}>🗑</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "inventory" && (
          <div>
            <div className="mb-28">
              <div className="text-2xl font-black">Inventory</div>
              <div className="text-sm text-gray mt-3">Stock management</div>
            </div>
            <div className="admin-table-container p-0">
              <table className="admin-table">
                <thead>
                  <tr>{["Product","Stock Qty","Stock Value","Adjust Stock"].map(h=><th key={h}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td><div className="flex items-center gap-10"><img src={p.image} alt={p.name} className="admin-thumb-sm" /><span className="font-semibold">{p.name}</span></div></td>
                      <td><span className="stock-badge-large" style={{ background:stockBg(p.stock), color:stockColor(p.stock) }}>{p.stock}</span></td>
                      <td className="font-bold">₹{(p.price*p.stock).toLocaleString()}</td>
                      <td>
                        <div className="flex items-center gap-6">
                          <Button variant="ghost" className="btn-qty" onClick={() => updateProduct(p.id, { stock: Math.max(0, p.stock - 1) })}>−</Button>
                          <input type="number" value={p.stock} onChange={e => updateProduct(p.id, { stock: Math.max(0, parseInt(e.target.value)||0) })} className="input-qty" />
                          <Button variant="ghost" className="btn-qty" onClick={() => updateProduct(p.id, { stock: p.stock + 1 })}>+</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "analytics" && (
          <div>
            <div className="mb-28">
              <div className="text-2xl font-black">Analytics</div>
              <div className="text-sm text-gray mt-3">Store data overview</div>
            </div>
            <div className="analytics-card">
              <div className="text-base font-black mb-22">Stock by Category</div>
              <div className="flex flex-col gap-14">
                {catBreakdown.map(c => (
                  <div key={c.name} className="analytics-bar-row">
                    <span className="w-100 text-xs font-semibold shrink-0">{catIcon(c.name)} {c.name}</span>
                    <div className="analytics-bar-bg">
                      <div className="analytics-bar-fill bg-dark" style={{ width:`${(c.stock/Math.max(...catBreakdown.map(x=>x.stock),1))*100}%` }}>
                        {c.stock > 0 && <span className="text-xs font-bold text-white">{c.stock}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="analytics-card">
              <div className="text-base font-black mb-22">Inventory Value by Category</div>
              <div className="flex flex-col gap-14">
                {catBreakdown.map(c => (
                  <div key={c.name} className="analytics-bar-row">
                    <span className="w-100 text-xs font-semibold shrink-0">{catIcon(c.name)} {c.name}</span>
                    <div className="analytics-bar-bg">
                      <div className="analytics-bar-fill bg-gold" style={{ width:`${(c.val/maxCatVal)*100}%` }}>
                        {c.val > 0 && <span className="text-xs font-bold text-white">₹{(c.val/1000).toFixed(0)}K</span>}
                      </div>
                    </div>
                    <span className="w-72 text-xs font-bold text-right">₹{(c.val/1000).toFixed(1)}K</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="price-dist-grid">
              {[["Under ₹1K",0,1000],["₹1K–2.5K",1000,2500],["₹2.5K–5K",2500,5000],["₹5K+",5000,Infinity]].map(([label,lo,hi])=>(
                <div key={label as string} className="price-dist-card">
                  <div className="text-2xl font-black mb-4">{products.filter(p=>p.price>=(lo as number)&&p.price<(hi as number)).length}</div>
                  <div className="text-xs font-bold text-gray uppercase tracking-wider">{label as string}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {editItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="text-xl font-black mb-24">Edit Product</div>
            {(["name", "price", "originalPrice", "stock"] as const).map(k => (
              <div key={k} className="form-group">
                <label className="form-label">{k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                <input type={k === "name" ? "text" : "number"} value={editItem[k]} onChange={e => setEditItem({ ...editItem, [k]: k === "name" ? e.target.value : Number(e.target.value) })} className="form-input" />
              </div>
            ))}
            <div className="flex gap-10 mt-24">
              <Button variant="primary" className="flex-1 p-13" onClick={() => { updateProduct(editItem.id, editItem); setEditItem(null); }}>Save</Button>
              <Button variant="outline" className="p-13-20" onClick={() => setEditItem(null)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
      {addModal && <AddProductModal onAdd={p => { addProduct(p); setAddModal(false); }} onClose={() => setAddModal(false)} />}
    </div>
  );
};
