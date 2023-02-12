import { Canvas, useLoader } from '@react-three/fiber';
import { Stage, PresentationControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Model() {
  const { scene } = useLoader(GLTFLoader, 'office_chair.glb');
  return <primitive object={scene} scale={0.01} />;
}

export default function Chair() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 45 }}
      style={{ position: 'absolute', width: '500px', height: '700px' }}
    >
      <PresentationControls
        speed={1.5}
        global
        zoom={1}
        polar={[-0.1, Math.PI / 4]}
      >
        <Stage>
          <Model />
        </Stage>
      </PresentationControls>
    </Canvas>
  );
}
