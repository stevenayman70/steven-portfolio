import Link from 'next/link';
import type { Project } from '@/lib/types';
import { CATEGORY_META, STATUS_META } from '@/lib/types';

interface Props { project: Project; index: number }

export default function ProjectCard({ project: p }: Props) {
  const cat = CATEGORY_META[p.category];
  const statusKey = p.status === 'Completed' ? 'done' : p.status === 'In Progress' ? 'wip' : 'case';

  return (
    <Link
      href={`/project/${p.slug}`}
      className="group flex items-center gap-5 bg-white rounded-2xl border border-black/5 px-5 py-5 sm:px-6 sm:py-6 hover:border-orange/30 hover:shadow-md transition-all duration-300"
    >
      <div className="hidden sm:flex flex-shrink-0 w-12 h-12 items-center justify-center rounded-xl bg-cream text-lg font-mono text-muted group-hover:bg-orange/10 group-hover:text-orange transition-colors">
        {cat.icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`badge ${cat.badgeClass}`}>{cat.icon} {cat.label}</span>
          <span className={`badge badge-${statusKey}`}>{STATUS_META[p.status].label}</span>
        </div>
        <h3 className="font-bold text-dark text-lg leading-snug">{p.title}</h3>
        <p className="text-muted text-sm mt-1 line-clamp-2 leading-relaxed">{p.short_desc}</p>

        {(p.tech_stack ?? []).length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {(p.tech_stack ?? []).slice(0, 5).map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
            {(p.tech_stack ?? []).length > 5 && (
              <span className="tag">+{p.tech_stack.length - 5}</span>
            )}
          </div>
        )}
      </div>

      <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-cream text-dark rounded-full group-hover:bg-orange group-hover:text-white transition-colors">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
          <line x1="7" y1="17" x2="17" y2="7"/>
          <polyline points="7 7 17 7 17 17"/>
        </svg>
      </div>
    </Link>
  );
}
