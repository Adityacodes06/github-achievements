import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AdityaCodes06 — GitHub Achievements',
  description: 'Interactive GitHub achievements showcase for AdityaCodes06',
  openGraph: {
    title: 'AdityaCodes06 — GitHub Achievements',
    description: 'Full-stack engineer, quantum researcher, AI/ML builder.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
