"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]

interface ConfettiPiece {
  id: number
  x: number
  y: number
  color: string
}

export default function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    const newPieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 40,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setPieces(newPieces)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: piece.color, left: `${piece.x}%`, top: `${piece.y}%` }}
          animate={{
            y: ["0%", "100%"],
            x: [`${piece.x}%`, `${piece.x + (Math.random() - 0.5) * 20}%`],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

