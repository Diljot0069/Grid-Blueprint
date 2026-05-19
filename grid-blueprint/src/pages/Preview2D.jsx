import { useParams } from "react-router-dom";
import { getPlans } from "../utils/localStorage";
import FloorCanvas from "../components/FloorCanvas";

export default function Preview2D() {
  const { id } = useParams();
  const plan = getPlans().find(p => p.id === id);

  if (!plan) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-slate-400 text-lg">Plan not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      
      {/* Page Container */}
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-cyan-400 text-center mb-10">
          2D Blueprint Preview
        </h2>

        {/* Preview Board */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl
                        backdrop-blur-md shadow-2xl
                        p-10 flex justify-center">

          <div className="w-full max-w-4xl min-h-[450px]
                          bg-slate-950 border border-slate-800
                          rounded-xl p-8">

            <FloorCanvas plan={plan} />

          </div>
        </div>

      </div>
    </div>
  );
}