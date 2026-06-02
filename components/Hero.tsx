'use client';

import { GitHubUser } from '@/lib/github';
import Image from 'next/image';

interface HeroProps {
  user: GitHubUser;
  totalStars: number;
  totalForks: number;
  unlockedCount: number;
  totalAchievements: number;
}

export default function Hero({ user, totalStars, totalForks, unlockedCount, totalAchievements }: HeroProps) {
  const accountAge = Math.floor(
    (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365)
  );

  return (
    <section style={{ padding: '4rem 0 2rem', textAlign: 'center', position: 'relative' }}>
      {/* Avatar */}
      <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
        <div style={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          border: '3px solid var(--accent-blue)',
          boxShadow: '0 4px 20px rgba(59, 130, 246, 0.15)',
          overflow: 'hidden',
          margin: '0 auto',
          position: 'relative',
        }}>
          <Image
            src={user.avatar_url}
            alt={user.name}
            width={100}
            height={100}
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Name */}
      <h1 style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: 'clamp(1.8rem, 5vw, 3rem)',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        color: 'var(--text-primary)',
        marginBottom: '0.5rem',
      }}>
        {user.name || user.login}
      </h1>

      <p style={{
        color: 'var(--text-muted)',
        fontSize: '0.95rem',
        marginBottom: '1.5rem',
      }}>
        @{user.login} · {accountAge} years on GitHub
      </p>

      {user.bio && (
        <p style={{
          maxWidth: 500,
          margin: '0 auto 2rem',
          color: 'var(--text-muted)',
          fontSize: '0.9rem',
          lineHeight: 1.7,
        }}>
          {user.bio}
        </p>
      )}

      {/* Stats row */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '2rem',
      }}>
        {[
          { label: 'Repos', value: user.public_repos, color: 'var(--accent-blue)' },
          { label: 'Stars', value: totalStars, color: 'var(--accent-indigo)' },
          { label: 'Forks', value: totalForks, color: 'var(--accent-blue)' },
          { label: 'Followers', value: user.followers, color: 'var(--accent-indigo)' },
        ].map((stat) => (
          <div key={stat.label} className="glass" style={{
            padding: '0.75rem 1.25rem',
            minWidth: 90,
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: '1.4rem',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              color: stat.color,
              lineHeight: 1,
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
              marginTop: '0.25rem',
            }}>
              {stat.label.toUpperCase()}
            </div>
          </div>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '0.6rem 1.5rem',
            border: '1px solid var(--accent-blue)',
            color: 'var(--accent-blue)',
            borderRadius: 8,
            fontSize: '0.8rem',
            textDecoration: 'none',
            letterSpacing: '0.1em',
            background: 'rgba(59, 130, 246, 0.08)',
            transition: 'all 0.2s',
            fontFamily: 'Inter, sans-serif',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = 'rgba(59, 130, 246, 0.15)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = 'rgba(59, 130, 246, 0.08)';
          }}
        >
          ↗ GitHub Profile
        </a>
        {user.blog && (
          <a
            href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.6rem 1.5rem',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              color: 'var(--text-muted)',
              borderRadius: 8,
              fontSize: '0.8rem',
              textDecoration: 'none',
              letterSpacing: '0.1em',
              background: 'transparent',
              transition: 'all 0.2s',
              fontFamily: 'DM Mono, monospace',
            }}
          >
            ↗ Portfolio
          </a>
        )}
      </div>
    </section>
  );
}
