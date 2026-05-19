import { useEffect, useState } from "react";

export default function FloorCanvas({ plan }) {
  const [rooms, setRooms] = useState([]);
  const [active, setActive] = useState(null);

  // -------- AUTO LAYOUT --------
  useEffect(() => {
    if (!plan) return;

    const generated = [];

    // MAIN HALL
    generated.push({
      id: "hall",
      name: "Hall",
      x: 200,
      y: 120,
      w: 220,
      h: 140
    });

    
    for (let i = 0; i < plan.bedrooms; i++) {
      generated.push({
        id: "bed" + i,
        name: `Bedroom ${i + 1}`,
        x: 60 + i * 150,
        y: 20,
        w: 130,
        h: 100
      });
    }

    // KITCHEN
    if (plan.kitchen) {
      generated.push({
        id: "kitchen",
        name: "Kitchen",
        x: 60,
        y: 300,
        w: 150,
        h: 110
      });
    }

    // BATHROOMS
    for (let i = 0; i < plan.washrooms; i++) {
      generated.push({
        id: "bath" + i,
        name: `Bath ${i + 1}`,
        x: 260 + i * 130,
        y: 300,
        w: 110,
        h: 90
      });
    }

    setRooms(generated);
  }, [plan]);

  // -------- DRAG --------
  const startDrag = (e, index) => {
    const startX = e.clientX;
    const startY = e.clientY;

    const room = rooms[index];

    const move = (eMove) => {
      const dx = eMove.clientX - startX;
      const dy = eMove.clientY - startY;

      const updated = [...rooms];
      updated[index] = {
        ...room,
        x: Math.round((room.x + dx) / 10) * 10,
        y: Math.round((room.y + dy) / 10) * 10
      };

      setRooms(updated);
    };

    const stop = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
  };

  // -------- RESIZE --------
  const startResize = (e, index) => {
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const room = rooms[index];

    const move = (eMove) => {
      const dx = eMove.clientX - startX;
      const dy = eMove.clientY - startY;

      const updated = [...rooms];
      updated[index] = {
        ...room,
        w: Math.max(80, room.w + dx),
        h: Math.max(60, room.h + dy)
      };

      setRooms(updated);
    };

    const stop = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
  };

  return (
    <div className="relative w-full h-[500px] bg-[#020617] rounded-lg overflow-hidden">

      {/* GRID */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      />

      {/* ROOMS */}
      {rooms.map((r, i) => (
        <div
          key={r.id}
          onMouseDown={(e) => {
            setActive(i);
            startDrag(e, i);
          }}
          className={`absolute border-2 cursor-move transition ${
            active === i
              ? "border-cyan-400 bg-cyan-500/10 shadow-lg"
              : "border-slate-400 bg-slate-900"
          }`}
          style={{
            left: r.x,
            top: r.y,
            width: r.w,
            height: r.h
          }}
        >
          {/* LABEL */}
          <div className="text-white text-sm text-center mt-2">
            {r.name}
          </div>

          {/* RESIZE HANDLE */}
          <div
            onMouseDown={(e) => startResize(e, i)}
            className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-400 cursor-se-resize"
          />
        </div>
      ))}
    </div>
  );
}