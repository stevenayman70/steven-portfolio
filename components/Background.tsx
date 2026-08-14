const roles = [
  {
    period: 'Aug 2026 — Present',
    title: 'Founder & AI Automation Specialist',
    company: 'VIDA AI',
    meta: 'Self-employed · Hurghada, Egypt · Remote',
    copy: 'Building intelligent automation products and AI systems that turn complex, repetitive work into dependable workflows.',
    current: true,
  },
  {
    period: 'Jun 2026 — Present',
    title: 'AI Marketing Intern',
    company: 'FlyRank AI',
    meta: 'Internship · Cairo, Egypt · Remote',
    copy: 'Working at the intersection of artificial intelligence and marketing, building practical experience with AI-powered growth systems.',
    current: true,
  },
  {
    period: 'Oct 2025 — Present',
    title: 'AI Systems Engineer',
    company: 'Serenoil',
    meta: 'Freelance · Cairo, Egypt · Hybrid',
    copy: 'Designing and maintaining the AI systems that support Serenoil’s customer operations, commerce workflows and internal processes.',
    current: true,
  },
  {
    period: '2025 — Present',
    title: 'Founder',
    company: 'Serenoil',
    meta: 'Egyptian organic skincare brand',
    copy: 'Founded a premium Egyptian brand specializing in cold-pressed jojoba oil, and designed its identity, product experience and complete commerce website.',
    current: true,
  },
  {
    period: '2025 — Aug 2026',
    title: 'Automation Developer',
    company: 'Serenoil',
    meta: 'AI commerce operations',
    copy: 'Built a complete AI automation stack from scratch, reducing manual operations and allowing routine business tasks to run autonomously.',
    current: false,
  },
  {
    period: '2020 — Present',
    title: 'AI & Technology Content Creator',
    company: 'Steven Ayman Tawfik · YouTube',
    meta: 'Independent creator',
    copy: 'Create technical videos and tutorials about AI tools, Claude AI, Claude Code and practical technology workflows.',
    current: true,
  },
];

export default function Background(){return <section id="experience" className="bg-ink px-6 py-24 text-white sm:py-28"><div className="mx-auto max-w-6xl"><div className="mb-14 grid gap-7 lg:grid-cols-[1fr_.6fr]"><div><p className="eyebrow text-lime">Career timeline</p><h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-.05em] sm:text-6xl">Building AI systems across products, brands and content.</h2></div><p className="self-end text-sm leading-7 text-white/45">A career focused on applying AI and automation to real business operations—from early product ideas to systems running in production.</p></div><div className="grid gap-4 lg:grid-cols-2">{roles.map((role,i)=><article key={`${role.title}-${role.company}`} className={`group relative overflow-hidden rounded-[2rem] border p-7 transition duration-300 hover:-translate-y-1 ${i===0?'border-lime bg-lime text-ink lg:col-span-2 lg:grid lg:grid-cols-[.65fr_1.35fr] lg:gap-12':'border-white/10 bg-white/[.04] hover:border-lime/35'}`}><div><div className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${role.current?(i===0?'bg-ink':'bg-lime shadow-[0_0_10px_#b7ff5a]'):'bg-white/25'}`}/><p className={`font-mono text-[9px] uppercase tracking-[.16em] ${i===0?'text-ink/55':'text-white/35'}`}>{role.period}</p></div><p className={`mt-5 font-mono text-[10px] uppercase tracking-widest ${i===0?'text-green':'text-lime'}`}>{role.company}</p></div><div className={i===0?'mt-8 lg:mt-0':''}><h3 className={`text-2xl font-semibold tracking-tight ${i===0?'sm:text-4xl':''}`}>{role.title}</h3><p className={`mt-2 text-xs ${i===0?'text-ink/50':'text-white/35'}`}>{role.meta}</p><p className={`mt-5 text-sm leading-7 ${i===0?'text-ink/70':'text-white/50'}`}>{role.copy}</p></div></article>)}</div><div className="mt-5 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-white/10 p-5"><p className="font-mono text-[9px] uppercase tracking-widest text-lime">Education</p><p className="mt-3 text-sm">E-JUST · Innovative Design School</p></div><div className="rounded-2xl bg-white p-5 text-ink"><p className="font-mono text-[9px] uppercase tracking-widest text-green">Performance</p><p className="mt-3 text-sm font-semibold">A+ · CGPA 3.83 / 4.00</p></div><div className="rounded-2xl border border-white/10 p-5"><p className="font-mono text-[9px] uppercase tracking-widest text-lime">Languages</p><p className="mt-3 text-sm">Arabic · English</p></div></div></div></section>}
