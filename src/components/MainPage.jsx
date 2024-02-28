import React, { useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, TransformControls, Environment } from "@react-three/drei";
import { useControls } from "leva";
import { Html } from "@react-three/drei";

function MainPage() {
  const { scene: exc } = useGLTF("/450exc.glb");
  //const { scene: forest } = useGLTF("/showroom2.glb");
  const modelRef = useRef();
  const orbitControlsRef = useRef(); // Ref for OrbitControls

  // Function to handle position change
  const meshPosition = useControls("Position", {
    x: 0,
    y: 0,
    z: 0,
  });

  return (
    <>
      <div style={{ height: "100vh", width: "100vw", background: "linear-gradient(#e66465, #9198e5)" }}>
        <Canvas>
          <Environment
            ground={{
              height: 7,
              radius: 70,
              scale: 10,
            }}
            files={"./dirt-road.hdr"}
          />

          <ambientLight intensity={2} />
          <directionalLight position={[0, 10, 0]} intensity={1} />
          {/* <directionalLight position={[0, -10, 0]} intensity={1} /> */}
          <spotLight position={[5, 10, 5]} angle={0.5} intensity={0} penumbra={1} />
          <pointLight position={[-5, 5, 5]} intensity={0} />
          <pointLight position={[-5, -10, 5]} intensity={0} />
          {/* 
        <group>
          <primitive object={forest} position={[0, 0, 0]} scale={[3, 3, 3]} />
        </group> */}
          <group>
            <primitive object={exc} position-y={0.3} scale={[1, 1, 1]} />
            <Html className="flex  " position={[0.14, 1.21, 0.23]}>
              <button
                className=" opacity-80 hover:opacity-100 text-sm text-slate-200 w-[2.3rem] px-2 py-2 
                 rounded-full bg-slate-500 hover:bg-slate-700 transition ease-in-out duration-300"
                onClick={() => console.log("HTML Button clicked!")}
              >
                1
              </button>
            </Html>
            <Html className="flex  " position={[-0.09, 0.85, -0.61]}>
              <button
                className=" opacity-80 hover:opacity-100 text-sm text-slate-200 w-[2.3rem] px-2 py-2 
                rounded-full bg-slate-500 hover:bg-slate-700 transition ease-in-out duration-300"
                onClick={() => console.log("HTML Button clicked!")}
              >
                2
              </button>
            </Html>
            <Html className="flex  " position={[0.14, 0.5, 0.04]}>
              <button
                className=" opacity-80 hover:opacity-100 text-sm text-slate-200 w-[2.3rem] px-2 py-2 
                rounded-full bg-slate-500 hover:bg-slate-700 transition ease-in-out duration-300"
                onClick={() => console.log("HTML Button clicked!")}
              >
                3
              </button>
            </Html>
            <Html className="flex  " position={[0.1, 0.75, 0.6]}>
              <button
                className=" opacity-80 hover:opacity-100 text-sm text-slate-200 w-[2.3rem] px-2 py-2 
                rounded-full bg-slate-500 hover:bg-slate-700 transition ease-in-out duration-300"
                onClick={() => console.log("HTML Button clicked!")}
              >
                4
              </button>
            </Html>
          </group>
          <OrbitControls ref={orbitControlsRef} />
          <CameraPosition />
        </Canvas>
        <div className="absolute top-0 left-0 w-full h-[100vh] flex p-4 transition ease-in-out duration-500 pointer-events-none">
          <div className="bg-black w-1/5 rounded-2xl opacity-80">
            <h1 className="header text-white text-2xl p-6">KTM 450 EXC</h1>
            <a className="header text-white text-xl p-6">asdasd as d asd ad </a>
          </div>
        </div>
      </div>
    </>
  );
}

function CameraPosition() {
  const { camera } = useThree();

  useEffect(() => {
    if (camera) {
      camera.position.set(0, 1, 2); // Set camera position here
    }
  }, [camera]);

  return null;
}

export default MainPage;
