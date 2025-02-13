"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

interface FloatingHeart {
  id: number
  x: number
  y: number
  scale: number
  rotation: number
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([])

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.5 + Math.random() * 0.5,
      rotation: Math.random() * 360,
    }))
    setHearts(newHearts)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
          animate={{
            y: ["0%", "-100%"],
            x: [`${heart.x}%`, `${heart.x + (Math.random() - 0.5) * 10}%`],
            rotate: [heart.rotation, heart.rotation + 360],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Heart size={`${Math.max(12, 24 * heart.scale)}px`} className="text-pink-300" />
        </motion.div>
      ))}
    </div>
  )
}

