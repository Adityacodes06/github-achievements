'use client';

import { GitHubRepo } from '@/lib/github';
import { useState } from 'react';

interface ReposProps {
  repos: GitHubRepo[];
}

export default function TopRepos({ repos }: ReposProps) {
  const [showAll, setShowAll] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const sorted = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
  const displayed = showAll ? sorted : sorted.slice(0, 6);

  const langColors: Record<string, string> = {
    TypeScript: '#3178C6', JavaScript: '#F7DF1E', Python: '#3572A5',
    Rust: '#DEA584', Go: '#00ADD8', Java: '#B07219',
  };

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function formatSize(bytes: number) {
    const kb = Math.round(bytes / 1024);
    return kb < 1024 ? `${kb} KB` : `${(kb / 1024).toFixed(1)} MB`;
  }

  return (
    <section style={{ marginBottom: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>Repositories</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 4 }}>Ranked by stars</p>
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          style={{
            padding: '0.4rem 1rem',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 6,
            background: 'rgba(59, 130, 246, 0.08)',
            color: 'var(--accent-blue)',
            fontSize: '0.75rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(59, 130, 246, 0.15)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(59, 130, 246, 0.08)';
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
        {displayed.map((repo) => (
          <div key={repo.id} style={{ display: 'flex', flexDirection: 'column' }}>
            <button
              onClick={() => setExpandedId(expandedId === repo.id ? null : repo.id)}
              className="glass"
              style={{
                padding: '1.25rem',
                textDecoration: 'none',
                display: 'block',
                position: 'relative',
                overflow: 'hidden',
                background: 'inherit',
                border: 'inherit',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 600,
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                marginBottom: '0.4rem',
              }}>
                {repo.name}
              </div>

              <p style={{
                fontSize: '0.75rem',
                color: repo.description ? 'var(--text-muted)' : '#d1d5db',
                lineHeight: 1.6,
                marginBottom: '0.85rem',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                minHeight: '2.4rem',
              }}>
                {repo.description || 'No description available'}
              </p>

              {/* Topics */}
              {repo.topics && repo.topics.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.75rem' }}>
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span key={topic} style={{
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: 'rgba(99, 102, 241, 0.1)',
                      border: '1px solid rgba(99, 102, 241, 0.2)',
                      fontSize: '0.65rem',
                      color: 'var(--accent-indigo)',
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
            </button>

            {/* Expanded Details */}
            {expandedId === repo.id && (
              <div className="glass" style={{
                padding: '1.5rem',
                marginTop: '0.5rem',
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                lineHeight: 1.8,
              }}>
                {/* About Section */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ 
                    fontWeight: 700, 
                    color: 'var(--text-primary)', 
                    marginBottom: '0.75rem',
                    fontSize: '1rem',
                  }}>
                    About
                  </div>
                  <p style={{ 
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    {repo.description || 'No description available'}
                  </p>
                </div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                      Repository Stats
                    </div>
                    <div style={{ fontSize: '0.85rem', lineHeight: 1.8 }}>
                      <div>Stars: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{repo.stargazers_count}</span></div>
                      <div>Forks: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{repo.forks_count}</span></div>
                      <div>Watchers: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{repo.watchers_count}</span></div>
                      <div>Issues: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{repo.open_issues_count}</span></div>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                      Technical Info
                    </div>
                    <div style={{ fontSize: '0.85rem', lineHeight: 1.8 }}>
                      <div>Language: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{repo.language || 'N/A'}</span></div>
                      <div>Created: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{formatDate(repo.created_at)}</span></div>
                      <div>Updated: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{formatDate(repo.updated_at)}</span></div>
                    </div>
                  </div>
                </div>

                {/* Topics Section */}
                {repo.topics && repo.topics.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                      Topics
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {repo.topics.map((topic) => (
                        <span key={topic} style={{
                          padding: '0.4rem 0.85rem',
                          borderRadius: 6,
                          background: 'rgba(99, 102, 241, 0.15)',
                          border: '1px solid rgba(99, 102, 241, 0.25)',
                          fontSize: '0.8rem',
                          color: 'var(--accent-indigo)',
                          whiteSpace: 'nowrap',
                          fontWeight: 500,
                        }}>
                          #{topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Link Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '0.6rem 1.2rem',
                      background: 'var(--accent-blue)',
                      color: 'white',
                      borderRadius: 6,
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      transition: 'all 0.2s',
                      cursor: 'pointer',
                      border: 'none',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = '0.85';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = '1';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    }}
                  >
                    Open on GitHub
                  </a>
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        padding: '0.6rem 1.2rem',
                        background: 'rgba(59, 130, 246, 0.1)',
                        color: 'var(--accent-blue)',
                        borderRadius: 6,
                        textDecoration: 'none',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(59, 130, 246, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(59, 130, 246, 0.1)';
                      }}
                    >
                      Visit Project
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
