import { useEffect, useState } from "react";
import { getPlans, deletePlan } from "../utils/localStorage";
import PlanCard from "../components/PlanCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PlansDashboard(){
  const [plans,setPlans] = useState([]);

  useEffect(()=>{
    setPlans(getPlans());
  },[]);

  const handleDelete = (id)=>{
    if(confirm("Delete this plan?")){
      deletePlan(id);
      setPlans(getPlans());
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6">

      {/* Page Container */}
      <div className="max-w-7xl mx-auto">

        {/* Page Title */}
        <motion.h1
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          className="text-3xl md:text-4xl font-bold text-cyan-400 mb-12 text-center"
        >
          Your Saved House Plans
        </motion.h1>

        {/* Empty State */}
        {plans.length === 0 && (
          <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            className="text-center py-24 bg-slate-900/50 border border-slate-800 rounded-2xl"
          >
            <p className="text-slate-400 mb-6">No plans created yet</p>
            <Link to="/create" className="btn">
              Create Your First Plan
            </Link>
          </motion.div>
        )}

        {/* Plans Grid */}
        {plans.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map(p=>(
              <motion.div
                key={p.id}
                initial={{opacity:0, y:30}}
                animate={{opacity:1, y:0}}
                transition={{duration:0.3}}
              >
                <PlanCard plan={p} onDelete={handleDelete}/>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}