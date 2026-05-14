import { useState } from "react";
import { useAuth } from "../hooks";
import { Button } from "../components/common/Button";

interface AuthPageProps {
  go: (p: string) => void;
}

export const AuthPage = ({ go }: AuthPageProps) => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!isLogin && !form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (form.password.length < 6) e.password = "Min 6 characters";
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      const res = login(form.email, form.password, form.name);
      setLoading(false);
      go(res.isAdmin ? "admin" : "home");
    }, 1000);
  };

  const field = (key: "name" | "email" | "password", label: string, type="text", placeholder="") => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input type={type} value={form[key]} onChange={e => setForm({...form, [key]:e.target.value})} placeholder={placeholder}
        className={`form-input ${errors[key] ? "error" : ""}`} />
      {errors[key] && <div className="text-xs text-danger mt-5">{errors[key]}</div>}
    </div>
  );

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="text-2xl font-black mb-5">{isLogin ? "Welcome back" : "Join DRIP"}</div>
        <div className="text-sm text-gray mb-28">{isLogin ? "Sign in to your account" : "Create an account to start shopping"}</div>
        <div className="auth-info-box">
          <strong>Admin?</strong> Use admin@gmail.com / admin@12345
        </div>
        {!isLogin && field("name","Full Name","text","Your name")}
        {field("email","Email","email","you@email.com")}
        {field("password","Password","password","••••••••")}
        <Button variant="primary" className={`w-full p-14 ${loading ? "opacity-70" : ""}`}
          onClick={submit} disabled={loading}>{loading ? "Please wait…" : isLogin ? "Sign In" : "Create Account"}</Button>
        <div className="text-center mt-18 text-sm text-gray">
          {isLogin ? "No account? " : "Already have one? "}
          <span className="font-bold text-dark cursor-pointer underline"
            onClick={() => { setIsLogin(!isLogin); setErrors({}); }}>
            {isLogin ? "Sign Up" : "Sign In"}
          </span>
        </div>
      </div>
    </div>
  );
};
