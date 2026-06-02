import { fetchUser, fetchRepos, fetchEvents, computeAchievements, getTopLanguages } from '@/lib/github';
import ClientPage from '@/components/ClientPage';

export const revalidate = 3600; // ISR — refresh every hour

export default async function Home() {
  let user, repos, events;

  try {
    [user, repos, events] = await Promise.all([
      fetchUser(),
      fetchRepos(),
      fetchEvents(),
    ]);
  } catch {
    return (
      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div className="glass" style={{ padding: '2rem', textAlign: 'center', maxWidth: 500 }}>
          <p style={{ color: '#ef4444', fontWeight: 600 }}>Failed to load GitHub data</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Please check your GitHub token and internet connection</p>
        </div>
      </main>
    );
  }

  const achievements = computeAchievements(user, repos);
  const topLanguages = getTopLanguages(repos);
  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);

  return (
    <ClientPage
      user={user}
      repos={repos}
      events={events}
      achievements={achievements}
      topLanguages={topLanguages}
      totalStars={totalStars}
      totalForks={totalForks}
    />
  );
}
