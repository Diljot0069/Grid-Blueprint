import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden pt-20">

      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:40px_40px] opacity-10"></div>

      {/* Glow Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent blur-3xl pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-20">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="px-5 py-2 rounded-full
                       bg-cyan-500/10 border border-cyan-400
                       text-cyan-300 text-sm font-medium
                       shadow-[0_0_12px_rgba(34,211,238,0.6)]
                       backdrop-blur-md"
          >
            ⚡ AI-Powered Architecture
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mt-8 leading-tight tracking-tight"
        >
          <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
            Generate Intelligent
          </span>

          <br />

          <span
            className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500
                       bg-clip-text text-transparent
                       drop-shadow-[0_0_12px_rgba(34,211,238,0.9)]
                       drop-shadow-[0_0_28px_rgba(14,165,233,0.6)]"
          >
            House Designs
          </span>

          <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
            {" "}in Seconds
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 max-w-2xl mt-6 text-lg"
        >
          Input your requirements and let our smart architecture system
          instantly generate optimized 2D floor plans and interactive 3D models.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-6 mt-10"
        >
          <Link
            to="/create"
            className="px-10 py-4 rounded-lg font-semibold
                       bg-gradient-to-r from-cyan-400 to-blue-500
                       text-slate-900
                       shadow-[0_0_20px_rgba(34,211,238,0.7)]
                       hover:shadow-[0_0_35px_rgba(34,211,238,1)]
                       hover:scale-105
                       transition duration-300"
          >
            Generate Blueprint →
          </Link>

          <Link
            to="/plans"
            className="px-10 py-4 rounded-lg
                       border border-slate-600
                       hover:border-cyan-400
                       hover:bg-cyan-400/5
                       transition duration-300"
          >
            View Gallery
          </Link>
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="relative z-10 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6 pb-24">

        <FeatureCard
          title="Smart 2D Layouts"
          desc="AI-optimized floor plans ensuring perfect room adjacency and area utilization."
        />

        <FeatureCard
          title="Interactive 3D Models"
          desc="Instantly visualize your blueprint in 3D. Rotate, zoom, and explore every angle."
        />

        <FeatureCard
          title="Export & Share"
          desc="Download your designs as high-res images or detailed architectural PDFs."
        />
      </section>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-slate-900/70 backdrop-blur-md border border-slate-800 p-8 rounded-xl transition hover:border-cyan-400"
    >
      <h3 className="text-xl font-semibold mb-4 text-cyan-400">{title}</h3>
      <p className="text-slate-400">{desc}</p>
    </motion.div>
  );
}