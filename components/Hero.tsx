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
      {/* Scan line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--accent-cyan), transparent)',
        animation: 'shimmer 3s linear infinite',
        backgroundSize: '200% 100%',
      }} />

      {/* Avatar */}
      <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}
           className="animate-float">
        <div style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          border: '2px solid var(--accent-cyan)',
          boxShadow: '0 0 40px rgba(0,245,255,0.3), inset 0 0 40px rgba(0,245,255,0.05)',
          overflow: 'hidden',
          margin: '0 auto',
          position: 'relative',
        }}>
          <Image
            src={user.avatar_url}
            alt={user.name}
            width={120}
            height={120}
            style={{ objectFit: 'cover' }}
          />
        </div>
        {/* Orbit ring */}
        <div style={{
          position: 'absolute',
          inset: -10,
          border: '1px dashed rgba(0,245,255,0.2)',
          borderRadius: '50%',
          animation: 'orbit 8s linear infinite',
        }} />
        <div style={{
          position: 'absolute',
          top: -10,
          left: '50%',
          width: 8,
          height: 8,
          background: 'var(--accent-cyan)',
          borderRadius: '50%',
          transform: 'translateX(-50%)',
          boxShadow: '0 0 10px var(--accent-cyan)',
        }} />
      </div>

      {/* Name */}
      <h1 style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 800,
        letterSpacing: '-0.02em',
        background: 'linear-gradient(135deg, var(--text-primary) 30%, var(--accent-cyan) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '0.5rem',
      }}>
        {user.name || user.login}
      </h1>

      <p style={{
        color: 'var(--accent-cyan)',
        fontFamily: 'DM Mono, monospace',
        fontSize: '0.85rem',
        letterSpacing: '0.15em',
        marginBottom: '1rem',
        opacity: 0.8,
      }}>
        @{user.login} · {accountAge}yr on GitHub
      </p>

      {user.bio && (
        <p style={{
          maxWidth: 500,
          margin: '0 auto 2rem',
          color: 'rgba(200,210,255,0.65)',
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
          { label: 'Repos', value: user.public_repos, color: 'var(--accent-cyan)' },
          { label: 'Stars', value: totalStars, color: 'var(--accent-amber)' },
          { label: 'Forks', value: totalForks, color: 'var(--accent-violet)' },
          { label: 'Followers', value: user.followers, color: 'var(--accent-rose)' },
          { label: 'Achievements', value: `${unlockedCount}/${totalAchievements}`, color: '#34d399' },
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
            border: '1px solid var(--accent-cyan)',
            color: 'var(--accent-cyan)',
            borderRadius: 8,
            fontSize: '0.8rem',
            textDecoration: 'none',
            letterSpacing: '0.1em',
            background: 'rgba(0,245,255,0.05)',
            transition: 'all 0.2s',
            fontFamily: 'DM Mono, monospace',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = 'rgba(0,245,255,0.15)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = 'rgba(0,245,255,0.05)';
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
              border: '1px solid rgba(255,255,255,0.1)',
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
