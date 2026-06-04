import Link from 'next/link';
import type { Project } from '@/lib/types';
import { CATEGORY_META } from '@/lib/types';

interface Props { project: Project; index: number }

export default function ProjectCard({ project: p, index }: Props) {
  const cat = CATEGORY_META[p.category];

  return (
    <Link
      href={`/project/${p.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Thumbnail — dominant */}
      <div className="aspect-video overflow-hidden bg-cream-dark">
        {p.thumbnail_url ? (
          <img
            src={p.thumbnail_url}
            alt={p.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-cream to-cream-dark">
            {cat.icon}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-dark text-lg leading-snug truncate">{p.title}</h3>
            <p className="text-muted text-sm mt-1 line-clamp-2 leading-relaxed">{p.short_desc}</p>
          </div>
          <div
            className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-orange text-white rounded-full group-hover:bg-orange-dark transition-colors mt-0.5"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
              <line x1="7" y1="17" x2="17" y2="7"/>
              <polyline points="7 7 17 7 17 17"/>
            </svg>
          </div>
        </div>

        {/* Tags */}
        {(p.tech_stack ?? []).length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {(p.tech_stack ?? []).slice(0, 4).map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
            {(p.tech_stack ?? []).length > 4 && (
              <span className="tag">+{p.tech_stack.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
