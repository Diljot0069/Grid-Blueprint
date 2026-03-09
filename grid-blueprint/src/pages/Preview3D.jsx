import { useParams } from "react-router-dom";
import { getPlans } from "../utils/localStorage";
import Model3D from "../components/Model3D";

export default function Preview3D(){
  const { id } = useParams();
  const plan = getPlans().find(p => p.id === id);

  if(!plan) return <div className="p-10">Plan not found</div>;

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        3D Model Preview
      </h2>
      <Model3D plan={plan}/>
    </div>
  );
}