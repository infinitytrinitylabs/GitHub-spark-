import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import type { Product } from '../data/products';
import { ProductMesh } from './ProductMesh';

/**
 * Small inline 3D preview used in product grid cards. Intentionally
 * lightweight: no postprocessing, small DPR, no shadows.
 */
export function ProductCardCanvas({ product }: { product: Product }) {
  return (
    <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <PerspectiveCamera makeDefault position={[0, 0.2, 4.5]} fov={40} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 3]} intensity={1.1} color={'#F5D27A'} />
      <directionalLight position={[-3, 1, -2]} intensity={0.35} color={'#8A93A6'} />
      <Suspense fallback={null}>
        <Float speed={1.3} rotationIntensity={0.5} floatIntensity={0.6}>
          <group scale={1.1}>
            <ProductMesh product={product} spin={false} />
          </group>
        </Float>
        <ContactShadows position={[0, -1.4, 0]} opacity={0.4} scale={6} blur={2.2} far={3} />
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
}
