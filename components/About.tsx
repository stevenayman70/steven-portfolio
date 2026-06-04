const FACTS = [
  { icon: '🎓', label: 'Degree',    value: 'Mechatronics Engineering' },
  { icon: '📍', label: 'Location',  value: 'Hurghada, Egypt'          },
  { icon: '🤖', label: 'Specialty', value: 'Agentic AI & Automation'  },
  { icon: '🌿', label: 'Founder',   value: 'Serenoil Brand'           },
];

const TOOLS = [
  'Claude API', 'n8n', 'Python', 'Node.js', 'Next.js',
  'Supabase', 'ROS 2', 'MATLAB', 'Make.com', 'Telegram API',
  'Remotion', 'Playwright', 'OpenAI', 'React', 'TypeScript',
];

export default function About() {
  return (
    <section id="about-me" className="bg-white py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — bio */}
          <div>
            <p className="text-orange font-bold text-sm uppercase tracking-widest mb-3">About Me</p>
            <h2 className="text-4xl md:text-5xl font-black text-dark leading-tight mb-6">
              I build systems that<br />think, automate & ship.
            </h2>

            <div className="space-y-4 text-muted text-base leading-relaxed">
              <p>
                I'm <strong className="text-dark">Steven Ayman</strong> — an AI Systems Engineer and
                Mechatronics graduate based in Hurghada, Egypt. I design and build agentic AI systems,
                intelligent automation pipelines, and full-stack applications that solve real business problems.
              </p>
              <p>
                My engineering background gives me a rare combination: I understand both the low-level
                hardware (robotics, control systems, sensor fusion) and the high-level AI layer
                (LLM agents, RAG systems, multi-step automation). I use tools like <strong className="text-dark">Claude API</strong>,{' '}
                <strong className="text-dark">n8n</strong>, and <strong className="text-dark">Python</strong> to
                build systems that qualify leads, fulfil orders, reply to customers, generate content,
                and monitor portfolios — all without human intervention.
              </p>
              <p>
                I also run <strong className="text-dark">Serenoil</strong>, a premium Egyptian oils brand,
                where I personally automate every part of the operation — from Instagram DM replies powered
                by Claude, to automatic Bosta shipment creation on payment confirmation.
              </p>
              <p>
                Every project I share here is deployed and solving a real problem. No toy demos.
              </p>
            </div>

            <a
              href="mailto:stevenayman1111@gmail.com"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-orange hover:bg-orange-dark text-white font-bold rounded-full transition-colors"
            >
              Let's Work Together →
            </a>
          </div>

          {/* Right — facts + tools */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {FACTS.map(f => (
                <div key={f.label} className="bg-cream rounded-2xl p-5 border border-black/5">
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <div className="text-xs font-bold text-muted uppercase tracking-wide mb-1">{f.label}</div>
                  <div className="font-bold text-dark text-sm">{f.value}</div>
                </div>
              ))}
            </div>

            <div className="bg-cream rounded-2xl p-6 border border-black/5">
              <p className="text-xs font-bold text-muted uppercase tracking-widest mb-4">Tools & Technologies</p>
              <div className="flex flex-wrap gap-2">
                {TOOLS.map(t => (
                  <span key={t} className="px-3 py-1.5 bg-white border border-black/10 rounded-full text-sm font-medium text-dark">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
