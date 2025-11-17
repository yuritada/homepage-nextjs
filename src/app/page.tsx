import Header from '@/components/Header'
import AboutSection from '@/components/AboutSection'
import SkillsSection from '@/components/SkillsSection'
import ProjectsSection from '@/components/ProjectsSection'
import EducationSection from '@/components/EducationSection'
import AchievementsSection from '@/components/AchievementsSection' // 1. インポート
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export default function Home() {
  return (
    <main>
      <Header />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <AchievementsSection /> {/* 2. ここに追加 */}
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
