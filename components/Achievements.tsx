'use client';

import { Achievement } from '@/lib/github';
import { useState } from 'react';

interface AchievementsProps {
  achievements: Achievement[];
}

const rarityConfig = {
  common: { label: 'COMMON', gradient: 'rgba(156,163,175,0.8)', bg: 'rgba(156,163,175,0.06)' },
  rare: { label: 'RARE', gradient: 'rgba(59,130,246,0.9)', bg: 'rgba(59,130,246,0.08)' },
  epic: { label: 'EPIC', gradient: 'rgba(168,85,247,0.9)', bg: 'rgba(168,85,247,0.1)' },
  legendary: { label: 'LEGENDARY', gradient: 'rgba(245,158,11,0.9)', bg: 'rgba(245,158,11,0.1)' },
};

export default function Achievements({ achievements }: AchievementsProps) {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [hovered, setHovered] = useState<string | null>(null);

  const unlocked = achievements.filter((a) => a.unlocked);
  const filtered = achievements.filter((a) =>
    filter === 'all' ? true : filter === 'unlocked' ? a.unlocked : !a.unlocked
  );

  return (
    <section style={{ marginBottom: '3rem' }}>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.01em' }}>
            Achievements
            <span style={{ color: 'var(--accent-cyan)', marginLeft: 8, fontSize: '1rem' }}>
              {unlocked.length}/{achievements.length}
            </span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 4 }}>
            Milestones earned across your GitHub journey
          </p>
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['all', 'unlocked', 'locked'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.4rem 0.9rem',
                borderRadius: 6,
                border: '1px solid',
                borderColor: filter === f ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)',
                background: filter === f ? 'rgba(0,245,255,0.1)' : 'transparent',
                color: filter === f ? 'var(--accent-cyan)' : 'var(--text-muted)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                fontFamily: 'DM Mono, monospace',
                letterSpacing: '0.05em',
                transition: 'all 0.2s',
              }}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>COMPLETION</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)' }}>
            {Math.round((unlocked.length / achievements.length) * 100)}%
          </span>
        </div>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${(unlocked.length / achievements.length) * 100}%`,
            background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))',
            borderRadius: 2,
            transition: 'width 1s ease',
            boxShadow: '0 0 8px var(--accent-cyan)',
          }} />
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
      }}>
        {filtered.map((achievement, i) => {
          const cfg = rarityConfig[achievement.rarity];
          const isHovered = hovered === achievement.id;

          return (
            <div
              key={achievement.id}
              className={`glass rarity-${achievement.rarity} rarity-${achievement.rarity}-glow`}
              onMouseEnter={() => setHovered(achievement.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: '1.25rem',
                opacity: achievement.unlocked ? 1 : 0.35,
                filter: achievement.unlocked ? 'none' : 'grayscale(1)',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
                animationDelay: `${i * 0.05}s`,
                transition: 'all 0.3s ease',
                transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
                background: achievement.unlocked ? cfg.bg : 'var(--glass-bg)',
              }}
            >
              {/* Rarity shimmer for legendary */}
              {achievement.rarity === 'legendary' && achievement.unlocked && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, transparent 40%, rgba(245,158,11,0.06) 50%, transparent 60%)',
                  backgroundSize: '200% 200%',
                  animation: 'shimmer 2s linear infinite',
                  pointerEvents: 'none',
                }} />
              )}

              <div style={{ fontSize: '2rem', marginBottom: '0.75rem', lineHeight: 1 }}>
                {achievement.icon}
              </div>

              <div style={{
                fontSize: '0.85rem',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 600,
                color: achievement.unlocked ? 'var(--text-primary)' : 'var(--text-muted)',
                marginBottom: '0.35rem',
                lineHeight: 1.2,
              }}>
                {achievement.title}
              </div>

              <div style={{
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                marginBottom: '0.75rem',
              }}>
                {achievement.description}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className={`tag tag-${achievement.rarity}`}>
                  {cfg.label}
                </span>
                {achievement.value !== undefined && achievement.unlocked && (
                  <span style={{ fontSize: '0.7rem', color: cfg.gradient, fontWeight: 600 }}>
                    {achievement.value}
                  </span>
                )}
              </div>

              {achievement.unlocked && (
                <div style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: cfg.gradient,
                  boxShadow: `0 0 8px ${cfg.gradient}`,
                }} className="animate-pulse-glow" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
