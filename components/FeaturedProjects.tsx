import Link from 'next/link';
import type { Project } from '@/lib/types';
import { CATEGORY_META, STATUS_META } from '@/lib/types';

interface Props { projects: Project[] }

export default function FeaturedProjects({ projects }: Props) {
  if (projects.length === 0) return null;

  const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
      <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
    </svg>
  );

  return (
    <section className="bg-cream py-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-orange font-bold text-sm uppercase tracking-widest mb-2">Selected</p>
            <h2 className="text-5xl md:text-6xl font-black text-dark">Featured Work</h2>
          </div>
          <a
            href="/projects"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-black/10 rounded-full text-sm font-semibold text-dark hover:border-orange hover:text-orange transition-colors"
          >
            View all projects →
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => {
            const cat    = CATEGORY_META[p.category];
            const catKey = p.category === 'ai-automation' ? 'ai' : p.category === 'youtube' ? 'youtube' : p.category;
            const stsKey = p.status === 'Completed' ? 'done' : p.status === 'In Progress' ? 'wip' : 'case';

            return (
              <Link
                key={p.id}
                href={`/project/${p.slug}`}
                className="group bg-white rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Thumbnail */}
                <div className="aspect-video overflow-hidden bg-cream-dark">
                  {p.thumbnail_url ? (
                    <img src={p.thumbnail_url} alt={p.title} loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-cream to-cream-dark">
                      {cat.icon}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-5">
                  <div className="flex gap-1.5 mb-3">
                    <span className={`badge badge-${catKey}`}>{cat.icon} {cat.label}</span>
                    <span className={`badge badge-${stsKey}`}>{p.status}</span>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-dark text-base leading-snug">{p.title}</h3>
                      <p className="text-muted text-sm mt-1 line-clamp-2 leading-relaxed">{p.short_desc}</p>
                    </div>
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-orange text-white rounded-full group-hover:bg-orange-dark transition-colors mt-0.5">
                      <ArrowIcon />
                    </div>
                  </div>
                  {(p.tech_stack ?? []).length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {(p.tech_stack ?? []).slice(0, 3).map(t => <span key={t} className="tag">{t}</span>)}
                      {(p.tech_stack ?? []).length > 3 && <span className="tag">+{p.tech_stack.length - 3}</span>}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center md:hidden">
          <a href="/projects" className="inline-flex items-center gap-2 px-6 py-3 bg-dark text-cream font-bold rounded-full hover:bg-dark/80 transition-colors">
            View all {projects.length > 0 ? '33' : ''} projects →
          </a>
        </div>
      </div>
    </section>
  );
}
