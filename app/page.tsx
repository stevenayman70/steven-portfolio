import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import SkillCards from '@/components/SkillCards';
import About from '@/components/About';
import FeaturedProjects from '@/components/FeaturedProjects';
import Footer from '@/components/Footer';
import { getProjects } from '@/lib/supabase';

export const revalidate = 60;

export default async function Home() {
  const allProjects  = await getProjects();
  const featured     = allProjects.filter(p => p.featured);
  const totalDone    = allProjects.filter(p => p.status === 'Completed').length;

  return (
    <>
      <Nav />
      <main>
        <Hero totalProjects={allProjects.length} completedProjects={totalDone} />
        <SkillCards />
        <About />
        <FeaturedProjects projects={featured} />
      </main>
      <Footer />
    </>
  );
}
