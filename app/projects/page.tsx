import { Suspense } from 'react';
import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import ProjectsClient from '@/components/ProjectsClient';
import Footer from '@/components/Footer';
import { getProjects } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Projects — Steven Ayman',
  description: 'All projects by Steven Ayman — AI automation, n8n workflows, robotics, web development, and more.',
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <Nav />
      <main className="bg-cream min-h-screen pt-24">
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <p className="text-orange font-bold text-sm uppercase tracking-widest mb-2">All Work</p>
          <h1 className="text-5xl md:text-6xl font-black text-dark">Projects</h1>
          <p className="text-muted mt-3 text-lg">{projects.length} projects across 6 domains</p>
        </div>

        <Suspense fallback={null}>
          <ProjectsClient initialProjects={projects} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
