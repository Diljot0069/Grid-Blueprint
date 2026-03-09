import { Link } from "react-router-dom";

export default function PlanCard({plan,onDelete}){
  return (
    <div className="bg-slate-800 p-4 rounded hover:-translate-y-1 transition">
      <h3 className="text-cyan-400 font-bold">Area: {plan.area}</h3>
      <p>Floors: {plan.floors}</p>
      <p>Bedrooms: {plan.bedrooms}</p>
      <p>Washrooms: {plan.washrooms}</p>
      <div className="flex gap-2 mt-3">
        <Link to={`/preview2d/${plan.id}`} className="btn">2D</Link>
        <Link to={`/preview3d/${plan.id}`} className="btn">3D</Link>
        <Link to={`/create?edit=${plan.id}`} className="btn">Edit</Link>
        <button onClick={()=>onDelete(plan.id)} className="btn bg-red-500">Delete</button>
      </div>
    </div>
  );
}