'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { JSX } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import Avatar from './Avatar'

export default function Hero(): JSX.Element {
  return (
    <section id="home" className="hero-container mt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="order-2 md:order-1"
          >

            <h1 className="hero-name">Anurag Jena</h1>

            <p className="hero-desc">
              Crafting scalable, accessible full-stack web applications with a focus on clean UX and robust engineering.
              I build production-ready apps using Next.js, Javascript/Typescript and Node.js.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.03 }}>
                <Button size="lg" asChild>
                  <a className="cta-primary" href="#projects">View Projects</a>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }}>
                <Button size="lg" variant="outline" asChild>
                  <a className="cta-outline" href="/anurag_jena_resume.pdf" download>Download Resume</a>
                </Button>
              </motion.div>
            </div>

            <div className="mt-7 flex hero-socials gap-5" role="contentinfo">
              <a className="text-muted" href="https://github.com/anuraggjena" target="_blank" rel="noopener noreferrer"><Github /></a>
    
              <a className="text-muted" href="https://www.linkedin.com/in/anuraggjena" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
              
              <a className="text-muted" href="mailto:anuragjena14@gmail.com"><Mail /></a>
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12, duration: 0.5 }}
            className="order-1 md:order-2 flex justify-center md:justify-end"
          >
            <Avatar size={320} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
