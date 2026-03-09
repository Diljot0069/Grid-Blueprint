import { useEffect, useRef } from "react";

export default function FloorCanvas({ plan }){
  const ref = useRef();

  useEffect(()=>{
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,800,500);

    // Background
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0,0,800,500);

    let x = 50;
    let y = 60;

    const drawRoom = (label,w,h,color)=>{
      ctx.fillStyle = color;
      ctx.fillRect(x,y,w,h);
      ctx.fillStyle = "white";
      ctx.fillText(label, x+10, y+20);
      x += w + 20;
    };

    drawRoom("Hall",120,80,"#0ea5e9");

    for(let i=0;i<plan.bedrooms;i++)
      drawRoom("Bedroom",90,70,"#22c55e");

    for(let i=0;i<plan.washrooms;i++)
      drawRoom("Washroom",70,60,"#ef4444");

    if(plan.kitchen) drawRoom("Kitchen",90,70,"#f59e0b");
    if(plan.store) drawRoom("Store",70,60,"#a855f7");

  },[plan]);

  return (
    <canvas
      ref={ref}
      width={800}
      height={500}
      className="border border-slate-700 rounded"
    />
  );
}