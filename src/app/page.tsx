import Header from '@/components/Header'
import AboutSection from '@/components/AboutSection'
import PhilosophySection from '@/components/PhilosophySection'
import ResearchSection from '@/components/ResearchSection'
import WorksSection from '@/components/WorksSection'
import SkillsSection from '@/components/SkillsSection'
import EducationSection from '@/components/EducationSection'
import BlogSection from '@/components/BlogSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import { getAllPosts } from '@/lib/blog'

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3)

  return (
    <>
      <Header />
      <main className="relative z-10">
        <AboutSection />
        <div className="section-divider w-4/5 max-w-6xl mx-auto"></div>
        <PhilosophySection />
        <div className="section-divider w-4/5 max-w-6xl mx-auto"></div>
        <ResearchSection />
        <div className="section-divider w-4/5 max-w-6xl mx-auto"></div>
        <WorksSection />
        <div className="section-divider w-4/5 max-w-6xl mx-auto"></div>
        <SkillsSection />
        <div className="section-divider w-4/5 max-w-6xl mx-auto"></div>
        <EducationSection />
        <div className="section-divider w-4/5 max-w-6xl mx-auto"></div>
        <BlogSection posts={latestPosts} />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
