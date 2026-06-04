'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProjectCard from './ProjectCard';
import type { Project, Category } from '@/lib/types';
import { CATEGORY_META } from '@/lib/types';

interface Props { initialProjects: Project[] }

type Filter = 'all' | Category;

const FILTERS: { value: Filter; label: string; icon: string }[] = [
  { value: 'all',           label: 'All',          icon: '' },
  { value: 'ai-automation', label: 'AI Automation', icon: '🤖' },
  { value: 'n8n',           label: 'n8n',           icon: '⚙️' },
  { value: 'serenoil',      label: 'Serenoil',      icon: '🌿' },
  { value: 'robotics',      label: 'Robotics',      icon: '🦾' },
  { value: 'web',           label: 'Web Dev',        icon: '🌐' },
  { value: 'youtube',       label: 'YouTube',        icon: '📹' },
];

export default function ProjectsClient({ initialProjects }: Props) {
  const searchParams = useSearchParams();
  const [active, setActive] = useState<Filter>(() => {
    const cat = searchParams.get('category');
    const valid: Filter[] = ['all','ai-automation','n8n','serenoil','robotics','web','youtube'];
    return valid.includes(cat as Filter) ? (cat as Filter) : 'all';
  });

  useEffect(() => {
    const cat = searchParams.get('category');
    const valid: Filter[] = ['all','ai-automation','n8n','serenoil','robotics','web','youtube'];
    if (cat && valid.includes(cat as Filter)) setActive(cat as Filter);
  }, [searchParams]);

  const filtered = active === 'all'
    ? initialProjects
    : initialProjects.filter(p => p.category === active);

  const counts = initialProjects.reduce<Partial<Record<Filter, number>>>(
    (acc, p) => ({ ...acc, [p.category]: (acc[p.category as Filter] ?? 0) + 1 }),
    { all: initialProjects.length }
  );

  return (
    <section id="projects" className="bg-cream py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section heading */}
        <div className="mb-10">
          <p className="text-orange font-bold text-sm uppercase tracking-widest mb-2">Selected</p>
          <h2 className="text-5xl md:text-6xl font-black text-dark">Projects</h2>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-150 ${
                active === f.value
                  ? 'bg-dark text-cream border-dark'
                  : 'bg-white text-muted border-black/10 hover:border-dark/30 hover:text-dark'
              }`}
            >
              {f.icon && <span>{f.icon}</span>}
              {f.label}
              <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                active === f.value ? 'bg-white/20 text-cream' : 'bg-cream text-muted'
              }`}>
                {counts[f.value] ?? 0}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-sm font-medium">No projects in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {filtered.map((p, i) => (
              <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <ProjectCard project={p} index={i} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
