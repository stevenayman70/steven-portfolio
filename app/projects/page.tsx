import { Suspense } from 'react';
import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import ProjectsClient from '@/components/ProjectsClient';
import Footer from '@/components/Footer';
import { getProjects } from '@/lib/supabase';
import { CATEGORY_META } from '@/lib/types';

export const metadata: Metadata = { title: 'AI Projects — Steven Ayman Tawfik', description: 'AI systems, intelligent automations, and AI-enabled products built by Steven Ayman Tawfik.' };
export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <><Nav /><main className="min-h-screen bg-mist pt-32"><div className="mx-auto mb-4 max-w-7xl px-6 lg:px-10"><p className="eyebrow">Selected systems</p><h1 className="section-title mt-4">AI work, built to ship.</h1><p className="mt-5 text-lg text-slate">{projects.length} projects across {Object.keys(CATEGORY_META).length} AI-focused capabilities.</p></div><Suspense fallback={null}><ProjectsClient initialProjects={projects} /></Suspense></main><Footer /></>;
}
