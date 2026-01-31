'use client'

import React, { JSX, useEffect, useState } from 'react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '@/components/ui/sheet'
import { X, Menu, Mail, FileText } from 'lucide-react'

const NAV = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Header(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md bg-background/85 border-b border-border/40' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Mobile: hamburger (left) */}
          <div className="flex items-center gap-2 md:hidden">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className="inline-flex items-center justify-center rounded-md p-2 hover:bg-card/60 transition"
                  title="Menu"
                >
                  <Menu size={18} />
                </button>
              </SheetTrigger>

              <SheetContent side="left" className="w-[88%] max-w-xs p-4" aria-labelledby="mobile-sheet-title">
                {/* Accessible title for Radix Dialog (screen readers) */}
                <h2 id="mobile-sheet-title" className="sr-only">Mobile navigation</h2>

                {/* Single header row with one visible title + close button */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-semibold text-foreground">Menu</div>
                </div>

                <nav aria-label="Mobile main navigation" className="flex flex-col gap-3">
                  {NAV.map((n) => (
                      <a
                        href={n.href}
                        onClick={() => setSheetOpen(false)}
                        className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-card/50 transition"
                      >
                        {n.label}
                      </a>
                  ))}
                </nav>

                <div className="mt-6 border-t border-border/40 pt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="sr-only">email</span>
                    <a className="hover:underline flex items-center gap-3" href="mailto:anuragjena14@gmail.com"><Mail />anuragjena14@gmail.com</a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop: centered nav */}
          <nav className="hidden md:flex md:flex-1 md:justify-center md:gap-8">
            {NAV.map((n) => (
              <motion.a
                key={n.href}
                href={n.href}
                whileHover={{ y: -3 }}
                className="text-sm font-medium text-foreground/90 hover:text-foreground transition"
              >
                {n.label}
              </motion.a>
            ))}
          </nav>

          {/* Right: Resume + Theme toggle (always visible) */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Button variant="outline" size="sm" asChild>
                <a href="/Anurag_Jena_Resume.pdf" download><FileText />Resume</a>
              </Button>
            </div>

            <div className="md:hidden">
              <a href="/Anurag_Jena_Resume.pdf" download className="inline-flex items-center rounded-md px-2 py-1 text-sm font-medium bg-primary-600 text-primary">
                <FileText />
              </a>
            </div>

            <div className="flex items-center">
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
