import Link from 'next/link';
import type { Project } from '@/lib/types';
import { CATEGORY_META } from '@/lib/types';

interface Props { projects: Project[] }

export default function FeaturedProjects({ projects }: Props) {
  if (projects.length === 0) return null;

  return (
    <section id="work" className="bg-mist py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow">Selected systems</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] text-ink sm:text-6xl">Proof, not promises.</h2>
          </div>
          <div className="md:justify-self-end">
            <p className="max-w-lg text-lg leading-8 text-slate">A selection of AI systems designed around real operational problems and measurable outcomes.</p>
            <Link href="/projects" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-ink transition hover:text-green">View all projects <span>↗</span></Link>
          </div>
        </div>

        <div className="flex flex-col divide-y divide-ink/10 overflow-hidden rounded-[2rem] border border-ink/10 bg-white">
          {projects.map((project, index) => {
            const category = CATEGORY_META[project.category];
            const statusKey = project.status === 'Completed' ? 'done' : project.status === 'In Progress' ? 'wip' : 'case';
            return (
              <Link
                key={project.id}
                href={`/project/${project.slug}`}
                className="group flex flex-col gap-4 px-6 py-7 transition duration-300 hover:bg-mist sm:flex-row sm:items-center sm:gap-8 sm:px-10 sm:py-8"
              >
                <span className="flex-shrink-0 self-start rounded-full bg-ink px-3 py-1.5 font-mono text-xs text-lime sm:self-center">System 0{index + 1}</span>

                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className={`badge ${category.badgeClass}`}>{category.icon} {category.label}</span>
                    <span className={`badge badge-${statusKey}`}>{project.status}</span>
                  </div>
                  <h3 className="text-2xl font-semibold leading-tight tracking-[-.035em] text-ink">{project.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate sm:text-base">{project.short_desc}</p>
                  {(project.tech_stack ?? []).length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-3">
                      {(project.tech_stack ?? []).slice(0, 5).map(tool => <span key={tool} className="font-mono text-[11px] text-slate">{tool}</span>)}
                    </div>
                  )}
                </div>

                <span className="hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-ink text-lg text-white transition duration-300 group-hover:rotate-45 group-hover:bg-lime group-hover:text-ink sm:flex">↗</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
