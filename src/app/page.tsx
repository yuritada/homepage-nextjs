import Header from '@/components/Header'
import AboutSection from '@/components/AboutSection'
import PhilosophySection from '@/components/PhilosophySection'
import ResearchSection from '@/components/ResearchSection'
import WorksSection from '@/components/WorksSection'
import SkillsSection from '@/components/SkillsSection'
import EducationSection from '@/components/EducationSection'
import BlogSection from '@/components/BlogSection'
import DocsSection from '@/components/DocsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import { getFeaturedPosts } from '@/lib/blog'
import { getFeaturedDocs } from '@/lib/documents'

export default function Home() {
  const latestPosts = getFeaturedPosts(3)
  const latestDocs = getFeaturedDocs(3)

  return (
    <>
      <Header />
      <main className="relative z-10">
        <AboutSection />
        <div className="section-divider w-[90%] max-w-6xl mx-auto"></div>
        <PhilosophySection />
        <div className="section-divider w-[90%] max-w-6xl mx-auto"></div>
        <ResearchSection />
        <div className="section-divider w-[90%] max-w-6xl mx-auto"></div>
        <WorksSection />
        <div className="section-divider w-[90%] max-w-6xl mx-auto"></div>
        <SkillsSection />
        <div className="section-divider w-[90%] max-w-6xl mx-auto"></div>
        <EducationSection />
        <div className="section-divider w-[90%] max-w-6xl mx-auto"></div>
        <BlogSection posts={latestPosts} />
        <div className="section-divider w-[90%] max-w-6xl mx-auto"></div>
        <DocsSection docs={latestDocs} />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
