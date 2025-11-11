'use client'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { JSX } from 'react'

const SKILLS = [
  'C++',
  'JavaScript',
  'TypeScript',
  'SQL',
  'Python',
  'React.js',
  'Next.js', 
  'Node.js', 
  'Express', 
  'REST APIs', 
  'JWT', 
  'OAuth',
  'Supabase', 
  'PostgreSQL', 
  'Drizzle ORM', 
  'MySQL',
  'Data Structures & Algorithms'
]

export default function Skills(): JSX.Element {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 sm:px-6 py-20" aria-labelledby="skills-heading">
      <div className="mb-8">
        <h2 id="skills-heading" className="text-2xl md:text-3xl font-bold text-fg">Skills</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Core technical skills and tools — grouped for quick scanning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass p-4">
          <h3 className="text-lg font-medium text-fg">Languages & Fundamentals</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {SKILLS.slice(0, 5).map((s) => (
              <Badge key={s} className="rounded-md px-2 py-1">{s}</Badge>
            ))}
          </div>
        </Card>

        <Card className="glass p-4">
          <h3 className="text-lg font-medium text-fg">Framework & Tools</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {['React.js', 'Next.js', 'Node.js', 'Express', 'REST APIs', 'JWT', 'OAuth'].map((s) => (
              <Badge key={s} className="rounded-md px-2 py-1">{s}</Badge>
            ))}
          </div>
        </Card>

        <Card className="glass p-4">
          <h3 className="text-lg font-medium text-fg">Cloud & Database</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {['Supabase', 'PostgreSQL', 'Drizzle ORM', 'MySQL'].map((s) => (
              <Badge key={s} className="rounded-md px-2 py-1">{s}</Badge>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
