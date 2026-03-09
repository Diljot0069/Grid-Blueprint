import { useParams } from "react-router-dom";
import { getPlans } from "../utils/localStorage";
import FloorCanvas from "../components/FloorCanvas";

export default function Preview2D(){
  const { id } = useParams();
  const plan = getPlans().find(p => p.id === id);

  if(!plan) return <div className="p-10">Plan not found</div>;

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        2D Blueprint Preview
      </h2>
      <FloorCanvas plan={plan}/>
    </div>
  );
}