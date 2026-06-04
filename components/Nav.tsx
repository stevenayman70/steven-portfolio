'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Nav() {
  const pathname = usePathname();
  const onHome   = pathname === '/';

  const href = (anchor: string) => onHome ? anchor : `/${anchor}`;

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Left — logo (home link) */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/steven ayman logo.png"
            alt="Steven Ayman"
            width={120}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Center — nav links */}
        <nav className="hidden md:flex items-center gap-1 bg-cream rounded-full px-2 py-1.5">
          <a href={href('#about-me')}
            className="px-4 py-1.5 rounded-full text-sm font-semibold text-dark hover:text-orange transition-colors">
            About
          </a>
          <Link href="/projects"
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              pathname === '/projects' ? 'bg-orange text-white shadow-sm' : 'text-dark hover:text-orange'
            }`}>
            Projects
          </Link>
          <a href={href('#contact')}
            className="px-4 py-1.5 rounded-full text-sm font-semibold text-dark hover:text-orange transition-colors">
            Contact
          </a>
        </nav>

        {/* Right — social links + CTA + admin */}
        <div className="flex items-center gap-1.5">
          {/* Social icons */}
          <div className="hidden md:flex items-center gap-1 mr-1">
            <a href="https://github.com/stevenayman70" target="_blank" rel="noopener noreferrer" title="GitHub"
              className="w-8 h-8 flex items-center justify-center rounded-full text-muted hover:text-dark hover:bg-cream transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.02c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/steven-ayman-484119224" target="_blank" rel="noopener noreferrer" title="LinkedIn"
              className="w-8 h-8 flex items-center justify-center rounded-full text-muted hover:text-dark hover:bg-cream transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z"/></svg>
            </a>
            <a href="https://www.youtube.com/@stevenayman9818" target="_blank" rel="noopener noreferrer" title="YouTube"
              className="w-8 h-8 flex items-center justify-center rounded-full text-muted hover:text-dark hover:bg-cream transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
            </a>
            <a href="https://www.serenoil.com" target="_blank" rel="noopener noreferrer" title="Serenoil"
              className="w-8 h-8 flex items-center justify-center rounded-full text-muted hover:text-dark hover:bg-cream transition-colors text-base leading-none">
              🌿
            </a>
          </div>

          <a
            href="mailto:stevenayman1111@gmail.com"
            className="hidden sm:inline-flex px-4 py-2 bg-orange hover:bg-orange-dark text-white text-sm font-bold rounded-full transition-colors"
          >
            Get in Touch
          </a>
          <Link
            href="/admin"
            className="w-9 h-9 flex items-center justify-center bg-cream border border-black/10 rounded-full text-muted hover:text-dark hover:border-black/20 transition-colors text-base"
            title="Admin"
          >
            ⚙
          </Link>
        </div>

      </div>
    </header>
  );
}
