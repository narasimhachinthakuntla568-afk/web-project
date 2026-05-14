import React, { useState, useCallback } from "react";
import { ToastCtx } from "./index";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null);

  const show = useCallback((m: string) => {
    setMsg(m);
    setTimeout(() => setMsg(null), 3000);
  }, []);

  return (
    <ToastCtx.Provider value={show}>
      {children}
      {msg && (
        <div style={{ position:"fixed", bottom:24, right:24, background:"#111", color:"#fff", padding:"12px 24px",
          borderRadius:4, fontSize:13, fontWeight:700, boxShadow:"0 8px 30px rgba(0,0,0,0.35)", zIndex:9999,
          animation:"slideIn 0.3s ease-out" }}>
          {msg}
        </div>
      )}
      <style>{`
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </ToastCtx.Provider>
  );
}
