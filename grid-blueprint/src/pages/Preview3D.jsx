import { useParams } from "react-router-dom";
import { getPlans } from "../utils/localStorage";
import Model3D from "../components/Model3D";

export default function Preview3D() {
  const { id } = useParams();
  const plan = getPlans().find(p => p.id === id);

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Plan not found
      </div>
    );
  }

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Model3D plan={plan} />
    </div>
  );
}