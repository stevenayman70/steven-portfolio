interface HeroProps { totalProjects: number; completedProjects: number }

export default function Hero({ totalProjects, completedProjects }: HeroProps) {
  return <section className="relative min-h-screen overflow-hidden bg-ink px-6 pb-20 pt-32 text-white sm:pt-40">
    <div className="orb orb-one"/><div className="orb orb-two"/>
    <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.08fr_.92fr]">
      <div className="relative z-10">
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[.04] px-4 py-2 font-mono text-[10px] uppercase tracking-[.18em] text-white/60"><span className="signal-dot h-2 w-2 rounded-full bg-lime"/>Available for AI automation projects</div>
        <p className="mb-5 font-mono text-xs uppercase tracking-[.25em] text-lime">Steven Ayman Tawfik · AI Automation Engineer</p>
        <h1 className="max-w-3xl text-5xl font-semibold leading-[.96] tracking-[-.065em] sm:text-7xl lg:text-[5.5rem]">I turn busywork into <span className="text-lime">intelligent systems.</span></h1>
        <p className="mt-8 max-w-xl text-base leading-8 text-white/55 sm:text-lg">Founder of Serenoil and VIDA AI. I build AI agents, connected workflows and practical products that help teams operate smarter and scale.</p>
        <div className="mt-10 flex flex-wrap gap-4"><a href="#work" className="rounded-full bg-lime px-6 py-3 font-mono text-xs font-bold text-ink transition hover:-translate-y-1">Explore the systems ↘</a><a href="#contact" className="rounded-full border border-white/15 px-6 py-3 font-mono text-xs text-white/70 transition hover:border-lime hover:text-lime">Start a conversation</a></div>
        <div className="mt-14 flex gap-10 border-t border-white/10 pt-6"><div><b className="text-2xl">{totalProjects}+</b><p className="mt-1 text-xs text-white/35">AI builds</p></div><div><b className="text-2xl">{completedProjects}</b><p className="mt-1 text-xs text-white/35">shipped</p></div><div><b className="text-2xl">24/7</b><p className="mt-1 text-xs text-white/35">automation</p></div></div>
      </div>
      <div className="command-panel relative mx-auto w-full max-w-lg rounded-[2rem] border border-white/10 bg-[#161e1a] p-5 shadow-2xl shadow-black/40 sm:p-6">
        <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4"><div className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-green/50"/><i className="h-2.5 w-2.5 rounded-full bg-lime/40"/><i className="h-2.5 w-2.5 rounded-full bg-lime"/></div><span className="font-mono text-[9px] uppercase tracking-widest text-white/30">Ayman OS / Live</span></div>
        <div className="relative mb-4 h-72 overflow-hidden rounded-2xl border border-white/10 bg-green/20 sm:h-80">
          <img src="/me.jpeg" alt="Steven Ayman Tawfik" className="absolute inset-0 h-full w-full object-cover object-[center_24%]"/>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent"/>
          <div className="absolute inset-x-0 bottom-0 p-6"><span className="font-mono text-[9px] uppercase tracking-[.18em] text-lime">AI Automation Engineer</span><p className="mt-2 text-2xl font-semibold">Steven Ayman Tawfik</p><p className="mt-1 text-[11px] text-white/55">Founder · VIDA AI & Serenoil</p></div>
        </div>
        <div className="space-y-3">{[['01','UNDERSTAND','Read the request and business context'],['02','REASON','Choose the right data, tool and action'],['03','AUTOMATE','Execute, verify and keep humans informed']].map(([n,title,copy],i)=><div key={n} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border border-white/10 bg-white/[.035] p-4 transition hover:border-lime/40"><span className="font-mono text-[10px] text-lime">{n}</span><div><b className="font-mono text-xs tracking-wider">{title}</b><p className="mt-1 text-[11px] leading-5 text-white/35">{copy}</p></div><span className={`h-2 w-2 rounded-full ${i===2?'bg-lime shadow-[0_0_12px_#b7ff5a]':'bg-green'}`}/></div>)}</div>
        <div className="mt-5 grid grid-cols-3 gap-3 font-mono text-[9px]"><div className="rounded-xl bg-lime p-3 text-ink"><b className="block text-lg">8.4s</b>response</div><div className="rounded-xl bg-white/[.05] p-3 text-white/45"><b className="block text-lg text-white">12</b>tools ready</div><div className="rounded-xl bg-green/20 p-3 text-white/45"><b className="block text-lg text-lime">99%</b>verified</div></div>
      </div>
    </div>
  </section>
}
