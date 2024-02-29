import React, { useRef, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import { gsap } from "gsap";
import { Camera, Vector3 } from "three";
import { button, useControls } from "leva";
import { Button } from "./Buttons";
import { EXCInformation } from "./EXCInformation";

function MainPage() {
  const { scene: exc } = useGLTF("/450exc.glb");
  const orbitControlsRef = useRef();
  const cameraRef = useRef();
  const [targetPosition, setTargetPosition] = useState([1, 1, 1]);
  const [specific, setSpecific] = useState([1, 1, 1]);
  const [rotate, setRotate] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [transitionDuration, setTransitionDuration] = useState(5);

  const handleZoomInTransition = (target) => {
    setTargetPosition(target);

    if (!rotate) {
      cameraRef.current.position.set(0, 1, 0);
    }
  };
  const meshPosition = useControls("Position", {
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    if (orbitControlsRef.current) {
      // Use GSAP's lerp function to smoothly transition the camera position and zoom
      gsap.to(orbitControlsRef.current.target, {
        x: targetPosition[0],
        y: targetPosition[1] - 0.4,
        z: targetPosition[2],
        duration: transitionDuration,
      });
      gsap.to(orbitControlsRef.current.object.position, {
        x: targetPosition[0] + specific[0],
        y: targetPosition[1] + specific[1],
        z: targetPosition[2] + specific[2],
        // x: targetPosition[0] + meshPosition.x,
        // y: targetPosition[1] + meshPosition.y,
        // z: targetPosition[2] + meshPosition.z,
        duration: transitionDuration,
      });
      gsap.to(orbitControlsRef.current.object, { duration: transitionDuration });
    }
  }, [targetPosition, zoom, meshPosition]);

  return (
    <div className="h-[100vh] w-[100vw] bg-[#8dff2a] relative z-10">
      <div
        className="opacity-10 absolute top-0 left-0 right-0 bottom-[45rem] text-[30vw] flex justify-center items-center z-0 text-[#000000] pointer-events-none"
        style={{ backgroundColor: "transparent", whiteSpace: "nowrap", overflow: "visible" }}
      >
        KTM 450
      </div>
      <div
        className="opacity-25 absolute top-[40rem] left-0 right-0 bottom-0 text-[60vw] flex justify-center items-center z-0 text-[#ffffff] pointer-events-none"
        style={{ backgroundColor: "transparent", whiteSpace: "nowrap", overflow: "visible" }}
      >
        EXC
      </div>
      <Canvas>
        <OrbitControls
          ref={orbitControlsRef}
          autoRotate={rotate}
          enableRotate={rotate}
          maxDistance={1.5}
          enableZoom={false}
          autoRotateSpeed={2}
        />
        <perspectiveCamera ref={cameraRef} position={[0, 0.5, 0]} />

        <Environment files={"/studio.hdr"} />
        <ambientLight intensity={1} />
        <directionalLight position={[0, 10, 0]} intensity={0.5} />
        {/* <directionalLight position={[0, -10, 0]} intensity={1} /> */}
        {/* <spotLight position={[5, 10, 5]} angle={0.5} intensity={0} penumbra={1} /> */}
        <pointLight position={[-5, 5, 5]} intensity={0} />
        <pointLight position={[-5, -10, 5]} intensity={0} />

        <group>
          <primitive object={exc} position-y={-0.25} scale={[1, 1, 1]} />
          <Button
            setTransitionDuration={setTransitionDuration}
            setSpecific={setSpecific}
            handleZoomInTransition={handleZoomInTransition}
            setRotate={setRotate}
            rotate={rotate}
            pos={[0.0, 0.7, 0.2]}
            specific={[0.0, 0.3, -0.2]}
            nr={1}
          />
          <Button
            setTransitionDuration={setTransitionDuration}
            setSpecific={setSpecific}
            handleZoomInTransition={handleZoomInTransition}
            setRotate={setRotate}
            rotate={rotate}
            pos={[0.0, 0.1, 0.1]}
            specific={[-0.7, 0.13, -0.82]}
            nr={2}
          />
          <Button
            setTransitionDuration={setTransitionDuration}
            setSpecific={setSpecific}
            handleZoomInTransition={handleZoomInTransition}
            setRotate={setRotate}
            rotate={rotate}
            pos={[0.1, 0.1, 0.5]}
            specific={[-0.49, 0.48, 0.58]}
            nr={3}
          />
          <Button
            setTransitionDuration={setTransitionDuration}
            setSpecific={setSpecific}
            handleZoomInTransition={handleZoomInTransition}
            setRotate={setRotate}
            rotate={rotate}
            pos={[-0.1, 0.35, -0.7]}
            specific={[-0.53, 0.06, -0.53]}
            nr={4}
          />
        </group>
      </Canvas>
      <EXCInformation />
    </div>
  );
}

export default MainPage;
