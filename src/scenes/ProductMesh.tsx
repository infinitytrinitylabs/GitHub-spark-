import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Product } from '../data/products';

/**
 * ProductMesh renders a procedural, realistic-looking 3D form that
 * represents a product. We ship no external model files — instead each
 * "shape" is built from primitive geometries with physically-based
 * materials tuned per product palette. This keeps the bundle tiny while
 * still feeling premium.
 */
interface Props {
  product: Product;
  spin?: boolean;
  scale?: number;
}

export function ProductMesh({ product, spin = true, scale = 1 }: Props) {
  const group = useRef<THREE.Group>(null);
  const [c0, c1, c2] = product.palette;

  useFrame((_, dt) => {
    if (!group.current) return;
    if (spin) group.current.rotation.y += dt * 0.35;
    // subtle breathing
    const t = performance.now() * 0.001;
    group.current.position.y = Math.sin(t * 1.2) * 0.04;
  });

  return (
    <group ref={group} scale={scale} dispose={null}>
      {product.shape === 'ring' && <RingShape a={c0} b={c1} c={c2} />}
      {product.shape === 'pendant' && <PendantShape a={c0} b={c1} c={c2} />}
      {product.shape === 'earring' && <EarringShape a={c0} b={c1} c={c2} />}
      {product.shape === 'garment' && <GarmentShape a={c0} b={c1} c={c2} />}
      {product.shape === 'bag' && <BagShape a={c0} b={c1} c={c2} />}
      {product.shape === 'glasses' && <GlassesShape a={c0} b={c1} c={c2} />}
      {product.shape === 'watch' && <WatchShape a={c0} b={c1} c={c2} />}
      {product.shape === 'hat' && <HatShape a={c0} b={c1} c={c2} />}
    </group>
  );
}

/* -------- Individual procedural shapes -------- */

function RingShape({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <group>
      <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.9, 0.22, 64, 160]} />
        <meshPhysicalMaterial
          color={a}
          metalness={1}
          roughness={0.18}
          clearcoat={0.4}
          clearcoatRoughness={0.2}
        />
      </mesh>
      <mesh position={[0, 0.28, 0]} castShadow>
        <octahedronGeometry args={[0.28, 0]} />
        <meshPhysicalMaterial
          color={c}
          metalness={0.2}
          roughness={0.05}
          transmission={0.85}
          thickness={0.5}
          ior={1.6}
          attenuationColor={b}
          attenuationDistance={0.4}
        />
      </mesh>
    </group>
  );
}

function PendantShape({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <group>
      {/* Chain as series of small torii */}
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh
          key={i}
          position={[Math.sin(i * 0.4) * 0.05, 1.4 - i * 0.1, 0]}
          rotation={[Math.PI / 2, 0, i * 0.8]}
        >
          <torusGeometry args={[0.045, 0.016, 12, 24]} />
          <meshPhysicalMaterial
            color={a}
            metalness={1}
            roughness={0.25}
          />
        </mesh>
      ))}
      {/* Setting */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.08, 32]} />
        <meshPhysicalMaterial color={a} metalness={1} roughness={0.3} />
      </mesh>
      {/* Stone */}
      <mesh position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.28, 48, 48]} />
        <meshPhysicalMaterial
          color={c}
          metalness={0.1}
          roughness={0.05}
          transmission={0.9}
          thickness={0.6}
          ior={1.5}
          attenuationColor={b}
          attenuationDistance={0.5}
        />
      </mesh>
    </group>
  );
}

function EarringShape({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <group>
      <mesh position={[-0.5, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.45, 0.05, 24, 64]} />
        <meshPhysicalMaterial color={a} metalness={1} roughness={0.3} />
      </mesh>
      <mesh position={[0.5, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.45, 0.05, 24, 64]} />
        <meshPhysicalMaterial color={a} metalness={1} roughness={0.3} />
      </mesh>
      <mesh position={[-0.5, -0.55, 0]}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial color={b} roughness={0.6} />
      </mesh>
      <mesh position={[0.5, -0.55, 0]}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial color={b} roughness={0.6} />
      </mesh>
      {/* subtle accent droplet picking up the third palette color */}
      <mesh position={[0, -0.35, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={c} roughness={0.4} />
      </mesh>
    </group>
  );
}

function GarmentShape({ a, b, c }: { a: string; b: string; c: string }) {
  // Stylised folded garment: a draped plane using displaced geometry
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(1.8, 2.2, 40, 50);
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z =
        Math.sin(x * 3) * 0.08 +
        Math.cos(y * 2.5) * 0.1 +
        Math.sin((x + y) * 4) * 0.04;
      pos.setZ(i, z);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <group rotation={[-0.25, 0.2, 0]}>
      <mesh geometry={geo} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={a}
          roughness={0.85}
          sheen={0.6}
          sheenColor={c}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* collar band */}
      <mesh position={[0, 1.0, 0.05]}>
        <boxGeometry args={[1.1, 0.12, 0.05]} />
        <meshStandardMaterial color={b} roughness={0.7} />
      </mesh>
      {/* buttons */}
      {[0.5, 0.1, -0.3, -0.7].map((y, i) => (
        <mesh key={i} position={[0, y, 0.1]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 20]} />
          <meshPhysicalMaterial color={c} metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function BagShape({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.6, 1.1, 0.5]} />
        <meshPhysicalMaterial
          color={a}
          roughness={0.65}
          clearcoat={0.25}
          clearcoatRoughness={0.5}
        />
      </mesh>
      {/* flap */}
      <mesh position={[0, 0.35, 0.26]} castShadow>
        <boxGeometry args={[1.62, 0.6, 0.04]} />
        <meshPhysicalMaterial color={a} roughness={0.6} clearcoat={0.3} />
      </mesh>
      {/* strap */}
      <mesh position={[0, 0.9, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.8, 0.03, 12, 40, Math.PI]} />
        <meshStandardMaterial color={a} roughness={0.6} />
      </mesh>
      {/* buckle */}
      <mesh position={[0, 0.05, 0.28]}>
        <boxGeometry args={[0.2, 0.12, 0.04]} />
        <meshPhysicalMaterial color={b} metalness={1} roughness={0.25} />
      </mesh>
      {/* stitched piping accent */}
      <mesh position={[0, -0.55, 0.26]}>
        <boxGeometry args={[1.58, 0.03, 0.02]} />
        <meshStandardMaterial color={c} roughness={0.8} />
      </mesh>
    </group>
  );
}

function GlassesShape({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <group rotation={[0.15, 0, 0]}>
      <mesh position={[-0.55, 0, 0]}>
        <torusGeometry args={[0.45, 0.06, 20, 60]} />
        <meshPhysicalMaterial color={a} roughness={0.35} clearcoat={0.8} />
      </mesh>
      <mesh position={[0.55, 0, 0]}>
        <torusGeometry args={[0.45, 0.06, 20, 60]} />
        <meshPhysicalMaterial color={a} roughness={0.35} clearcoat={0.8} />
      </mesh>
      {/* bridge */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.3, 0.05, 0.08]} />
        <meshPhysicalMaterial color={a} roughness={0.35} clearcoat={0.8} />
      </mesh>
      {/* lenses */}
      {[-0.55, 0.55].map((x) => (
        <mesh key={x} position={[x, 0, 0]}>
          <circleGeometry args={[0.4, 48]} />
          <meshPhysicalMaterial
            color={b}
            transmission={0.6}
            roughness={0.1}
            thickness={0.2}
            ior={1.45}
            transparent
            opacity={0.55}
          />
        </mesh>
      ))}
      {/* temple tips — accent from third palette color */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 1.02, 0, -0.25]} rotation={[0, s * 0.4, 0]}>
          <boxGeometry args={[0.5, 0.04, 0.05]} />
          <meshPhysicalMaterial color={c} roughness={0.5} clearcoat={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function WatchShape({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <group rotation={[0.2, 0.3, 0]}>
      {/* case */}
      <mesh castShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.18, 48]} />
        <meshPhysicalMaterial color={a} metalness={1} roughness={0.22} />
      </mesh>
      {/* dial */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.01, 48]} />
        <meshPhysicalMaterial color={b} roughness={0.4} />
      </mesh>
      {/* hands */}
      <mesh position={[0, 0.11, 0]} rotation={[0, 0, 0.6]}>
        <boxGeometry args={[0.02, 0.4, 0.01]} />
        <meshStandardMaterial color={c} />
      </mesh>
      <mesh position={[0, 0.11, 0]} rotation={[0, 0, -1.2]}>
        <boxGeometry args={[0.02, 0.28, 0.01]} />
        <meshStandardMaterial color={c} />
      </mesh>
      {/* strap */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.55, 0.8, 0.1]} />
        <meshPhysicalMaterial color={c} roughness={0.7} />
      </mesh>
      <mesh position={[0, -0.9, 0]}>
        <boxGeometry args={[0.55, 0.8, 0.1]} />
        <meshPhysicalMaterial color={c} roughness={0.7} />
      </mesh>
    </group>
  );
}

function HatShape({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <group>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.6, 0.62, 0.6, 48]} />
        <meshStandardMaterial color={a} roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.05, 48]} />
        <meshStandardMaterial color={a} roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.04, 12, 48]} />
        <meshStandardMaterial color={b} roughness={0.7} />
      </mesh>
      {/* crown pinch detail */}
      <mesh position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.58, 0.6, 0.04, 48]} />
        <meshStandardMaterial color={c} roughness={0.75} />
      </mesh>
    </group>
  );
}
