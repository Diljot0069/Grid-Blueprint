import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect, useRef } from "react";

export default function Model3D({ plan }){
  const mountRef = useRef();

  useEffect(()=>{
    const mount = mountRef.current;
    mount.innerHTML = "";

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    const camera = new THREE.PerspectiveCamera(75, 800/500, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias:true });
    renderer.setSize(800,500);
    mount.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff,1);
    light.position.set(5,10,7);
    scene.add(light);

    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0,5,10);

    let x = -4;

    const addRoom = (color)=>{
      const geo = new THREE.BoxGeometry(2,1,2);
      const mat = new THREE.MeshStandardMaterial({ color });
      const cube = new THREE.Mesh(geo,mat);
      cube.position.set(x,0,0);
      scene.add(cube);
      x += 3;
    };

    addRoom(0x0ea5e9); // Hall

    for(let i=0;i<plan.bedrooms;i++)
      addRoom(0x22c55e);

    for(let i=0;i<plan.washrooms;i++)
      addRoom(0xef4444);

    if(plan.kitchen) addRoom(0xf59e0b);
    if(plan.store) addRoom(0xa855f7);

    const animate = ()=>{
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene,camera);
    };
    animate();

  },[plan]);

  return (
    <div
      ref={mountRef}
      className="border border-slate-700 rounded w-[800px] h-[500px]"
    />
  );
}