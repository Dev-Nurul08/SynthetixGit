import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

export interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
}

export interface GitHubRepo {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

export interface ProfileResponse {
  profile: GitHubProfile;
  topRepos: GitHubRepo[];
  languages: Record<string, number>;
}

@Injectable()
export class GithubService {
  private readonly baseUrl = 'https://api.github.com';

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    return headers;
  }

  async fetchProfile(username: string): Promise<ProfileResponse> {
    try {
      const [profileRes, reposRes] = await Promise.all([
        fetch(`${this.baseUrl}/users/${username}`, {
          headers: this.getHeaders(),
        }),
        fetch(
          `${this.baseUrl}/users/${username}/repos?sort=stars&per_page=10&type=owner`,
          { headers: this.getHeaders() },
        ),
      ]);

      if (!profileRes.ok) {
        if (profileRes.status === 404) {
          throw new HttpException(
            `GitHub user '${username}' not found`,
            HttpStatus.NOT_FOUND,
          );
        }
        if (profileRes.status === 403) {
          throw new HttpException(
            'GitHub API rate limit exceeded. Please try again later.',
            HttpStatus.TOO_MANY_REQUESTS,
          );
        }
        throw new HttpException(
          'Failed to fetch GitHub profile',
          HttpStatus.BAD_GATEWAY,
        );
      }

      const profile: GitHubProfile = await profileRes.json();
      const allRepos: GitHubRepo[] = reposRes.ok ? await reposRes.json() : [];

      const topRepos = allRepos
        .filter((r) => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6);

      // Tally language distribution
      const languages: Record<string, number> = {};
      for (const repo of allRepos) {
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] ?? 0) + 1;
        }
      }

      return { profile, topRepos, languages };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException(
        'Network error fetching GitHub data',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
