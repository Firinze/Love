"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ArrowRight, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Confetti from "@/components/confetti"
import FloatingHearts from "@/components/floating-hearts"

export default function CupidonReactif() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [showScore, setShowScore] = useState(false)
  const [loveScore, setLoveScore] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [name1, setName1] = useState("")
  const [name2, setName2] = useState("")

  const triggerAnimation = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)
      setShowScore(true)
      setLoveScore(Math.floor(Math.random() * 31) + 70) // Score between 70 and 100
    }, 2000)
  }

  const shareScore = (platform: "facebook" | "twitter" | "linkedin" | "whatsapp") => {
    const message = `J'ai obtenu un score d'amour de ${loveScore}% sur Cupidon Réactif ! 💘`
    const url = "https://cupidon-reactif.vercel.app" // Replace with your actual URL

    if (platform === "facebook") {
      // @ts-ignore
      if (window.FB) {
        // @ts-ignore
        window.FB.ui({
          method: "share",
          href: url,
          quote: message,
        })
      } else {
        console.error("Facebook SDK not loaded")
      }
    } else if (platform === "twitter") {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`
      window.open(twitterUrl, "_blank")
    } else if (platform === "linkedin") {
      const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent("Cupidon Réactif")}&summary=${encodeURIComponent(message)}`
      window.open(linkedinUrl, "_blank")
    } else if (platform === "whatsapp") {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message + " " + url)}`
      window.open(whatsappUrl, "_blank")
    }
  }
  const calculateCompatibility = (e: React.FormEvent) => {
    e.preventDefault()
    setShowForm(false)
    triggerAnimation()
  }

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts />
      {showScore && <Confetti />}

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="text-4xl md:text-5xl font-bold text-pink-600 mb-8 text-center"
      >
        Cupidon Réactif
      </motion.div>

      {!showForm && !isAnimating && !showScore && (
        <Button
          onClick={() => setShowForm(true)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg text-sm md:text-base"
        >
          Lâchez votre flèche d&apos;amour !
        </Button>
      )}

      {showForm && (
        <motion.form
          onSubmit={calculateCompatibility}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="flex flex-col items-center gap-4 w-full max-w-md"
        >
          <Input
            type="text"
            placeholder="Entrez votre prénom"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            required
            className="rounded-full w-full"
          />
          <Input
            type="text"
            placeholder="Entrez le prénom de votre moitié"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            required
            className="rounded-full w-full"
          />
          <Button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg text-sm md:text-base"
          >
            Calculer la compatibilité
          </Button>
        </motion.form>
      )}

      <AnimatePresence>
        {isAnimating && (
          <motion.div className="relative w-full h-64">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 2 }}
              className="absolute top-1/2 left-0"
            >
              <ArrowRight size={48} className="text-red-500" />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 1.2, 1] }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <Heart size={64} className="text-red-500" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScore && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-center"
          >
            <p className="text-xl md:text-2xl font-bold text-pink-600 mb-4">
              {name1 && name2
                ? `La compatibilité entre ${name1} et ${name2} est de ${loveScore}% !`
                : `Votre taux d'amour est de ${loveScore}% !`}
            </p>
            <p className="text-lg md:text-xl text-pink-500 mb-6">Cupidon a frappé !</p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <Button
                onClick={() => shareScore("facebook")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center text-sm md:text-base"
              >
                <Facebook className="mr-2" /> Partager sur Facebook
              </Button>
              <Button
                onClick={() => shareScore("twitter")}
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center text-sm md:text-base"
              >
                <Twitter className="mr-2" /> Partager sur Twitter
              </Button>
              <Button
                onClick={() => shareScore("linkedin")}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center text-sm md:text-base"
              >
                <Linkedin className="mr-2" /> Partager sur LinkedIn
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

