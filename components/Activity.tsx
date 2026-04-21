'use client';

import { GitHubEvent } from '@/lib/github';

interface ActivityProps {
  events: GitHubEvent[];
}

const eventConfig: Record<string, { label: string; icon: string; color: string }> = {
  PushEvent: { label: 'Pushed to', icon: '↑', color: 'var(--accent-cyan)' },
  CreateEvent: { label: 'Created', icon: '+', color: '#34d399' },
  PullRequestEvent: { label: 'Pull Request', icon: '⟲', color: 'var(--accent-violet)' },
  IssuesEvent: { label: 'Issue', icon: '!', color: 'var(--accent-rose)' },
  WatchEvent: { label: 'Starred', icon: '★', color: 'var(--accent-amber)' },
  ForkEvent: { label: 'Forked', icon: '⑂', color: '#60a5fa' },
  DeleteEvent: { label: 'Deleted', icon: '×', color: 'var(--accent-rose)' },
  ReleaseEvent: { label: 'Released', icon: '⬆', color: '#34d399' },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (days > 0) return `${days}d ago`;
  if (hrs > 0) return `${hrs}h ago`;
  return `${mins}m ago`;
}

export default function Activity({ events }: ActivityProps) {
  const visible = events.slice(0, 10);

  if (visible.length === 0) return null;

  return (
    <section className="glass" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '-0.01em' }}>
        Recent Activity
        <span style={{
          display: 'inline-block',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#34d399',
          boxShadow: '0 0 6px #34d399',
          marginLeft: 8,
          verticalAlign: 'middle',
        }} className="animate-pulse-glow" />
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {visible.map((event, i) => {
          const cfg = eventConfig[event.type] || { label: event.type, icon: '·', color: 'var(--text-muted)' };
          const repoName = event.repo.name.split('/')[1] || event.repo.name;

          return (
            <div
              key={event.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 0.75rem',
                borderRadius: 8,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
                transition: 'all 0.2s',
                animationDelay: `${i * 0.04}s`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
              }}
            >
              <div style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: `${cfg.color}18`,
                border: `1px solid ${cfg.color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                color: cfg.color,
                flexShrink: 0,
                fontWeight: 700,
              }}>
                {cfg.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cfg.label} </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  {repoName}
                </span>
              </div>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', flexShrink: 0, letterSpacing: '0.05em' }}>
                {timeAgo(event.created_at)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
