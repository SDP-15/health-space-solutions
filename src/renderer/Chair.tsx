import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';

function Model() {
  const gltf = useGLTF('/office_chair.glb');
  return (
    <primitive
      object={gltf.scene}
      scale={0.01}
      style={{ width: '300px', height: '300px' }}
    />
  );
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
