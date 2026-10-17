
import Approaches from "@/components/Approaches";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import ProfessionalExperience from "@/components/ProfessionalExperience";
import RecentProjects from "@/components/RecentProjects";
import TechStack from "@/components/TechStack";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";

export default function Home() {
  return (
    <main className="relative bg-white dark:bg-black-100 bg-dot-black/[0.08] dark:bg-dot-white/[0.15] flex justify-center items-center flex-col mx-auto sm:px-0 px-5 overflow-clip transition-colors duration-300">
      <FloatingNav navItems={navItems}/>
      <div className="relative -mx-5  w-[calc(100%+2.5rem)] sm:-mx-10 sm:w-[calc(100%+5rem)]">
        <Hero/>
        <Grid/>
      </div>
      <div className="max-w-7xl w-full">
        <TechStack />
        <RecentProjects/>
        <Clients/>
        <Experience/>
        <ProfessionalExperience/>
        <Approaches/>
        <Contact/>
        <Footer/>
      </div>
    </main>
  );
}