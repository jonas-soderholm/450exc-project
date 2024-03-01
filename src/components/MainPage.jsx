import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, SoftShadows } from "@react-three/drei";
import { gsap } from "gsap";
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

  // const meshPosition = useControls("Position", {
  //   x: 0,
  //   y: 0,
  //   z: 0,
  // });

  // Smooth camera transitions
  useEffect(() => {
    if (orbitControlsRef.current) {
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
  }, [targetPosition, zoom]);

  // Set all parts of exc to recieve shadows
  useEffect(() => {
    if (exc) {
      exc.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [exc]);

  return (
    <>
      <div className="gradient-background  h-[100vh] w-[100vw] relative z-10">
        <Canvas shadows>
          <SoftShadows frustum={3.75} size={35} near={9.5} samples={17} rings={11} />
          <OrbitControls
            ref={orbitControlsRef}
            autoRotate={rotate}
            enableRotate={rotate}
            maxDistance={1.5}
            enableZoom={true}
            autoRotateSpeed={1.2}
          />
          <perspectiveCamera ref={cameraRef} position={[0, 0.5, 0]} />
          <Environment files={"/studio.hdr"} />
          <directionalLight
            position={[-3, 5, 1]}
            intensity={0.4}
            castShadow
            shadow-camera-top={2}
            shadow-camera-right={2}
            shadow-camera-left={-2}
            shadow-camera-bottom={-2}
            shadow-mapSize={[1024, 1024]}
          />
          {/* Floor */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]} // Rotate the plane to be horizontal
            position={[0, -0.58, 0]} // Adjust position as needed
            receiveShadow
            scale={(100, 100, 100)} // This enables the mesh to receive shadows
          >
            <planeGeometry args={[10, 10]} /> {/* Adjust size as needed */}
            <meshStandardMaterial color="grey" receiveShadow /> {/* Set receiveShadow on material */}
          </mesh>
          {/* EXC 450 */}
          <group castShadow>
            <primitive object={exc} position-y={-0.25} scale={[1, 1, 1]} castShadow />
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
    </>
  );
}

export default MainPage;
