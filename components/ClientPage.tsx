'use client';

import { GitHubUser, GitHubRepo, GitHubEvent, Achievement } from '@/lib/github';
import Hero from './Hero';
import Achievements from './Achievements';
import TopRepos from './TopRepos';
import Languages from './Languages';
import Activity from './Activity';

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
  const unlocked = achievements.filter((a) => a.unlocked).length;

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
        background: 'rgba(5,6,15,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--accent-cyan)',
            boxShadow: '0 0 8px var(--accent-cyan)',
          }} />
          <span style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.8rem',
            color: 'var(--accent-cyan)',
            letterSpacing: '0.1em',
          }}>
            GITHUB_ACHIEVEMENTS
          </span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['Achievements', 'Repos', 'Stats'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                letterSpacing: '0.08em',
                transition: 'color 0.2s',
                fontFamily: 'DM Mono, monospace',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--accent-cyan)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-muted)')}
            >
              {item.toUpperCase()}
            </a>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem 4rem' }}>
        <Hero
          user={user}
          totalStars={totalStars}
          totalForks={totalForks}
          unlockedCount={unlocked}
          totalAchievements={achievements.length}
        />

        {/* Divider */}
        <div style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.2), transparent)',
          margin: '2rem 0',
        }} />

        <div id="achievements">
          <Achievements achievements={achievements} />
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.2), transparent)',
          margin: '1rem 0 2rem',
        }} />

        <div id="repos">
          <TopRepos repos={repos} />
        </div>

        {/* Stats row */}
        <div id="stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Languages languages={topLanguages} totalRepos={repos.length} />
          <Activity events={events} />
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '3rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            DATA FETCHED LIVE FROM GITHUB API · BUILT WITH NEXT.JS · DEPLOYED ON VERCEL
          </p>
          <p style={{ fontSize: '0.7rem', color: 'rgba(0,245,255,0.3)', marginTop: '0.35rem' }}>
            © {new Date().getFullYear()} {user.name || user.login}
          </p>
        </div>
      </div>
    </main>
  );
}
