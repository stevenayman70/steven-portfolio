import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { marked } from 'marked';
import { getProject, getProjects } from '@/lib/supabase';
import { CATEGORY_META, STATUS_META } from '@/lib/types';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) return { title: 'Not Found' };
  return { title: `${project.title} — Steven Ayman`, description: project.short_desc };
}

function toYouTubeEmbed(url: string | null): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  const cat       = CATEGORY_META[project.category];
  const embedUrl  = toYouTubeEmbed(project.youtube_url);
  const htmlBody  = project.long_desc ? await marked.parse(project.long_desc) : null;

  const catBadge = project.category === 'ai-automation' ? 'ai'
    : project.category === 'youtube' ? 'youtube'
    : project.category;
  const statusBadge = project.status === 'Completed' ? 'done'
    : project.status === 'In Progress' ? 'wip'
    : 'case';

  return (
    <>
      <Nav />
      <main className="bg-cream min-h-screen">
        <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">

          {/* Back */}
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-orange transition-colors mb-8">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            All Projects
          </Link>

          {/* Hero image */}
          {project.thumbnail_url ? (
            <img src={project.thumbnail_url} alt={project.title}
              className="w-full aspect-video object-cover rounded-3xl shadow-lg mb-8" />
          ) : (
            <div className="w-full aspect-video flex items-center justify-center rounded-3xl bg-white shadow-sm border border-black/5 text-7xl mb-8">
              {cat.icon}
            </div>
          )}

          {/* Badges */}
          <div className="flex gap-2 flex-wrap mb-4">
            <span className={`badge badge-${catBadge}`}>{cat.icon} {cat.label}</span>
            <span className={`badge badge-${statusBadge}`}>{project.status}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-dark mb-5 leading-tight">{project.title}</h1>

          {/* Tags */}
          {(project.tech_stack?.length ?? 0) > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {project.tech_stack.map(t => <span key={t} className="tag px-3 py-1 text-sm">{t}</span>)}
            </div>
          )}

          {/* Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 items-start">
            <div>
              {embedUrl && (
                <div className="mb-8">
                  <p className="font-mono text-xs text-muted uppercase tracking-widest mb-3">Demo Video</p>
                  <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl shadow-sm">
                    <iframe src={embedUrl} className="absolute inset-0 w-full h-full border-0" allowFullScreen loading="lazy" title={project.title} />
                  </div>
                </div>
              )}
              {htmlBody ? (
                <div className="prose prose-base max-w-none" dangerouslySetInnerHTML={{ __html: htmlBody }} />
              ) : (
                <p className="text-muted italic">No description provided yet.</p>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 space-y-4">
              {(project.github_url || project.live_url || project.youtube_url) && (
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/5">
                  <p className="text-xs font-bold text-muted uppercase tracking-widest mb-3">Links</p>
                  <div className="flex flex-col gap-2">
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2.5 px-3 py-2.5 bg-cream rounded-xl text-sm font-medium text-dark hover:bg-cream-dark transition-colors">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.02c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
                        View on GitHub
                      </a>
                    )}
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2.5 px-3 py-2.5 bg-orange text-white rounded-xl text-sm font-semibold hover:bg-orange-dark transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 flex-shrink-0"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        Live Demo
                      </a>
                    )}
                    {project.youtube_url && (
                      <a href={project.youtube_url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2.5 px-3 py-2.5 bg-cream rounded-xl text-sm font-medium text-dark hover:bg-cream-dark transition-colors">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0 text-red-600"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
                        Watch on YouTube
                      </a>
                    )}
                  </div>
                </div>
              )}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/5">
                <p className="text-xs font-bold text-muted uppercase tracking-widest mb-2">Added</p>
                <p className="text-sm font-medium text-dark">
                  {new Date(project.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
