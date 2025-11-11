// components/About.tsx
'use client'

import { useState, useMemo, JSX } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type EduItem = {
  school: string
  degree: string
  duration: string
  details?: string
}

export default function About(): JSX.Element {
  const [expanded, setExpanded] = useState(false)

  const shortBio =
    `I’m a passionate Full-Stack Developer skilled in building scalable, AI-driven web applications using Next.js, React, Node.js, and Javascript/TypeScript. I focus on creating fast, user-centered digital experiences with clean code, modern design, and a strong attention to performance and accessibility.`

  const longBio =
    `I love transforming ideas into real-world software that delivers impact. My experience spans both frontend and backend — from building full-stack platforms like SkillForge-AI and Probid-AI, powered by OpenAI and vector embeddings, to designing APIs and databases that scale.

    I’ve gained valuable hands-on experience through internships — including at DRDO, where I developed a real-time object tracking prototype in C++, and at Deloitte Australia’s Virtual Program, where I built a performance-focused data visualization dashboard.

    Beyond frameworks, I’m deeply interested in system design, data structures, and algorithms, and I care about writing maintainable, efficient code. I enjoy collaborating in teams, adapting quickly to new technologies, and continuously improving both my craft and the products I help build.`

  const rawEducation: EduItem[] = [
    {
      school: 'Balasore College of Engineering and Technology, Balasore)',
      degree: 'B.Tech — Computer Science & Engineering',
      duration: '2022 — 2026',
      details:
        'Core coursework: Data Structures, Algorithms, DBMS, OS, Software Engineering.',
    },
    {
      school: 'St. Vincent’s Convent School, Balasore',
      degree: '+2 Science (ISC Board)',
      duration: '2020 — 2022',
      details:
        'Subjects: Physics, Chemistry, Mathematics, Biology, English, and Computer.',
    },
    {
      school: 'St. Vincent’s Convent School, Balasore',
      degree: 'Class 10 (ICSE Board)',
      duration: '2019 — 2020',
      details:
        'Completed with strong academic performance; foundational subjects and computer basics.',
    },
  ]

  const education = useMemo(() => {
    const seen = new Set<string>()
    const unique: EduItem[] = []

    for (const e of rawEducation) {
      const key = `${e.school}||${e.degree}||${e.duration}`
      if (seen.has(key)) continue
      seen.add(key)
      unique.push(e)
    }

    const orderRank = (deg: string) => {
      const d = deg.toLowerCase()
      if (d.includes('b.tech') || d.includes('bachelor')) return 0
      if (d.includes('+2') || d.includes('inter') || d.includes('class 12')) return 1
      if (d.includes('class 10') || d.includes('matric')) return 2
      return 3
    }

    unique.sort((a, b) => {
      const ra = orderRank(a.degree)
      const rb = orderRank(b.degree)
      if (ra !== rb) return ra - rb
      return b.duration.localeCompare(a.duration)
    })

    return unique
  }, [rawEducation])

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 sm:px-6 py-20" aria-labelledby="about-heading">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* LEFT: Bio */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="order-2 md:order-1"
        >
          <h2 id="about-heading" className="text-2xl md:text-3xl font-bold text-fg">About Me</h2>

          <Card className="mt-6 glass p-6">
            <p className="text-muted-foreground">{shortBio}</p>

            {expanded && <p className="text-muted-foreground mt-3">{longBio}</p>}

            <div className="mt-6 flex items-center gap-3">
              <Button onClick={() => setExpanded((s) => !s)} aria-expanded={expanded}>
                {expanded ? 'Show less' : 'Read more'}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* RIGHT: Education (deduped & sorted) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="order-1 md:order-2"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-fg">Education</h2>

          <div className="mt-6 space-y-4">
            {education.map((edu, idx) => (
              <Card key={`${edu.school}-${edu.degree}-${idx}`} className="glass p-6 hover:scale-[1.02] transition-transform duration-200">
                <div className="flex flex-col gap-1">
                  <div className="text-lg font-semibold text-fg">{edu.school}</div>
                  <div className="text-sm text-muted-foreground">{edu.degree}</div>
                  <div className="text-sm text-muted-foreground">{edu.duration}</div>
                  {edu.details && <p className="text-sm text-muted-foreground mt-2">{edu.details}</p>}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
