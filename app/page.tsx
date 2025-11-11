import About from '@/components/About'
import Hero from '../components/Hero'
import FeaturedProjects from '@/components/FeaturedProjects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Hero section */}
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <Contact />
    </main>
  )
}
