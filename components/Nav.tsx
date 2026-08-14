'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function GitHubIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.29 9.4 7.86 10.94.57.1.78-.25.78-.55v-1.94c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" /></svg>;
}
function LinkedInIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" /></svg>;
}
function YouTubeIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M23.5 6.2a3 3 0 0 0-2.11-2.13C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.39.57A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.11 2.13C4.5 20.5 12 20.5 12 20.5s7.5 0 9.39-.57a3 3 0 0 0 2.11-2.13A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" /></svg>;
}
function InstagramIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.8c-3.14 0-3.5.01-4.73.07-1.02.05-1.58.22-1.94.36-.49.19-.84.42-1.2.79-.37.36-.6.71-.8 1.2-.14.36-.3.92-.36 1.94-.06 1.23-.07 1.6-.07 4.73s.01 3.5.07 4.73c.05 1.02.22 1.58.36 1.94.19.49.42.84.79 1.2.36.37.71.6 1.2.8.36.14.92.3 1.94.36 1.23.06 1.6.07 4.73.07s3.5-.01 4.73-.07c1.02-.05 1.58-.22 1.94-.36.49-.19.84-.42 1.2-.79.37-.36.6-.71.8-1.2.14-.36.3-.92.36-1.94.06-1.23.07-1.6.07-4.73s-.01-3.5-.07-4.73c-.05-1.02-.22-1.58-.36-1.94a3.2 3.2 0 0 0-.79-1.2 3.2 3.2 0 0 0-1.2-.8c-.36-.14-.92-.3-1.94-.36-1.23-.06-1.6-.07-4.73-.07Zm0 4.6a5.44 5.44 0 1 1 0 10.88 5.44 5.44 0 0 1 0-10.88Zm0 1.8a3.64 3.64 0 1 0 0 7.28 3.64 3.64 0 0 0 0-7.28Zm5.66-2a1.27 1.27 0 1 1 0 2.55 1.27 1.27 0 0 1 0-2.55Z" /></svg>;
}

const socials = [
  { label: 'GitHub', url: 'https://github.com/stevenayman70', Icon: GitHubIcon },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/steven-ayman-tawfik-484119224/', Icon: LinkedInIcon },
  { label: 'YouTube', url: 'https://www.youtube.com/@stevenayman9818', Icon: YouTubeIcon },
  { label: 'Instagram', url: 'https://www.instagram.com/steventawfik/', Icon: InstagramIcon },
];

export default function Nav() {
  const pathname = usePathname();
  const href = (id: string) => pathname === '/' ? id : `/${id}`;
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="mx-auto flex h-14 max-w-6xl items-center rounded-full border border-white/10 bg-ink/90 px-4 text-white shadow-xl shadow-black/10 backdrop-blur-xl sm:px-5">
        <Link href="/" className="mr-auto flex items-center gap-2 font-mono text-xs font-bold whitespace-nowrap">
          <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-lime text-ink">S</span>
          Steven Ayman Tawfik
        </Link>
        <div className="hidden items-center gap-6 font-mono text-[10px] uppercase tracking-wider text-white/50 lg:flex">
          <a href={href('#about')} className="hover:text-lime">Profile</a>
          <a href={href('#experience')} className="hover:text-lime">Background</a>
          <a href={href('#process')} className="hover:text-lime">Method</a>
          <a href={href('#work')} className="hover:text-lime">Work</a>
        </div>
        <div className="ml-5 hidden gap-3 text-white/35 sm:flex">
          {socials.map(({ label, url, Icon }) => (
            <a key={label} href={url} target="_blank" rel="noreferrer" className="transition hover:text-lime" aria-label={label}>
              <Icon />
            </a>
          ))}
        </div>
        <a href={href('#contact')} className="ml-4 rounded-full bg-lime px-4 py-2 font-mono text-[10px] font-bold text-ink">LET'S TALK ↗</a>
      </nav>
    </header>
  );
}
