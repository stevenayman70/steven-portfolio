'use client';

import { useEffect, useRef } from 'react';

export default function MotionEffects() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const revealItems = document.querySelectorAll('main section:not(:first-child) > div, main article');
    revealItems.forEach(item => item.classList.add('reveal-on-scroll'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px' });
    revealItems.forEach(item => observer.observe(item));

    let scrollFrame = 0;
    const updateProgress = () => {
      if (progressRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
      scrollFrame = 0;
    };
    const onScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return <div ref={progressRef} className="scroll-progress" />;
}
