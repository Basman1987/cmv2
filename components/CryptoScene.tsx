"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"

function CryptoToken() {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
    }
  })

  return (
    <mesh ref={meshRef} scale={0.2}>
      <cylinderGeometry args={[1, 1, 0.2, 32]} />
      <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} transparent opacity={0.7} />
    </mesh>
  )
}

function FloatingNFT({ position, rotation }) {
  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={position} rotation={rotation} scale={0.2}>
        <boxGeometry args={[1, 1.5, 0.1]} />
        <meshStandardMaterial color="#ff6ad5" transparent opacity={0.7} />
      </mesh>
    </Float>
  )
}

export default function CryptoScene() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      <CryptoToken />
      <FloatingNFT position={[-1.5, 0.75, -2]} rotation={[0, Math.PI / 4, 0]} />
      <FloatingNFT position={[1.5, -0.75, -2]} rotation={[0, -Math.PI / 4, 0]} />
    </Canvas>
  )
}

