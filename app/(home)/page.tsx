import { HeroSection } from "@/components/page-ui/hero-section"
import { AboutSection } from "@/components/page-ui/about-section"
import { ExperienceSection } from "@/components/page-ui/experience-section"
import { EducationSection } from "@/components/page-ui/education-section"
import { SkillsSection } from "@/components/page-ui/skills-section"
import { ProjectsSection } from "@/components/page-ui/projects-section"
import { ContactSection } from "@/components/page-ui/contact-section"

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  )
}

