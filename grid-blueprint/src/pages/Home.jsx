import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden pt-20">

      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:40px_40px] opacity-10"></div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-20">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-400 text-cyan-400 text-sm">
            ⚡ AI-Powered Architecture
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mt-8 leading-tight"
        >
          Generate Intelligent <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            House Designs
          </span>{" "}
          in Seconds
        </motion.h1>

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
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 rounded-lg font-semibold transition shadow-lg shadow-cyan-500/30"
          >
            Generate Blueprint →
          </Link>

          <Link
            to="/plans"
            className="px-8 py-3 border border-slate-600 hover:border-cyan-400 rounded-lg transition"
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