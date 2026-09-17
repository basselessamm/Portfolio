import Navbar from "@/components/Navbar";
import CanvasBackground from "@/components/CanvasBackground";
import Hero from "@/components/Hero";
import SchemaExplorer from "@/components/SchemaExplorer";
import PhilosophySection from "@/components/PhilosophySection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getPortfolioData } from "@/lib/storage";

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <>
      <CanvasBackground />
      <Navbar identity={data.identity} />
      <main className="relative z-10">
        <Hero identity={data.identity} intro={data.intro} />
        <SchemaExplorer />
        <PhilosophySection philosophy={data.philosophy} />
        <SkillsSection skills={data.skills} projects={data.projects} />
        <ProjectsSection projects={data.projects} />
        <EducationSection education={data.education} />
        <ContactSection identity={data.identity} />
      </main>
      <Footer identity={data.identity} />
    </>
  );
}
