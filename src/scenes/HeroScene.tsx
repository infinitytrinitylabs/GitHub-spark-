import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Float,
  ContactShadows,
  PerspectiveCamera,
  AdaptiveDpr,
  AdaptiveEvents,
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { PRODUCTS } from '../data/products';
import { ProductMesh } from './ProductMesh';

/**
 * HeroScene is the always-on fixed background canvas driving the home
 * page narrative. It shows three signature products floating in a
 * cinematic environment with bloom, soft shadows and slow parallax
 * driven by scroll and pointer.
 */
export function HeroScene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      className="fixed-canvas"
    >
      <color attach="background" args={['#14110F']} />
      <fog attach="fog" args={['#14110F', 8, 22]} />
      <PerspectiveCamera makeDefault position={[0, 0.4, 6]} fov={42} />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      <ambientLight intensity={0.25} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.4}
        color={'#F5D27A'}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-6, 2, -4]} intensity={0.5} color={'#6B7A96'} />
      <pointLight position={[0, 2, 3]} intensity={1.1} color={'#E9B949'} distance={12} decay={2} />

      <Suspense fallback={null}>
        <Rig scrollRef={scrollRef}>
          <Float speed={1.1} rotationIntensity={0.45} floatIntensity={0.9} floatingRange={[-0.2, 0.2]}>
            <group position={[-2.4, 0.2, 0]} scale={1.1}>
              <ProductMesh product={PRODUCTS[3]} scale={1} />
            </group>
          </Float>

          <Float speed={0.85} rotationIntensity={0.6} floatIntensity={1.0} floatingRange={[-0.3, 0.3]}>
            <group position={[0, -0.1, 0.3]} scale={1.25}>
              <ProductMesh product={PRODUCTS[0]} scale={1} />
            </group>
          </Float>

          <Float speed={1.25} rotationIntensity={0.35} floatIntensity={0.7} floatingRange={[-0.25, 0.25]}>
            <group position={[2.6, 0.3, -0.2]} scale={1.05}>
              <ProductMesh product={PRODUCTS[7]} scale={1} />
            </group>
          </Float>
        </Rig>

        <ContactShadows
          position={[0, -1.6, 0]}
          opacity={0.55}
          scale={14}
          blur={2.5}
          far={5}
          color={'#000000'}
        />
        <Environment preset="sunset" background={false} />
      </Suspense>

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.6}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.2}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.2} darkness={0.75} />
      </EffectComposer>
    </Canvas>
  );
}

function Rig({
  children,
  scrollRef,
}: {
  children: React.ReactNode;
  scrollRef: React.MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, dt) => {
    if (!group.current) return;
    const scroll = scrollRef.current;
    const mx = state.pointer.x;
    const my = state.pointer.y;

    target.current.x = THREE.MathUtils.damp(target.current.x, mx * 0.35, 3, dt);
    target.current.y = THREE.MathUtils.damp(target.current.y, my * 0.2, 3, dt);

    group.current.rotation.y = target.current.x;
    group.current.rotation.x = -target.current.y;
    group.current.position.y = -scroll * 2.2;
    group.current.position.z = -scroll * 1.1;
  });

  return <group ref={group}>{children}</group>;
}
