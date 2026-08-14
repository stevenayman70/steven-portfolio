import type { Metadata } from 'next';
import { Poppins, Space_Mono } from 'next/font/google';
import './globals.css';
import MotionEffects from '@/components/MotionEffects';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-poppins', display: 'swap' });
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'Steven Ayman Tawfik — AI Automation Engineer',
  description: 'AI agents, intelligent automation, and production-ready AI products built by Steven Ayman Tawfik, founder of Serenoil and VIDA AI.',
  openGraph: { title: 'Steven Ayman Tawfik — AI Automation Engineer', description: 'AI agents, intelligent automation, and production-ready AI products.', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${poppins.variable} ${spaceMono.variable}`}><body><MotionEffects />{children}</body></html>;
}
