import Header from '@/components/Header'
import AboutSection from '@/components/AboutSection'
import PhilosophySection from '@/components/PhilosophySection'
import ResearchSection from '@/components/ResearchSection'
import WorksSection from '@/components/WorksSection'
import SkillsSection from '@/components/SkillsSection'
import EducationSection from '@/components/EducationSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export default function Home() {
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
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
