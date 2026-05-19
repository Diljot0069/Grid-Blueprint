import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen pt-24 px-6 text-white">
      <div className="max-w-6xl mx-auto">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-cyan-400">Grid-BluePrint</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Grid-BluePrint is a Smart Architecture System UI prototype that
            simulates AI-powered house planning. It helps users design,
            visualize, and manage modern home layouts through interactive
            2D blueprints and immersive 3D previews.
          </p>
        </motion.div>

        {/* FEATURE HIGHLIGHTS */}
        <div className="grid md:grid-cols-3 gap-10 mb-24">
          <Feature
            title="Smart Planning"
            desc="Generate optimized house plans based on your space and room requirements."
          />
          <Feature
            title="Interactive Visualization"
            desc="Explore your designs with mock 2D floor layouts and interactive 3D models."
          />
          <Feature
            title="Plan Management"
            desc="Create, edit, organize, and preview multiple house plans with ease."
          />
        </div>

        {/* TECH STACK */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-2xl font-semibold text-center mb-10">
            Built With Modern Technologies
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Tech name="React.js" />
            <Tech name="Vite" />
            <Tech name="Tailwind CSS" />
            <Tech name="Framer Motion" />
            <Tech name="Three.js" />
            <Tech name="HTML Canvas" />
            <Tech name="LocalStorage" />
            <Tech name="React Router" />
          </div>
        </motion.div>

        {/* PROJECT VISION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900/60 border border-slate-800 rounded-2xl p-10 text-center mb-24"
        >
          <h3 className="text-2xl font-semibold mb-4">Project Vision</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">
            This project demonstrates how intelligent architectural tools
            can simplify home design. It focuses on clean UI, intuitive
            workflows, and immersive previews — forming the foundation for
            future AI-driven planning systems.
          </p>

          <div className="mt-8 text-cyan-400 font-semibold">
            Built for academic presentation & portfolio showcase
          </div>
        </motion.div>

        {/* TEAM SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Meet the <span className="text-cyan-400">Project Team</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <MemberCard
              name="Abhay Pratap Singh"
              roll="2410990972"
              role="Frontend Developer"
              desc="Focused on crafting responsive UI components and enhancing user experience across the platform."
              linkedin="https://www.linkedin.com/in/diljot-singh-294bba338/overlay/contact-info/"
              leetcode="https://leetcode.com/u/Diljotsingh_0069/"
            />

            <MemberCard
              name="Bidhanshu Thakur"
              roll="2410991013"
              role="UI/UX Designer"
              desc="Designed intuitive layouts and visual systems to ensure a clean and engaging interface."
              linkedin="https://www.linkedin.com/in/diljot-singh-294bba338/overlay/contact-info/"
              leetcode="https://leetcode.com/u/Diljotsingh_0069/"
            />

            <MemberCard
              name="Chetanya Bhardwaj"
              roll="2410991020"
              role="Logic & Integration Engineer"
              desc="Worked on application logic, data handling, and feature integration across modules."
              linkedin="https://www.linkedin.com/in/diljot-singh-294bba338/overlay/contact-info/"
              leetcode="https://leetcode.com/u/Diljotsingh_0069/"
            />

            <MemberCard
              name="Diljot Singh"
              roll="2410991039"
              role="Project Lead"
              desc="Led architecture, feature planning, UI system design, and overall development strategy for Grid-BluePrint."
              linkedin="https://www.linkedin.com/in/diljot-singh-294bba338/overlay/contact-info/"
              leetcode="https://leetcode.com/u/Diljotsingh_0069/"
              highlight
            />

          </div>
        </motion.div>

      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function Feature({ title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-slate-900/60 border border-slate-800 p-8 rounded-xl
                 backdrop-blur-md hover:border-cyan-400 transition"
    >
      <h3 className="text-xl font-semibold mb-4 text-cyan-400">{title}</h3>
      <p className="text-slate-400">{desc}</p>
    </motion.div>
  );
}

function Tech({ name }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 text-center hover:border-cyan-400 transition">
      {name}
    </div>
  );
}

function MemberCard({ name, roll, role, desc, linkedin, leetcode, highlight }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`rounded-xl p-6 border backdrop-blur-md transition
        ${highlight
          ? "bg-cyan-500/10 border-cyan-400 shadow-lg shadow-cyan-500/20"
          : "bg-slate-900/60 border-slate-800 hover:border-cyan-400"}`}
    >
      <h3 className="text-lg font-semibold text-cyan-400">{name}</h3>
      <p className="text-sm text-slate-400 mb-1">Roll No: {roll}</p>
      <p className="text-sm font-medium mb-3">{role}</p>
      <p className="text-slate-400 text-sm mb-5">{desc}</p>

      <div className="flex gap-3">
        <a
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1 rounded-md border border-slate-600 hover:border-cyan-400 hover:bg-cyan-400/10 text-xs transition"
        >
          LinkedIn
        </a>
        <a
          href={leetcode}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1 rounded-md border border-slate-600 hover:border-yellow-400 hover:bg-yellow-400/10 text-xs transition"
        >
          LeetCode
        </a>
      </div>
    </motion.div>
  );
}