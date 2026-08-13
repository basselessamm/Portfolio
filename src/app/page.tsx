import Navbar from "@/components/Navbar";
import CanvasBackground from "@/components/CanvasBackground";
import Hero from "@/components/Hero";
import PhilosophySection from "@/components/PhilosophySection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <CanvasBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <PhilosophySection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
