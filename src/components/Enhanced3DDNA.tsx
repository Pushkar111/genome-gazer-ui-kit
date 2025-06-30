
import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface DNAHelixProps {
  animated?: boolean;
  color?: string;
}

function DNAHelix({ animated = true, color = '#3b82f6' }: DNAHelixProps) {
  const helixRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Generate DNA helix points
  const helixPoints = useMemo(() => {
    const points = [];
    const particleCount = 2000;
    
    for (let i = 0; i < particleCount; i++) {
      const t = (i / particleCount) * Math.PI * 8;
      const radius = 2;
      
      // Double helix structure
      const x1 = Math.cos(t) * radius;
      const y1 = (i / particleCount - 0.5) * 10;
      const z1 = Math.sin(t) * radius;
      
      const x2 = Math.cos(t + Math.PI) * radius;
      const y2 = y1;
      const z2 = Math.sin(t + Math.PI) * radius;
      
      points.push(x1, y1, z1);
      points.push(x2, y2, z2);
    }
    
    return new Float32Array(points);
  }, []);

  useFrame((state) => {
    if (animated && helixRef.current) {
      helixRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={helixRef}>
      {/* DNA Helix Structure */}
      <Points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={helixPoints.length / 3}
            array={helixPoints}
            itemSize={3}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          color={color}
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      
      {/* Base pairs connectors */}
      {Array.from({ length: 50 }, (_, i) => {
        const t = (i / 50) * Math.PI * 8;
        const y = (i / 50 - 0.5) * 10;
        const radius = 2;
        
        return (
          <group key={i}>
            <mesh position={[Math.cos(t) * radius, y, Math.sin(t) * radius]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshPhongMaterial color="#ec4899" />
            </mesh>
            <mesh position={[Math.cos(t + Math.PI) * radius, y, Math.sin(t + Math.PI) * radius]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshPhongMaterial color="#8b5cf6" />
            </mesh>
            {/* Connecting line */}
            <mesh position={[0, y, 0]} rotation={[0, t, 0]}>
              <cylinderGeometry args={[0.02, 0.02, radius * 2, 8]} />
              <meshPhongMaterial color="#64748b" opacity={0.6} transparent />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

interface Enhanced3DDNAProps {
  width?: string;
  height?: string;
  animated?: boolean;
  showControls?: boolean;
}

const Enhanced3DDNA: React.FC<Enhanced3DDNAProps> = ({
  width = "100%",
  height = "400px",
  animated = true,
  showControls = true
}) => {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20" style={{ width, height }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <DNAHelix animated={animated} />
        
        {showControls && (
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            autoRotate={animated}
            autoRotateSpeed={0.5}
          />
        )}
      </Canvas>
      
      {/* Overlay UI */}
      <div className="absolute top-4 left-4 glass-medical rounded-lg p-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-slate-700">DNA Structure</span>
        </div>
        <div className="text-xs text-slate-500 mt-1">
          Interactive 3D Helix • Drag to explore
        </div>
      </div>

      <div className="absolute bottom-4 right-4 glass-medical rounded-lg p-3">
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
            <span>Adenine / Thymine</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span>Guanine / Cytosine</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enhanced3DDNA;
