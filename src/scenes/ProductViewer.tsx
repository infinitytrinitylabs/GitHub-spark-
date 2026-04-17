import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  ContactShadows,
  PerspectiveCamera,
  Html,
  useProgress,
} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import type { Product } from '../data/products';
import { ProductMesh } from './ProductMesh';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="font-mono text-[10px] tracking-[0.3em] text-bone/70">
        {Math.round(progress)}%
      </div>
    </Html>
  );
}

export function ProductViewer({ product }: { product: Product }) {
  return (
    <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
      <color attach="background" args={['#1a1714']} />
      <PerspectiveCamera makeDefault position={[0, 0.5, 4.5]} fov={38} />
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[3, 5, 4]}
        intensity={1.3}
        color={'#F5D27A'}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 2, -3]} intensity={0.4} color={'#8A93A6'} />
      <spotLight position={[0, 4, 2]} intensity={0.8} angle={0.6} penumbra={0.8} color={'#E9B949'} />

      <Suspense fallback={<Loader />}>
        <group position={[0, 0, 0]} scale={1.3}>
          <ProductMesh product={product} spin={false} />
        </group>
        <ContactShadows position={[0, -1.4, 0]} opacity={0.5} scale={10} blur={2.2} far={4} />
        <Environment preset="studio" />
      </Suspense>

      <EffectComposer multisampling={0}>
        <Bloom intensity={0.4} luminanceThreshold={0.7} luminanceSmoothing={0.2} mipmapBlur />
      </EffectComposer>

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={3}
        maxDistance={7}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.6}
        autoRotate
        autoRotateSpeed={0.6}
      />
    </Canvas>
  );
}
