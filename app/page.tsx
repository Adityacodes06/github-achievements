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
        <div className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--accent-rose)' }}>Failed to load GitHub data. Check your connection.</p>
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
