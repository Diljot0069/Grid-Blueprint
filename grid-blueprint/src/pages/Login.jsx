import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    localStorage.setItem("gb_user", JSON.stringify({ email }));
    nav("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 px-6 relative">

      {/* Glow */}
      <div className="absolute w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">

          <h2 className="text-3xl font-bold text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-slate-400 text-center mb-8">
            Login to continue designing
          </p>

          {error && (
            <div className="mb-4 text-red-400 text-sm text-center">{error}</div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="text-sm text-slate-400">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-400 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-400 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-3 text-xs text-cyan-400"
                >
                  {show ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 font-semibold text-slate-900 transition shadow-lg shadow-cyan-500/30"
            >
              Login
            </button>

          </form>

          <p className="text-xs text-slate-500 mt-6 text-center">
            Demo login — any email & password works
          </p>
        </div>
      </motion.div>
    </div>
  );
}