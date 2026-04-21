'use client';

import { GitHubRepo } from '@/lib/github';
import { useState } from 'react';

interface ReposProps {
  repos: GitHubRepo[];
}

export default function TopRepos({ repos }: ReposProps) {
  const [showAll, setShowAll] = useState(false);
  const sorted = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
  const displayed = showAll ? sorted : sorted.slice(0, 6);

  const langColors: Record<string, string> = {
    TypeScript: '#3178C6', JavaScript: '#F7DF1E', Python: '#3572A5',
    Rust: '#DEA584', Go: '#00ADD8', Java: '#B07219',
  };

  return (
    <section style={{ marginBottom: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.01em' }}>Top Repositories</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 4 }}>Ranked by stars</p>
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          style={{
            padding: '0.4rem 1rem',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 6,
            background: 'transparent',
            color: 'var(--text-muted)',
            fontSize: '0.75rem',
            cursor: 'pointer',
            fontFamily: 'DM Mono, monospace',
            transition: 'all 0.2s',
          }}
        >
          {showAll ? 'Show Less' : `Show All (${repos.length})`}
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1rem',
      }}>
        {displayed.map((repo, i) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass"
            style={{
              padding: '1.25rem',
              textDecoration: 'none',
              display: 'block',
              animationDelay: `${i * 0.05}s`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Rank badge for top 3 */}
            {i < 3 && (
              <div style={{
                position: 'absolute',
                top: 12,
                right: 12,
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: i === 0 ? 'rgba(245,158,11,0.2)' : i === 1 ? 'rgba(156,163,175,0.2)' : 'rgba(180,100,50,0.2)',
                border: `1px solid ${i === 0 ? 'rgba(245,158,11,0.5)' : i === 1 ? 'rgba(156,163,175,0.4)' : 'rgba(180,100,50,0.4)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.65rem',
                color: i === 0 ? '#fbbf24' : i === 1 ? '#9ca3af' : '#cd7f32',
                fontWeight: 700,
              }}>
                #{i + 1}
              </div>
            )}

            <div style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--text-primary)',
              marginBottom: '0.4rem',
              paddingRight: i < 3 ? '2rem' : 0,
            }}>
              {repo.name}
            </div>

            {repo.description && (
              <p style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '0.85rem',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {repo.description}
              </p>
            )}

            {/* Topics */}
            {repo.topics && repo.topics.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.75rem' }}>
                {repo.topics.slice(0, 3).map((topic) => (
                  <span key={topic} style={{
                    padding: '2px 8px',
                    borderRadius: 4,
                    background: 'rgba(168,85,247,0.1)',
                    border: '1px solid rgba(168,85,247,0.2)',
                    fontSize: '0.65rem',
                    color: '#c084fc',
                    fontFamily: 'DM Mono, monospace',
                  }}>
                    {topic}
                  </span>
                ))}
              </div>
            )}

            {/* Footer stats */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {repo.language && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: langColors[repo.language] || '#8b5cf6',
                  }} />
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{repo.language}</span>
                </div>
              )}
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                ⭐ {repo.stargazers_count}
              </span>
              {repo.forks_count > 0 && (
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  ⑂ {repo.forks_count}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
