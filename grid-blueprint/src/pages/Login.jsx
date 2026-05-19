import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { msg: text || "Login failed" };
      }

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("gb_user", JSON.stringify({ email }));
        nav("/");
      } else {
        setError(data.msg || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5001/api/auth/google";
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

            {/* Email */}
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

            {/* Password */}
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

            {/* Normal Login */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 font-semibold text-slate-900 transition shadow-lg shadow-cyan-500/30"
            >
              Login
            </button>

            {/* Divider */}
            <div className="text-center text-slate-500 text-sm">or</div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition shadow-lg flex items-center justify-center gap-2"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 533.5 544.3"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block"
              >
                <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.4H272v95.2h146.9c-6.4 34.2-25.5 63.2-54.4 82.6v68.6h87.8c51.3-47.2 80.2-116.8 80.2-196.0z" />
                <path fill="#34A853" d="M272 544.3c73.7 0 135.6-24.5 180.8-66.6l-87.8-68.6c-24.4 16.4-55.5 26.0-93 26.0-71.5 0-132.1-48.3-153.8-113.2H28.5v70.8c45.0 89.0 137.5 151.6 243.5 151.6z" />
                <path fill="#FBBC05" d="M118.2 323.9c-10.6-31.6-10.6-65.7 0-97.3V155.8H28.5c-39.1 76.0-39.1 166.6 0 242.6l89.7-74.5z" />
                <path fill="#EA4335" d="M272 107.7c39.9 0 75.9 13.7 104.2 40.5l78.1-78.1C411.1 24.2 347.6 0 272 0 166.0 0 73.5 62.6 28.5 155.8l89.7 70.8C139.9 156.0 200.5 107.7 272 107.7z" />
              </svg>
              Continue with Google
            </button>

          </form>

          <p className="text-xs text-slate-500 mt-6 text-center">
            
          </p>
        </div>
      </motion.div>
    </div>
  );
}