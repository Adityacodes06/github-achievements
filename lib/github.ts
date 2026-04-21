const GITHUB_USERNAME = 'AdityaCodes06';
const BASE_URL = 'https://api.github.com';

export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  location: string;
  html_url: string;
  company: string | null;
  blog: string | null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
  size: number;
  open_issues_count: number;
  fork: boolean;
  homepage: string | null;
  watchers_count: number;
}

export interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  value?: number;
}

const headers: Record<string, string> = {
  'Accept': 'application/vnd.github.v3+json',
};

if (process.env.GITHUB_TOKEN) {
  headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
}

export async function fetchUser(): Promise<GitHubUser> {
  const res = await fetch(`${BASE_URL}/users/${GITHUB_USERNAME}`, {
    headers,
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

export async function fetchRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${BASE_URL}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    { headers, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch repos');
  const all: GitHubRepo[] = await res.json();
  return all.filter((r) => !r.fork);
}

export async function fetchEvents(): Promise<GitHubEvent[]> {
  const res = await fetch(
    `${BASE_URL}/users/${GITHUB_USERNAME}/events/public?per_page=100`,
    { headers, next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  return res.json();
}

export function computeAchievements(
  user: GitHubUser,
  repos: GitHubRepo[]
): Achievement[] {
  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);
  const langSet = new Set(repos.map((r) => r.language).filter(Boolean));
  const languages = Array.from(langSet);
  const hasQuantum = repos.some(
    (r) =>
      r.name.toLowerCase().includes('quantum') ||
      (r.topics || []).some((t) => t.includes('quantum'))
  );
  const hasML = repos.some(
    (r) =>
      r.name.toLowerCase().includes('ml') ||
      r.name.toLowerCase().includes('ai') ||
      (r.topics || []).some((t) => ['ml', 'ai', 'pytorch', 'tensorflow'].includes(t))
  );

  const accountAge = Math.floor(
    (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365)
  );

  return [
    {
      id: 'repos-10',
      title: 'Repository Architect',
      description: '10+ public repositories shipped',
      icon: '🏗️',
      unlocked: user.public_repos >= 10,
      rarity: 'common',
      value: user.public_repos,
    },
    {
      id: 'repos-25',
      title: 'Prolific Builder',
      description: '25+ public repositories',
      icon: '⚡',
      unlocked: user.public_repos >= 25,
      rarity: 'rare',
      value: user.public_repos,
    },
    {
      id: 'stars-10',
      title: 'Star Collector',
      description: 'Earned 10+ stars across repositories',
      icon: '⭐',
      unlocked: totalStars >= 10,
      rarity: 'common',
      value: totalStars,
    },
    {
      id: 'stars-50',
      title: 'Rising Star',
      description: '50+ total stars earned',
      icon: '🌟',
      unlocked: totalStars >= 50,
      rarity: 'rare',
      value: totalStars,
    },
    {
      id: 'stars-100',
      title: 'Stellar Coder',
      description: '100+ stars — your code resonates',
      icon: '💫',
      unlocked: totalStars >= 100,
      rarity: 'epic',
      value: totalStars,
    },
    {
      id: 'followers-10',
      title: 'Networker',
      description: '10+ developers follow your work',
      icon: '🤝',
      unlocked: user.followers >= 10,
      rarity: 'common',
      value: user.followers,
    },
    {
      id: 'followers-50',
      title: 'Influencer',
      description: '50+ followers in the community',
      icon: '📡',
      unlocked: user.followers >= 50,
      rarity: 'rare',
      value: user.followers,
    },
    {
      id: 'polyglot',
      title: 'Polyglot',
      description: '5+ programming languages used',
      icon: '🌐',
      unlocked: languages.length >= 5,
      rarity: 'rare',
      value: languages.length,
    },
    {
      id: 'hyperpolyglot',
      title: 'Hyperpolyglot',
      description: '8+ languages — true language agnostic',
      icon: '🔮',
      unlocked: languages.length >= 8,
      rarity: 'epic',
      value: languages.length,
    },
    {
      id: 'quantum',
      title: 'Quantum Pioneer',
      description: 'Ships quantum computing projects',
      icon: '⚛️',
      unlocked: hasQuantum,
      rarity: 'legendary',
    },
    {
      id: 'ml-engineer',
      title: 'ML Engineer',
      description: 'AI/ML projects in the wild',
      icon: '🧠',
      unlocked: hasML,
      rarity: 'epic',
    },
    {
      id: 'veteran',
      title: 'GitHub Veteran',
      description: '2+ years on the platform',
      icon: '🎖️',
      unlocked: accountAge >= 2,
      rarity: 'rare',
      value: accountAge,
    },
    {
      id: 'forks',
      title: 'Fork Magnet',
      description: 'Your repos have been forked 5+ times',
      icon: '🍴',
      unlocked: totalForks >= 5,
      rarity: 'common',
      value: totalForks,
    },
    {
      id: 'topic-master',
      title: 'Topic Master',
      description: 'Well-documented repos with topics',
      icon: '🏷️',
      unlocked: repos.filter((r) => r.topics && r.topics.length > 0).length >= 3,
      rarity: 'common',
    },
    {
      id: 'full-stack',
      title: 'Full Stack Phantom',
      description: 'Projects spanning frontend & backend',
      icon: '🔥',
      unlocked:
        languages.some((l) =>
          ['TypeScript', 'JavaScript'].includes(l as string)
        ) &&
        languages.some((l) =>
          ['Python', 'Go', 'Java', 'Rust'].includes(l as string)
        ),
      rarity: 'epic',
    },
  ];
}

export function getTopLanguages(repos: GitHubRepo[]): { lang: string; count: number; color: string }[] {
  const langColors: Record<string, string> = {
    TypeScript: '#3178C6',
    JavaScript: '#F7DF1E',
    Python: '#3572A5',
    Rust: '#DEA584',
    Go: '#00ADD8',
    Java: '#B07219',
    'C++': '#F34B7D',
    C: '#555555',
    HTML: '#E34C26',
    CSS: '#563d7c',
    Shell: '#89E051',
    Jupyter: '#DA5B0B',
  };

  const counts: Record<string, number> = {};
  repos.forEach((r) => {
    if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
  });

  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([lang, count]) => ({
      lang,
      count,
      color: langColors[lang] || '#8b5cf6',
    }));
}
