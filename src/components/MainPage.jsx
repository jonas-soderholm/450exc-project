import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, TransformControls, Environment, Text } from "@react-three/drei";
import { useControls } from "leva";
import { Html } from "@react-three/drei";
import { Vector3 } from "three";

function LockedOrbitControls({ target, rotateEnabled, zoom }) {
  return (
    <OrbitControls
      autoRotate={rotateEnabled}
      autoRotateSpeed={0.5}
      enableRotate={rotateEnabled}
      target={target}
      maxDistance={zoom} // Initial maxDistance
    />
  );
}

function CameraControls({ cameraYpos = 0.5 }, { buttonPosition = [0, 0, 0] }) {
  const { camera } = useThree();
  const targetYPos = useRef(cameraYpos);

  // Update the target Y position when cameraYpos changes
  targetYPos.current = cameraYpos;

  useFrame(() => {
    if (camera) {
      // Smoothly interpolate between the current Y position and the target Y position
      camera.position.y += (targetYPos.current - camera.position.y) * 0.1;
      //camera.lookAt(buttonPosition);
    }
  });

  return null;
}

function MainPage() {
  const { scene: exc } = useGLTF("/450exc.glb");
  //const buttonPosition = [0.0, 0.7, 0.23];
  const [rotateEnabled, setRotateEnabled] = useState(true);
  const [buttonPosition, setButtonPosition] = useState([0.0, 0, 0]);
  const [cameraYpos, setCameraYpos] = useState(0.5);
  const [zoom, setZoom] = useState(2);

  return (
    <>
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
          <CameraControls cameraYpos={cameraYpos} buttonPosition={buttonPosition} />
          <LockedOrbitControls target={buttonPosition} rotateEnabled={rotateEnabled} zoom={zoom} />

          <Environment files={"./dirt-road.hdr"} />

          <ambientLight intensity={1} />
          <directionalLight position={[0, 10, 0]} intensity={1} />
          <directionalLight position={[0, -10, 0]} intensity={1} />
          <spotLight position={[5, 10, 5]} angle={0.5} intensity={0} penumbra={1} />
          <pointLight position={[-5, 5, 5]} intensity={0} />
          <pointLight position={[-5, -10, 5]} intensity={0} />

          <group>
            <primitive object={exc} position-y={-0.25} scale={[1, 1, 1]} />

            <Html className="flex  " position={[0.0, 0.7, 0.2]}>
              <button
                className=" opacity-80 hover:opacity-100 text-sm text-slate-200 w-[2.3rem] px-2 py-2 
                 rounded-full bg-slate-500 hover:bg-slate-700 transition ease-in-out duration-300"
                onClick={() => {
                  setRotateEnabled((prev) => !prev);
                  setCameraYpos(2);
                  setTimeout(() => {
                    //setButtonPosition([0.2, 0.7, 0.2]);
                    setZoom(10);
                    //setZoom(0.4);
                  }, 500);
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
    </>
  );
}

export default MainPage;

// // Function to handle position change
// const meshPosition = useControls("Position", {
//   x: 0,
//   y: 0,
//   z: 0,
// });
