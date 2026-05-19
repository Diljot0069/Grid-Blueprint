import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PlanCard({ plan, onDelete }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-slate-900/70 border border-slate-800 rounded-xl p-6
                 backdrop-blur-md shadow-lg hover:shadow-cyan-500/10
                 transition-all duration-300"
    >
      {/* Title */}
      <h3 className="text-cyan-400 font-bold text-lg mb-4">
        Area: <span className="text-white">{plan.area} sq ft</span>
      </h3>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-y-2 text-sm mb-5">
        <Info label="Floors" value={plan.floors} />
        <Info label="Rooms" value={plan.rooms} />
        <Info label="Bedrooms" value={plan.bedrooms} />
        <Info label="Washrooms" value={plan.washrooms} />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        <Link to={`/preview2d/${plan.id}`} className="btn-secondary">
          2D Preview
        </Link>

        <Link to={`/preview3d/${plan.id}`} className="btn-secondary">
          3D View
        </Link>

        <Link to={`/create?edit=${plan.id}`} className="btn-secondary">
          Edit
        </Link>

        <button
          onClick={() => onDelete(plan.id)}
          className="btn-danger"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}



function Info({ label, value }) {
  return (
    <>
      <span className="text-slate-400">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </>
  );
}