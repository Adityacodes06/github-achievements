import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GitHub Profile',
  description: 'GitHub profile and repositories showcase',
  openGraph: {
    title: 'GitHub Profile',
    description: 'View repositories, languages, and recent activity',
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
