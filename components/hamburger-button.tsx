"use client"

import { cn } from "@/lib/utils"

interface HamburgerButtonProps {
  isOpen: boolean
  onClick: () => void
  className?: string
}

export default function HamburgerButton({ isOpen, onClick, className = "" }: HamburgerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none rounded-md transition-colors",
        isOpen ? "bg-white/10" : "",
        className,
      )}
      aria-expanded={isOpen}
      aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
    >
      <span
        className={cn(
          "block w-6 h-0.5 transition-transform duration-300",
          isOpen && "translate-y-2 rotate-45",
          className,
        )}
      />
      <span className={cn("block w-6 h-0.5 transition-opacity duration-300", isOpen && "opacity-0", className)} />
      <span
        className={cn(
          "block w-6 h-0.5 transition-transform duration-300",
          isOpen && "-translate-y-2 -rotate-45",
          className,
        )}
      />
    </button>
  )
}
