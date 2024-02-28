import React, { useRef, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import { gsap } from "gsap";
import { Camera, Vector3 } from "three";

function MainPage() {
  const { scene: exc } = useGLTF("/450exc.glb");
  const orbitControlsRef = useRef();
  const cameraRef = useRef();
  const [targetPosition, setTargetPosition] = useState([1, 1, 1]);
  const [specific, setSpecific] = useState([1, 1, 1]);
  const [rotate, setRotate] = useState(true);

  const [zoom, setZoom] = useState(1);
  const transitionDuration = 1;

  const handleZoomInTransition = (target) => {
    setTargetPosition(target);

    if (!rotate) {
      cameraRef.current.position.set(0, 5, 0);
    }
  };
  useEffect(() => {
    const handlePointerMove = (event) => {
      if (event.buttons === 1) {
        // Check if left mouse button is pressed
        console.log("Camera Position:", orbitControlsRef.current.object.position);
      }
    };

    document.addEventListener("pointermove", handlePointerMove);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);
  useEffect(() => {
    if (orbitControlsRef.current) {
      // Use GSAP's lerp function to smoothly transition the camera position and zoom
      gsap.to(orbitControlsRef.current.target, {
        x: targetPosition[0],
        y: targetPosition[1] - 0.5,
        z: targetPosition[2],
        duration: transitionDuration,
      });
      gsap.to(orbitControlsRef.current.object.position, {
        x: targetPosition[0] + specific[0],
        y: targetPosition[1] + specific[1],
        z: targetPosition[2] + specific[2],
        duration: transitionDuration,
      });
      gsap.to(orbitControlsRef.current.object, { duration: transitionDuration });
    }
  }, [targetPosition, zoom]);

  return (
    <div className="h-[100vh] w-[100vw] bg-[#8dff2a] relative z-10">
      <div
        className="opacity-10 absolute top-0 left-0 right-0 bottom-[45rem] text-[30vw] flex justify-center items-center z-0 text-[#000000] pointer-events-none"
        style={{ backgroundColor: "transparent", whiteSpace: "nowrap", overflow: "visible" }}
      >
        KTM 450
      </div>
      <div
        className="opacity-50 absolute top-[40rem] left-0 right-0 bottom-0 text-[60vw] flex justify-center items-center z-0 text-[#ffffff] pointer-events-none"
        style={{ backgroundColor: "transparent", whiteSpace: "nowrap", overflow: "visible" }}
      >
        EXC
      </div>
      <Canvas>
        <OrbitControls ref={orbitControlsRef} autoRotate={rotate} enableRotate={rotate} maxDistance={2} />
        <perspectiveCamera ref={cameraRef} position={[0, 0.5, 5]} />

        <Environment files={"/dirt-road.hdr"} />
        <ambientLight intensity={1} />
        <directionalLight position={[0, 10, 0]} intensity={1} />
        <directionalLight position={[0, -10, 0]} intensity={1} />
        <spotLight position={[5, 10, 5]} angle={0.5} intensity={0} penumbra={1} />
        <pointLight position={[-5, 5, 5]} intensity={0} />
        <pointLight position={[-5, -10, 5]} intensity={0} />

        <group>
          <primitive object={exc} position-y={-0.25} scale={[1, 1, 1]} />
          <Html className="flex" position={[0.0, 0.7, 0.2]}>
            <button
              className="opacity-80 hover:opacity-100 text-sm text-slate-200 w-[2.3rem] px-2 py-2 
                 rounded-full bg-slate-500 hover:bg-slate-700 transition ease-in-out duration-300"
              onClick={() => {
                setSpecific([0.0, 0.3, -0.2]);
                handleZoomInTransition([0.0, 0.7, 0.2]);
                setRotate((prev) => !prev);

                if (!rotate) {
                  setSpecific([0, 0, -4]);
                  handleZoomInTransition([0, 0.5, 0]);
                }
              }}
            >
              1
            </button>
          </Html>
        </group>
      </Canvas>
      <div className="absolute top-0 left-0 w-full h-[100vh] flex p-4 transition ease-in-out duration-500 pointer-events-none">
        <div className="bg-black w-1/5 rounded-2xl opacity-80">
          <h1 className="header text-white text-2xl p-6">KTM 450 EXC</h1>
          <a className="header text-white text-xl p-6">asdasd as d asd ad </a>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
