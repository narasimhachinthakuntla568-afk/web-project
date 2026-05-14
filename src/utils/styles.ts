import type { CSSProperties } from "react";

export const btn: Record<string, CSSProperties> = {
  primary: { background: "#111", color: "#fff", border: "none", padding: "11px 24px", fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", cursor: "pointer", borderRadius: "2px", textTransform: "uppercase" },
  outline: { background: "transparent", color: "#111", border: "2px solid #111", padding: "9px 20px", fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", cursor: "pointer", borderRadius: "2px", textTransform: "uppercase" },
  light: { background: "transparent", color: "#fff", border: "2px solid #fff", padding: "11px 24px", fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", cursor: "pointer", borderRadius: "2px", textTransform: "uppercase" },
  danger: { background: "#cc0022", color: "#fff", border: "none", padding: "7px 14px", fontSize: "11px", fontWeight: 700, cursor: "pointer", borderRadius: "2px", textTransform: "uppercase" },
  success: { background: "#2d7a2d", color: "#fff", border: "none", padding: "7px 14px", fontSize: "11px", fontWeight: 700, cursor: "pointer", borderRadius: "2px", textTransform: "uppercase" },
  ghost: { background: "#f5f5f5", color: "#111", border: "none", padding: "7px 14px", fontSize: "11px", fontWeight: 700, cursor: "pointer", borderRadius: "2px", textTransform: "uppercase" },
};

export const nav_s: Record<string, CSSProperties> = {
  bar: { background: "#fff", borderBottom: "1px solid #eee", padding: "0 48px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 },
  logo: { fontSize: "22px", fontWeight: 900, letterSpacing: "4px", cursor: "pointer" },
  adminChip: { fontSize: "9px", background: "#c8a96e", color: "#111", padding: "2px 7px", borderRadius: "2px", fontWeight: 800, letterSpacing: "2px", marginLeft: "8px" },
  links: { display: "flex", gap: "32px", listStyle: "none", margin: 0, padding: 0 },
  link: { fontSize: "13px", cursor: "pointer", letterSpacing: "0.5px" },
  right: { display: "flex", gap: "16px", alignItems: "center" },
  ico: { background: "none", border: "none", cursor: "pointer", fontSize: "17px", position: "relative", padding: "4px" },
  badge: { position: "absolute", top: "-4px", right: "-4px", background: "#111", color: "#fff", borderRadius: "50%", width: "15px", height: "15px", fontSize: "9px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 },
};
