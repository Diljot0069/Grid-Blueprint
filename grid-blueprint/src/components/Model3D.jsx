import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect, useRef, useState } from "react";

export default function Model3D() {
  const mountRef = useRef();

  const [rooms, setRooms] = useState([]);
  const [selectedType, setSelectedType] = useState("Hall");
  const [floor, setFloor] = useState(0);
  const [draggingIndex, setDraggingIndex] = useState(null);

  const sceneRef = useRef();
  const cameraRef = useRef();
  const rendererRef = useRef();
  const planeRef = useRef();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  const COLORS = {
    Hall: 0x38bdf8,
    Bedroom: 0x22c55e,
    Kitchen: 0xf59e0b,
    Washroom: 0xef4444
  };

  
  useEffect(() => {
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1324);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(15, 20, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 20, 10);
    scene.add(light);

    const grid = new THREE.GridHelper(100, 100);
    scene.add(grid);

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    planeRef.current = plane;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => renderer.dispose();
  }, []);

  // POINTER EVENTS (FIXED CLEAN)
  useEffect(() => {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const plane = planeRef.current;

    if (!renderer) return;

    const getMouse = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onPointerDown = (e) => {
      getMouse(e);
      raycaster.current.setFromCamera(mouse.current, camera);

      const intersects = raycaster.current.intersectObjects(scene.children, true);

      // DRAG EXISTING
      const found = intersects.find(obj => obj.object.userData.index !== undefined);
      if (found) {
        setDraggingIndex(found.object.userData.index);
        return;
      }

      // PLACE NEW
      const hit = raycaster.current.intersectObject(plane);
      if (hit.length > 0) {
        const p = hit[0].point;

        const x = Math.round(p.x / 2) * 2;
        const z = Math.round(p.z / 2) * 2;

        setRooms(prev => [
          ...prev,
          { x, z, floor, type: selectedType }
        ]);
      }
    };

    const onPointerMove = (e) => {
      if (draggingIndex === null) return;

      getMouse(e);
      raycaster.current.setFromCamera(mouse.current, camera);

      const hit = raycaster.current.intersectObject(plane);

      if (hit.length > 0) {
        const p = hit[0].point;

        const x = Math.round(p.x / 2) * 2;
        const z = Math.round(p.z / 2) * 2;

        setRooms(prev =>
          prev.map((r, i) =>
            i === draggingIndex ? { ...r, x, z } : r
          )
        );
      }
    };

    const onPointerUp = () => setDraggingIndex(null);

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", onPointerUp);

    return () => {
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
    };
  }, [draggingIndex, selectedType, floor]);

  // DRAW
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    scene.children = scene.children.filter(obj => !obj.userData.isRoom);

    rooms.forEach((room, index) => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(2, 1, 2),
        new THREE.MeshStandardMaterial({
          color: COLORS[room.type]
        })
      );

      mesh.position.set(room.x, room.floor * 4, room.z);
      mesh.userData = { index, isRoom: true };

      scene.add(mesh);
    });
  }, [rooms]);

  return (
    <>
      {/* UI */}
      <div className="fixed top-24 left-8 z-50 w-72 
        bg-gradient-to-br from-slate-900 to-slate-800
        border border-slate-700 rounded-2xl 
        shadow-2xl p-6 text-white">

        <h2 className="text-xl font-semibold text-cyan-400 mb-5">
            Room Designer
        </h2>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {["Hall","Bedroom","Kitchen","Washroom"].map(r => (
            <button
              key={r}
              onClick={() => setSelectedType(r)}
              className={`py-3 rounded-xl text-sm font-medium transition-all
                ${
                  selectedType === r
                    ? "bg-cyan-500 text-black"
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <p>Floor: {floor}</p>
          <div className="flex gap-2 mt-2">
            <button onClick={() => setFloor(floor + 1)} className="bg-green-500 px-3 py-1 rounded">+</button>
            <button onClick={() => setFloor(Math.max(0, floor - 1))} className="bg-red-500 px-3 py-1 rounded">-</button>
          </div>
        </div>

        <button
          onClick={() => setRooms([])}
          className="w-full py-3 rounded-xl bg-red-600"
        >
          Clear
        </button>
      </div>

      <div ref={mountRef} className="w-screen h-screen" />
    </>
  );
}