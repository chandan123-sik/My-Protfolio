import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Stars } from "@react-three/drei";
import * as THREE from "three";

// Typing cursor blink on screen
function ScreenContent() {
  const cursorRef = useRef();
  const line1Ref = useRef();
  const line2Ref = useRef();

  useFrame((state) => {
    // Cursor blink
    if (cursorRef.current) {
      cursorRef.current.material.opacity =
        Math.sin(state.clock.elapsedTime * 4) > 0 ? 0.9 : 0;
    }
    // Lines typing effect - scale x grows over time then resets
    if (line1Ref.current) {
      const t = (state.clock.elapsedTime * 0.3) % 1;
      line1Ref.current.scale.x = Math.min(t * 3, 1);
    }
    if (line2Ref.current) {
      const t = ((state.clock.elapsedTime * 0.3) + 0.3) % 1;
      line2Ref.current.scale.x = Math.min(t * 3, 1);
    }
  });

  return (
    <group position={[0, 0.08, 0.062]}>
      {/* Screen bg */}
      <mesh>
        <planeGeometry args={[1.05, 0.72]} />
        <meshStandardMaterial color="#060f0f" emissive="#20b2a6" emissiveIntensity={0.18} />
      </mesh>

      {/* Static code lines */}
      {[
        { y: 0.24, w: 0.55, x: -0.22, color: "#20b2a6" },
        { y: 0.14, w: 0.35, x: -0.32, color: "#a0f0ec" },
        { y: 0.04, w: 0.45, x: -0.27, color: "#20b2a6" },
        { y: -0.06, w: 0.25, x: -0.37, color: "#ffffff" },
        { y: -0.16, w: 0.5,  x: -0.24, color: "#a0f0ec" },
      ].map((l, i) => (
        <mesh key={i} position={[l.x + l.w / 2, l.y, 0.001]}>
          <planeGeometry args={[l.w, 0.032]} />
          <meshBasicMaterial color={l.color} transparent opacity={0.75} />
        </mesh>
      ))}

      {/* Animated typing line */}
      <mesh ref={line1Ref} position={[-0.18, -0.26, 0.001]} scale={[0, 1, 1]}>
        <planeGeometry args={[0.4, 0.032]} />
        <meshBasicMaterial color="#20b2a6" transparent opacity={0.9} />
      </mesh>

      {/* Blinking cursor */}
      <mesh ref={cursorRef} position={[0.08, -0.26, 0.002]}>
        <planeGeometry args={[0.018, 0.034]} />
        <meshBasicMaterial color="#20b2a6" transparent opacity={0.9} />
      </mesh>

      {/* Screen glow overlay */}
      <mesh position={[0, 0, 0.002]}>
        <planeGeometry args={[1.05, 0.72]} />
        <meshBasicMaterial color="#20b2a6" transparent opacity={0.04} />
      </mesh>
    </group>
  );
}

// Monitor with glowing edges
function Monitor() {
  const glowRef = useRef();
  useFrame((state) => {
    if (glowRef.current) {
      glowRef.current.material.emissiveIntensity =
        0.3 + Math.sin(state.clock.elapsedTime * 1.2) * 0.15;
    }
  });

  return (
    <group>
      {/* Monitor body */}
      <RoundedBox args={[1.22, 0.87, 0.09]} radius={0.045} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#0a1515" metalness={0.9} roughness={0.15} />
      </RoundedBox>

      {/* Glowing bezel */}
      <mesh ref={glowRef} position={[0, 0.1, 0.046]}>
        <planeGeometry args={[1.18, 0.83]} />
        <meshStandardMaterial color="#20b2a6" emissive="#20b2a6" emissiveIntensity={0.3} transparent opacity={0.12} />
      </mesh>

      <ScreenContent />

      {/* Stand neck */}
      <mesh position={[0, -0.38, 0]}>
        <boxGeometry args={[0.07, 0.24, 0.055]} />
        <meshStandardMaterial color="#0a1515" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Base */}
      <RoundedBox args={[0.58, 0.05, 0.3]} radius={0.02} position={[0, -0.51, 0.07]}>
        <meshStandardMaterial color="#0a1515" metalness={0.9} roughness={0.15} />
      </RoundedBox>

      {/* Base underglow */}
      <mesh position={[0, -0.545, 0.07]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.52, 0.24]} />
        <meshBasicMaterial color="#20b2a6" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

// Orbiting tech badge (small floating pill)
function TechBadge({ text, radius, speed, yOffset, startAngle }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + startAngle;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius * 0.4;
      ref.current.position.y = yOffset + Math.sin(state.clock.elapsedTime * 0.8 + startAngle) * 0.08;
      ref.current.rotation.y = -t * 0.5;
    }
  });
  return (
    <group ref={ref}>
      <RoundedBox args={[0.32, 0.1, 0.04]} radius={0.02}>
        <meshStandardMaterial color="#0f2020" emissive="#20b2a6" emissiveIntensity={0.6} metalness={0.8} roughness={0.2} transparent opacity={0.9} />
      </RoundedBox>
    </group>
  );
}

// Orbiting glowing dot
function OrbitDot({ radius, speed, yOffset, color, startAngle = 0 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + startAngle;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius * 0.5;
      ref.current.position.y = yOffset + Math.sin(t * 0.7) * 0.12;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 12, 12]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} />
    </mesh>
  );
}

// Floating code snippet cards
function CodeCard({ position, rotation, lines }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.6 + position[0]) * 0.1;
      ref.current.rotation.z =
        rotation[2] + Math.sin(state.clock.elapsedTime * 0.4 + position[2]) * 0.03;
    }
  });
  return (
    <group ref={ref} position={position} rotation={rotation}>
      <RoundedBox args={[0.42, 0.28, 0.02]} radius={0.02}>
        <meshStandardMaterial color="#0a1a1a" emissive="#20b2a6" emissiveIntensity={0.2} metalness={0.5} roughness={0.3} transparent opacity={0.85} />
      </RoundedBox>
      {lines.map((w, i) => (
        <mesh key={i} position={[-0.12 + w / 2, 0.07 - i * 0.07, 0.012]}>
          <planeGeometry args={[w, 0.022]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#20b2a6" : "#a0f0ec"} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// Floating particles
function Particles() {
  const ref = useRef();
  const count = 160;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color("#20b2a6");
    const c2 = new THREE.Color("#a0f0ec");
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3 - 0.5;
      const c = Math.random() > 0.5 ? c1 : c2;
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} vertexColors transparent opacity={0.45} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export function HolographicSphere() {
  return (
    <div className="w-full h-full" style={{ minHeight: "320px" }}>
      <Canvas
        camera={{ position: [0, 0.1, 3.4], fov: 48 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.25} />
        <pointLight position={[2, 3, 3]} intensity={2.5} color="#20b2a6" />
        <pointLight position={[-3, -2, 2]} intensity={1.2} color="#ffffff" />
        <pointLight position={[0, -1, 3]} intensity={0.8} color="#a0f0ec" />

        <Stars radius={20} depth={8} count={300} factor={1.5} fade speed={0.3} />
        <Particles />

        {/* Floating code cards */}
        <CodeCard position={[-1.9, 0.5, -0.5]} rotation={[0.1, 0.3, 0.08]} lines={[0.28, 0.18, 0.22]} />
        <CodeCard position={[1.85, -0.3, -0.4]} rotation={[-0.05, -0.25, -0.06]} lines={[0.22, 0.3, 0.16]} />
        <CodeCard position={[-1.7, -0.8, -0.3]} rotation={[0.08, 0.2, 0.05]} lines={[0.2, 0.26, 0.14]} />

        {/* Tech badges orbiting */}
        <TechBadge radius={1.55} speed={0.55} yOffset={0.1}  startAngle={0} />
        <TechBadge radius={1.55} speed={0.55} yOffset={-0.2} startAngle={Math.PI * 0.66} />
        <TechBadge radius={1.55} speed={0.55} yOffset={0.3}  startAngle={Math.PI * 1.33} />

        {/* Orbiting dots */}
        <OrbitDot radius={1.3} speed={0.9}  yOffset={0}    color="#20b2a6" startAngle={0} />
        <OrbitDot radius={1.5} speed={-0.6} yOffset={0.15} color="#ffffff" startAngle={2} />
        <OrbitDot radius={1.2} speed={1.1}  yOffset={-0.1} color="#a0f0ec" startAngle={4} />

        <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.35}>
          <Monitor />
        </Float>
      </Canvas>
    </div>
  );
}
