"use client"

import type React from "react"

import { useEffect, type ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavLinkProps {
  href: string
  children: ReactNode
  className?: string
  activeClassName?: string
  onClick?: () => void
}

export function NavLink({
  href,
  children,
  className = "",
  activeClassName = "text-yellow-400",
  onClick,
}: NavLinkProps) {
  const isHashLink = href.startsWith("#")

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHashLink) {
      e.preventDefault()
      const targetId = href
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        })

        // Update URL without page reload
        window.history.pushState(null, "", href)
      }
    }

    // Call the onClick handler if provided (for mobile menu)
    if (onClick) {
      onClick()
    }
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}

interface SmoothScrollNavigationProps {
  links: {
    href: string
    label: string
  }[]
  className?: string
  linkClassName?: string
  activeLinkClassName?: string
  onLinkClick?: () => void
}

export default function SmoothScrollNavigation({
  links,
  className = "",
  linkClassName = "text-white font-bold hover:text-yellow-400 transition-colors duration-300",
  activeLinkClassName = "text-yellow-400",
  onLinkClick,
}: SmoothScrollNavigationProps) {
  // Track active section for highlighting current nav item
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return

      const scrollPosition = window.scrollY + 100 // Offset for header height

      // Find sections in the page
      const sections = links
        .filter((link) => link.href.startsWith("#"))
        .map((link) => {
          const element = document.querySelector(link.href)
          if (!element) return null

          return {
            id: link.href,
            offsetTop: element.getBoundingClientRect().top + window.scrollY,
            element,
          }
        })
        .filter(Boolean) as { id: string; offsetTop: number; element: Element }[]

      // Sort sections by their position on the page
      sections.sort((a, b) => a.offsetTop - b.offsetTop)

      // Find the current active section
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].offsetTop - 200) {
          // 200px threshold
          // Update active class on nav links
          const navLinks = document.querySelectorAll(".nav-link")
          navLinks.forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href") === sections[i].id) {
              link.classList.add("active")
            }
          })
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [links])

  return (
    <nav className={className}>
      <ul className="flex flex-wrap justify-center md:flex-row">
        {links.map((link, index) => (
          <li key={index} className="mx-4 my-2">
            <NavLink
              href={link.href}
              className={cn("nav-link", linkClassName)}
              activeClassName={activeLinkClassName}
              onClick={onLinkClick}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
