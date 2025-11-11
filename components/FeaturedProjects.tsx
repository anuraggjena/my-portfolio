'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { JSX } from 'react'

type Project = {
  id: string
  title: string
  desc: string
  tech: string[]
  live?: string
  source?: string
  image?: string
}

const FEATURED: Project[] = [
  {
    id: 'p1',
    title: 'SkillForge AI',
    desc: 'An AI-powered platform that provides personalized project ideas, and real-time coding assistance using OpenAI GPT models and vector embeddings. Built with a full-stack architecture for fast search and intelligent recommendations.',
    tech: ['Next.js', 'DrizzleORM', 'OpenAI', 'Vercel'],
    live: 'https://skillforge-dev.vercel.app/',
    source: 'https://github.com/anuragjena14/skillforge-ai',
    image: '/skillforge.png',
  },
  {
    id: 'p2',
    title: 'ProBid AI',
    desc: 'An AI-powered platform that analyzes job posts and automatically crafts tailored proposals using transformers and semantic similarity scoring.',
    tech: ['Next.js', 'NeonDB', 'PostgreSQL', 'Xenova', 'Vercel'],
    live: 'https://probid-ai.vercel.app/',
    source: 'https://github.com/anuragjena14/probid-ai',
    image: '/probid.png',
  },
]

const OTHER: Project[] = [
  { id: 'o1', title: 'Planora AI', desc: 'Complete Trip Planner with AI integration.', tech: ['React', 'Convex Database', 'OpenAI'], source: 'https://planora-ai-zeta.vercel.app/' },
  { id: 'o2', title: 'Weather', desc: 'Hourly weather visualizer', tech: ['HTML', 'CSS','JavaScript'], source: 'https://github.com/anuraggjena/weather-app' },
  { id: 'o3', title: 'WorkNext', desc: 'A LinkedIn Clone site', tech: ['TypeScript', 'Node.js', 'UploadThing'], source: 'https://worknest-appdost.vercel.app/' },
  { id: 'o4', title: 'TrendOk', desc: 'An Amazone Clone site', tech: ['HTML', 'CSS'], source: 'https://trendok.vercel.app/' },
]

export default function FeaturedProjects(): JSX.Element {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 sm:px-6 py-24" aria-labelledby="projects-heading">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 id="projects-heading" className="text-2xl md:text-3xl font-bold text-fg">Featured Projects</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Two highlight projects — click Live to open a deployed demo or Source to view the repository.
          </p>
        </div>
      </div>

      {/* Featured grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {FEATURED.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="relative"
          >
            <Card className="glass p-0 overflow-hidden">
              <div className="relative w-full h-56 md:h-64">
                <Image
                  src={p.image ?? '/projects/placeholder.jpg'}
                  alt={`${p.title} screenshot`}
                  fill
                  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 900px"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-fg">{p.title}</h3>
                <p className="text-muted-foreground mt-2">{p.desc}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <Badge key={t} className="rounded-md px-2 py-1">{t}</Badge>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3">
                  {p.live ? (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="cta-primary inline-flex items-center" aria-label={`Open live demo of ${p.title}`}>
                      Live
                    </a>
                  ) : (
                    <span className="cta-outline inline-flex items-center">Live</span>
                  )}

                  {p.source ? (
                    <a href={p.source} target="_blank" rel="noopener noreferrer" className="cta-outline inline-flex items-center" aria-label={`Open source repo of ${p.title}`}>
                      Source
                    </a>
                  ) : (
                    <span className="cta-outline inline-flex items-center">Source</span>
                  )}
                </div>
              </div>
            </Card>
          </motion.article>
        ))}
      </div>

      <Separator />

      {/* Other projects grid */}
      <div id="other-projects" className="mt-10">
        <h3 className="text-xl font-semibold text-fg mb-4">Other projects</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {OTHER.map((p) => (
            <Card key={p.id} className="glass p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-medium text-fg">{p.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tech.map((t) => <Badge key={t} className="rounded-md px-2 py-1">{t}</Badge>)}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {p.source ? (
                    <a href={p.source} target="_blank" rel="noopener noreferrer" className="cta-outline inline-flex items-center text-sm">Source</a>
                  ) : (
                    <span className="text-sm text-muted-foreground">—</span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
