'use client';

const SKILLS = [
  { icon: '🤖', label: 'AI Automation',  sub: 'Claude, OpenAI, LangChain', category: 'ai-automation' },
  { icon: '⚙️', label: 'n8n Workflows',  sub: 'API integrations, bots',    category: 'n8n'           },
  { icon: '🦾', label: 'Robotics',        sub: 'EKF, AprilTag, ROS',        category: 'robotics'      },
  { icon: '🌿', label: 'Serenoil',        sub: 'AI customer service',       category: 'serenoil'      },
];

export default function SkillCards() {
  return (
    <section className="bg-cream pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SKILLS.map(s => (
            <a
              key={s.category}
              href={`/projects?category=${s.category}`}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-black/5 hover:shadow-md hover:-translate-y-1 hover:border-orange/30 transition-all duration-200"
            >
              <div className="text-4xl mb-3">{s.icon}</div>
              <div className="font-bold text-dark text-base leading-snug">{s.label}</div>
              <div className="text-sm text-muted mt-1 leading-snug">{s.sub}</div>
              <div className="mt-3 text-xs font-semibold text-orange opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                View projects
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
