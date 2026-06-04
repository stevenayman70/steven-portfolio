import type { Metadata } from 'next';
import { Poppins, Space_Mono } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets:  ['latin'],
  weight:   ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display:  'swap',
});

const spaceMono = Space_Mono({
  subsets:  ['latin'],
  weight:   ['400', '700'],
  variable: '--font-space-mono',
  display:  'swap',
});

export const metadata: Metadata = {
  title:       'Steven Ayman — AI Automation & Mechatronics',
  description: 'Portfolio of Steven Ayman — Mechatronics Engineer & AI Automation Specialist.',
  openGraph: {
    title:       'Steven Ayman — Portfolio',
    description: 'Mechatronics Engineer & AI Automation Specialist',
    type:        'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
