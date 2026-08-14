const links = [
  ['LinkedIn', 'https://www.linkedin.com/in/steven-ayman-tawfik-484119224/'],
  ['GitHub', 'https://github.com/stevenayman70'],
  ['YouTube', 'https://www.youtube.com/@stevenayman9818'],
  ['Instagram', 'https://www.instagram.com/steventawfik/'],
];

function MailIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" /><polyline points="22,6 12,13 2,6" /></svg>;
}

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.78-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01s-.52.07-.79.37c-.27.3-1.04 1.02-1.04 2.48s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" /><path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5.15-1.35A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Zm0 18.06a8.05 8.05 0 0 1-4.1-1.12l-.29-.18-3.06.8.82-2.98-.19-.3a8.05 8.05 0 0 1-1.24-4.28c0-4.45 3.62-8.08 8.08-8.08s8.07 3.62 8.07 8.08c0 4.45-3.62 8.06-8.09 8.06Z" /></svg>;
}

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink px-6 pb-8 pt-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 border-b border-white/10 pb-20 lg:grid-cols-[1.25fr_.75fr]">
          <div>
            <p className="eyebrow text-lime">New project signal</p>
            <h2 className="mt-5 max-w-3xl text-5xl font-semibold leading-[.98] tracking-[-.06em] sm:text-7xl">Have a workflow that should run itself?</h2>
            <a href="mailto:stevenayman1111@gmail.com" className="mt-10 inline-flex rounded-full bg-lime px-6 py-3 font-mono text-xs font-bold text-ink transition hover:-translate-y-1">Send the brief ↗</a>
          </div>
          <div className="flex flex-col justify-end">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">Direct line</p>

            <div className="mt-3 flex items-center gap-2.5">
              <a href="mailto:stevenayman1111@gmail.com" className="break-all text-sm hover:text-lime">stevenayman1111@gmail.com</a>
              <a href="mailto:stevenayman1111@gmail.com" aria-label="Email me" title="Email me" className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full border border-white/10 text-white/50 transition hover:border-lime hover:bg-white/5 hover:text-lime">
                <MailIcon />
              </a>
            </div>

            <div className="mt-2.5 flex items-center gap-2.5">
              <a href="tel:+201200717135" className="text-sm hover:text-lime">+20 120 071 7135</a>
              <a href="https://wa.me/201200717135" target="_blank" rel="noreferrer" aria-label="Message me on WhatsApp" title="Message me on WhatsApp" className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full border border-white/10 text-white/50 transition hover:border-lime hover:bg-white/5 hover:text-lime">
                <WhatsAppIcon />
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-2">
              {links.map(([label, url]) => (
                <a key={label} href={url} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 px-4 py-3 font-mono text-[10px] text-white/50 transition hover:border-lime hover:text-lime">{label} ↗</a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 pt-7 font-mono text-[9px] uppercase tracking-wider text-white/25 sm:flex-row">
          <span>© {new Date().getFullYear()} Steven Ayman</span>
          <span>AI systems · Egypt · Built with intent</span>
        </div>
      </div>
    </footer>
  );
}
