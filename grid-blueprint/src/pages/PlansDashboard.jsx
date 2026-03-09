import { useEffect, useState } from "react";
import { getPlans, deletePlan } from "../utils/localStorage";
import PlanCard from "../components/PlanCard";

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
    <div className="p-10 grid md:grid-cols-3 gap-6">
      {plans.map(p=>(
        <PlanCard key={p.id} plan={p} onDelete={handleDelete}/>
      ))}
    </div>
  );
}