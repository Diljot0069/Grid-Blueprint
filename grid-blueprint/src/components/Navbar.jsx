import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("gb_user"));
  const plans = JSON.parse(localStorage.getItem("plans")) || [];
  const latestPlan = plans[plans.length - 1];

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const navItem =
    "px-4 py-2 text-slate-300 hover:text-cyan-400 transition relative";

  const active =
    "text-cyan-400 after:absolute after:left-4 after:right-4 after:-bottom-1 after:h-[2px] after:bg-cyan-400";

  const go2D = () => {
    if (latestPlan) navigate(`/preview2d/${latestPlan.id}`);
    else navigate("/plans");
  };

  const go3D = () => {
    if (latestPlan) navigate(`/preview3d/${latestPlan.id}`);
    else navigate("/plans");
  };

  const logout = () => {
    localStorage.removeItem("gb_user");
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg border border-cyan-400 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-cyan-400 rotate-45"></div>
          </div>
          <span className="text-lg font-semibold">
            Grid-<span className="text-cyan-400">BluePrint</span>
          </span>
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/" end className={({ isActive }) => `${navItem} ${isActive ? active : ""}`}>Home</NavLink>
          <NavLink to="/create" className={({ isActive }) => `${navItem} ${isActive ? active : ""}`}>Design Generator</NavLink>

          <button onClick={go2D} className={navItem}>
            2D Blueprint
          </button>

          <button onClick={go3D} className={navItem}>
            3D Viewer
          </button>

          <NavLink to="/about" className={({ isActive }) => `${navItem} ${isActive ? active : ""}`}>About</NavLink>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-6 relative">

          {user ? (
            <>
              <button
                onClick={() => setOpen(!open)}
                className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-slate-900"
              >
                {user.email[0].toUpperCase()}
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-0 top-14 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-xl p-3"
                  >
                    <p className="text-xs text-slate-400 mb-2 truncate">
                      {user.email}
                    </p>
                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-2 rounded hover:bg-slate-800 text-red-400"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <Link to="/login" className="text-slate-300 hover:text-cyan-400 transition">
              Login
            </Link>
          )}

          <Link
            to="/create"
            className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold shadow-lg shadow-cyan-500/30 transition"
          >
            Start Designing
          </Link>
        </div>
      </div>
    </header>
  );
}