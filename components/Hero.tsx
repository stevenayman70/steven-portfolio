'use client';

interface HeroProps {
  totalProjects:     number;
  completedProjects: number;
}

export default function Hero({ totalProjects, completedProjects }: HeroProps) {
  return (
    <section id="about" className="min-h-screen bg-cream flex items-center pt-20 pb-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left — text */}
        <div className="animate-fade-up">
          <h1 className="text-7xl md:text-8xl font-black text-dark leading-[0.9] tracking-tight">
            Steven<br />Ayman
          </h1>

          <div className="mt-5 inline-block bg-dark text-cream px-4 py-1.5 rounded text-sm font-bold uppercase tracking-widest">
            AI Systems Engineer · Mechatronics
          </div>

          <p className="mt-6 text-muted text-lg leading-relaxed max-w-md">
            Building agentic AI systems, automation workflows, and intelligent
            machines — at the intersection of robotics, LLMs, and real-world engineering.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/projects" className="px-6 py-3 bg-orange hover:bg-orange-dark text-white font-bold rounded-full transition-colors shadow-sm">
              View Projects
            </a>
            <a href="mailto:stevenayman1111@gmail.com" className="px-6 py-3 bg-white hover:bg-cream-dark text-dark font-semibold rounded-full border border-black/10 transition-colors">
              Get in Touch
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-10 pt-8 border-t border-black/10">
            <div>
              <div className="text-4xl font-black text-dark">{totalProjects || '0'}</div>
              <div className="text-sm text-muted mt-0.5">Projects</div>
            </div>
            <div>
              <div className="text-4xl font-black text-dark">{completedProjects || '0'}</div>
              <div className="text-sm text-muted mt-0.5">Completed</div>
            </div>
            <div>
              <div className="text-4xl font-black text-dark">6</div>
              <div className="text-sm text-muted mt-0.5">Domains</div>
            </div>
          </div>
        </div>

        {/* Right — photo */}
        <div className="flex items-center justify-center animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-orange/15 scale-110" />
            <div className="absolute inset-0 rounded-full border-2 border-orange/30 scale-125" />
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gradient-to-br from-cream to-cream-dark">
              <img
                src="/me.jpeg"
                alt="Steven Ayman"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
