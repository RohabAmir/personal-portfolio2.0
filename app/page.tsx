
import Approaches from "@/components/Approaches";
import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { navItems } from "@/data";

export default function Home() {
  return (
    <main className="relative bg-white dark:bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip transition-colors duration-300">
      <div className="max-w-7xl w-full">
        <ThemeToggle />
        <FloatingNav navItems={navItems}/>
        <Hero/>
        <Grid/>
        <RecentProjects/>
        <Clients/>
        <Experience/>
        <Approaches/>
        <Footer/>
      </div>
    </main>
  );
}
