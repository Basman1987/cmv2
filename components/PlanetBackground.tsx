"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Planet {
  id: number
  x: number
  y: number
  size: number
  speed: number
  color: string
}

const generatePlanets = (count: number): Planet[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 30 + 10,
    speed: Math.random() * 20 + 10,
    color: `hsl(${Math.random() * 360}, 70%, 70%)`,
  }))
}

export default function PlanetBackground() {
  const [planets, setPlanets] = useState<Planet[]>([])

  useEffect(() => {
    setPlanets(generatePlanets(10))
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {planets.map((planet) => (
        <motion.div
          key={planet.id}
          className="absolute rounded-full opacity-20 blur-sm"
          style={{
            width: planet.size,
            height: planet.size,
            backgroundColor: planet.color,
            left: `${planet.x}%`,
            top: `${planet.y}%`,
          }}
          animate={{
            x: ["0%", "100%", "0%"],
            y: ["0%", "50%", "0%"],
          }}
          transition={{
            duration: planet.speed,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      ))}
    </div>
  )
}

