import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePlan from "./pages/CreatePlan";
import PlansDashboard from "./pages/PlansDashboard";
import Preview2D from "./pages/Preview2D";
import Preview3D from "./pages/Preview3D";
import Login from "./pages/Login";

export default function App(){
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<CreatePlan/>}/>
        <Route path="/plans" element={<PlansDashboard/>}/>
        <Route path="/preview2d/:id" element={<Preview2D />} />
        <Route path="/preview3d/:id" element={<Preview3D />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}