
import Approaches from "@/components/Approaches";
import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import ProfessionalExperience from "@/components/ProfessionalExperience";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";

export default function Home() {
  return (
    <main className="relative bg-white dark:bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip transition-colors duration-300">
      <FloatingNav navItems={navItems}/>
      <div className="relative -mx-5  w-[calc(100%+2.5rem)] sm:-mx-10 sm:w-[calc(100%+5rem)]">
        <Hero/>
        <Grid/>
      </div>
      <div className="max-w-7xl w-full">
        <RecentProjects/>
        <Clients/>
        <Experience/>
        <ProfessionalExperience/>
        <Approaches/>
        <Footer/>
      </div>
    </main>
  );
}