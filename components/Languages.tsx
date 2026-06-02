'use client';

interface LanguageData {
  lang: string;
  count: number;
  color: string;
}

interface LanguagesProps {
  languages: LanguageData[];
  totalRepos: number;
}

export default function Languages({ languages, totalRepos }: LanguagesProps) {
  const maxCount = Math.max(...languages.map((l) => l.count));

  return (
    <section className="glass" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>
        Languages
        <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.8rem', marginLeft: 8 }}>
          {languages.length} total
        </span>
      </h3>

      {/* Bar chart */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {languages.map((lang, i) => (
          <div key={lang.lang} style={{ animationDelay: `${i * 0.08}s` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: '0.78rem', color: lang.color }}>
                {lang.lang}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {lang.count} repo{lang.count > 1 ? 's' : ''}
              </span>
            </div>
            <div style={{ height: 6, background: 'rgba(0, 0, 0, 0.08)', borderRadius: 3, overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${(lang.count / maxCount) * 100}%`,
                  background: lang.color,
                  borderRadius: 3,
                  boxShadow: `0 0 6px ${lang.color}40`,
                  transition: 'width 0.8s ease',
                  transitionDelay: `${i * 0.08}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Color legend dots */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.25rem' }}>
        {languages.map((lang) => (
          <div key={lang.lang} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: lang.color,
              boxShadow: `0 0 4px ${lang.color}60`,
            }} />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{lang.lang}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
