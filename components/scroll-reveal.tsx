"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
  once?: boolean
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  className = "",
  once = true,
}: ScrollRevealProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px 0px" })

  // 方向に基づいて初期位置を設定
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 50 }
      case "down":
        return { opacity: 0, y: -50 }
      case "left":
        return { opacity: 0, x: 50 }
      case "right":
        return { opacity: 0, x: -50 }
      default:
        return { opacity: 0, y: 50 }
    }
  }

  // 最終位置
  const getFinalPosition = () => {
    return { opacity: 1, x: 0, y: 0 }
  }

  useEffect(() => {
    if (isInView) {
      controls.start(getFinalPosition())
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={controls}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
