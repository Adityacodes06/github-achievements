'use client';

import { GitHubUser, GitHubRepo, GitHubEvent, Achievement } from '@/lib/github';
import Hero from './Hero';
import TopRepos from './TopRepos';
import Languages from './Languages';
import Activity from './Activity';
import { useEffect, useState } from 'react';

interface ClientPageProps {
  user: GitHubUser;
  repos: GitHubRepo[];
  events: GitHubEvent[];
  achievements: Achievement[];
  topLanguages: { lang: string; count: number; color: string }[];
  totalStars: number;
  totalForks: number;
}

export default function ClientPage({
  user, repos, events, achievements, topLanguages, totalStars, totalForks,
}: ClientPageProps) {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isUpdating, setIsUpdating] = useState(false);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);
      // Trigger a revalidation
      fetch('/api/revalidate', { method: 'POST' }).then(() => {
        setLastUpdated(new Date());
        setIsUpdating(false);
        // Optionally reload the page
        window.location.reload();
      }).catch(() => setIsUpdating(false));
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{ minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '0.75rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(249, 250, 251, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--accent-blue)',
            boxShadow: '0 0 8px var(--accent-blue)',
          }} />
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--text-primary)',
            letterSpacing: '0.1em',
            fontWeight: 600,
          }}>
            GITHUB PROFILE
          </span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {['Repositories', 'Stats'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                letterSpacing: '0.08em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-muted)')}
            >
              {item.toUpperCase()}
            </a>
          ))}
          <div style={{
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            opacity: isUpdating ? 0.7 : 0.5,
            transition: 'opacity 0.2s',
          }}>
            {isUpdating ? '↻ Updating...' : `Updated ${lastUpdated.toLocaleTimeString()}`}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem 4rem' }}>
        <Hero
          user={user}
          totalStars={totalStars}
          totalForks={totalForks}
          unlockedCount={0}
          totalAchievements={0}
        />

        {/* Divider */}
        <div style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent)',
          margin: '2rem 0',
        }} />

        <div id="repositories">
          <TopRepos repos={repos} />
        </div>

        {/* Stats row */}
        <div id="stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
          <Languages languages={topLanguages} totalRepos={repos.length} />
          <Activity events={events} />
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '3rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            DATA FETCHED LIVE FROM GITHUB API · BUILT WITH NEXT.JS
          </p>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            © {new Date().getFullYear()} {user.name || user.login}
          </p>
        </div>
      </div>
    </main>
  );
}
