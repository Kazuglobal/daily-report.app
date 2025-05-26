"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import HamburgerButton from "./hamburger-button"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Handle window resize to determine if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  // Close menu when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMenuOpen && !target.closest("header")) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isMenuOpen])

  // Close menu when window is resized to desktop
  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false)
    }
  }, [isMobile, isMenuOpen])

  const navLinks = [
    { href: "/", label: "ホーム" },
    { href: "/greetings", label: "ご挨拶" },
    { href: "/class-reports", label: "回生だより" },
    { href: "/sports-achievements", label: "部活動戦績" },
    { href: "/career-paths", label: "進路状況" },
    { href: "/festival-detail", label: "60周年記念同窓祭" },
    { href: "#contact", label: "お問い合わせ" },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Close menu when a link is clicked
  const handleLinkClick = () => {
    if (isMobile) {
      setIsMenuOpen(false)
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 text-gray-800 shadow-lg backdrop-blur-sm py-2"
          : "bg-gradient-to-r from-blue-800 to-blue-700 text-white py-4",
      )}
    >
      <div className="container mx-auto w-[95%] max-w-7xl px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <div className="flex items-center">
              {!imageError ? (
                <div className="logo-container mr-3 bg-white rounded-md p-1 shadow-sm">
                  <Image
                    src="/hachinohe-kita-60th-logo.png"
                    alt="八戸北高校60周年記念ロゴ"
                    width={isMobile ? 80 : 120}
                    height={isMobile ? 53 : 80}
                    priority
                    className="transition-transform duration-300 hover:scale-105"
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                <div className="mr-3 bg-blue-100 rounded-md p-2 shadow-sm">
                  <div className="text-blue-800 font-bold text-xl">北高</div>
                </div>
              )}
              <div>
                <h1 className={cn("font-bold transition-colors", scrolled ? "text-blue-800" : "text-white")}>
                  <span className="text-lg md:text-xl">八戸北高校同窓会</span>
                  <span className="block text-sm md:text-base font-medium opacity-90">創立60周年記念デジタル会報</span>
                </h1>
              </div>
            </div>
          </Link>

          {/* Hamburger menu button (mobile only) */}
          <div className="md:hidden">
            <HamburgerButton
              isOpen={isMenuOpen}
              onClick={toggleMenu}
              className={scrolled ? "text-blue-800" : "text-white"}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-1">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105",
                      scrolled
                        ? "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
                        : "text-white/90 hover:text-white hover:bg-white/10",
                    )}
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "absolute left-0 right-0 shadow-lg transition-all duration-300 ease-in-out overflow-hidden md:hidden",
            isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
            scrolled ? "bg-white border-t border-gray-100" : "bg-blue-800 border-t border-blue-700",
          )}
          style={{ top: "100%" }}
        >
          <nav className="py-2">
            <ul className="flex flex-col">
              {navLinks.map((link, index) => (
                <li
                  key={index}
                  className={cn("border-b last:border-b-0", scrolled ? "border-gray-100" : "border-blue-700")}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block py-3 px-6 font-medium transition-colors",
                      scrolled
                        ? "text-gray-800 hover:bg-blue-50 hover:text-blue-700"
                        : "text-white hover:bg-blue-700 hover:text-white",
                    )}
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
