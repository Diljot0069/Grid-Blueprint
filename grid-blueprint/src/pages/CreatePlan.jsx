import { useState, useEffect } from "react";
import { addPlan, updatePlan, getPlans } from "../utils/localStorage";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function CreatePlan(){
  const nav = useNavigate();
  const [params] = useSearchParams();
  const editId = params.get("edit");

  const [step,setStep] = useState(1);

  const [form,setForm] = useState({
    area:"", floors:1, rooms:1,
    bedrooms:1, washrooms:1,
    kitchen:true, hall:true, store:false
  });

  useEffect(()=>{
    if(editId){
      const plan = getPlans().find(p=>p.id===editId);
      if(plan) setForm(plan);
    }
  },[editId]);

  const next = ()=> setStep(s=>Math.min(s+1,3));
  const back = ()=> setStep(s=>Math.max(s-1,1));

  const submit = ()=>{
    if(!form.area) return alert("Area required");

    const data = {
      ...form,
      id: editId || crypto.randomUUID(),
      createdAt: new Date()
    };

    editId ? updatePlan(editId,data) : addPlan(data);
    nav("/plans");
  };

  return (
    <div className="min-h-screen px-6 py-12 pt-24"> {/* 🔥 FIXED TOP SPACE */}

      {/* Page Title */}
      <motion.h1
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        className="text-3xl md:text-4xl font-bold text-cyan-400 text-center mb-12"
      >
        {editId ? "Edit House Plan" : "Create Smart House Plan"}
      </motion.h1>

      {/* Layout */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">

        {/* Form Card */}
        <motion.div
          layout
          className="bg-slate-900/70 border border-slate-800 backdrop-blur-xl rounded-2xl p-8 shadow-xl"
        >
          {/* Progress */}
          <div className="flex items-center gap-3 mb-10">
            {[1,2,3].map(i=>(
              <div key={i}
                className={`h-2 flex-1 rounded-full transition-all duration-300
                ${i<=step 
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 shadow-md shadow-cyan-500/30" 
                  : "bg-slate-700"}`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">

            {step===1 && (
              <Step key="s1" title="Basic Details">
                <Input label="Total Area (sq ft)"
                  value={form.area}
                  onChange={v=>setForm({...form,area:v})}
                />
                <Input type="number" label="Number of Floors"
                  value={form.floors}
                  onChange={v=>setForm({...form,floors:+v})}
                />
                <Input type="number" label="Total Rooms"
                  value={form.rooms}
                  onChange={v=>setForm({...form,rooms:+v})}
                />
              </Step>
            )}

            {step===2 && (
              <Step key="s2" title="Room Configuration">
                <Input type="number" label="Bedrooms"
                  value={form.bedrooms}
                  onChange={v=>setForm({...form,bedrooms:+v})}
                />
                <Input type="number" label="Washrooms"
                  value={form.washrooms}
                  onChange={v=>setForm({...form,washrooms:+v})}
                />
              </Step>
            )}

            {step===3 && (
              <Step key="s3" title="Extra Spaces">
                <Toggle label="Kitchen"
                  checked={form.kitchen}
                  onChange={v=>setForm({...form,kitchen:v})}
                />
                <Toggle label="Hall"
                  checked={form.hall}
                  onChange={v=>setForm({...form,hall:v})}
                />
                <Toggle label="Store Room"
                  checked={form.store}
                  onChange={v=>setForm({...form,store:v})}
                />
              </Step>
            )}

          </AnimatePresence>

          {/* Buttons */}
          <div className="flex justify-between mt-10">
            {step>1
              ? <button onClick={back} className="px-4 py-2 rounded border border-slate-600 hover:bg-white/5 transition">Back</button>
              : <div/>
            }

            {step<3
              ? <button onClick={next} className="btn">Next</button>
              : <button onClick={submit} className="btn">Save Plan</button>
            }
          </div>
        </motion.div>

        {/* Live Summary Panel */}
        <motion.div
          initial={{opacity:0,x:40}}
          animate={{opacity:1,x:0}}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-xl sticky top-28"
        >
          <h3 className="text-xl font-semibold mb-8 text-cyan-300">
            Live Plan Summary
          </h3>

          <Summary label="Area" value={`${form.area || 0} sq ft`} />
          <Summary label="Floors" value={form.floors} />
          <Summary label="Rooms" value={form.rooms} />
          <Summary label="Bedrooms" value={form.bedrooms} />
          <Summary label="Washrooms" value={form.washrooms} />
          <Summary label="Kitchen" value={form.kitchen ? "Yes" : "No"} />
          <Summary label="Hall" value={form.hall ? "Yes" : "No"} />
          <Summary label="Store" value={form.store ? "Yes" : "No"} />
        </motion.div>

      </div>
    </div>
  );
}

/* ---------- UI Components ---------- */

function Step({title,children}){
  return (
    <motion.div
      initial={{opacity:0,x:40}}
      animate={{opacity:1,x:0}}
      exit={{opacity:0,x:-40}}
      transition={{duration:0.3}}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </motion.div>
  );
}

function Input({label,type="text",value,onChange}){
  return (
    <div>
      <label className="text-sm text-slate-400">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e=>onChange(e.target.value)}
        className="input mt-2"
      />
    </div>
  );
}

function Toggle({label,checked,onChange}){
  return (
    <div className="flex items-center justify-between py-2">
      <span>{label}</span>
      <button
        onClick={()=>onChange(!checked)}
        className={`w-12 h-6 rounded-full p-1 transition
        ${checked ? "bg-cyan-500" : "bg-slate-600"}`}
      >
        <div className={`bg-white w-4 h-4 rounded-full transition
          ${checked ? "translate-x-6" : ""}`}/>
      </button>
    </div>
  );
}

function Summary({label,value}){
  return (
    <div className="flex justify-between py-3 border-b border-slate-800">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}