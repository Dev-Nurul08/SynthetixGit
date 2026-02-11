/**
 * Dynamic Widgets Generator Engine (Phase 9)
 * Spotify player, LeetCode stats, Multi-line Orbitron Typing SVG, and Dev.to / Blog Feed Sync
 */

export interface DynamicWidgetsConfig {
  spotify?: {
    enabled: boolean;
    trackName?: string;
    artistName?: string;
  };
  leetCode?: {
    enabled: boolean;
    username: string;
    theme?: string;
  };
  blogSync?: {
    enabled: boolean;
    platform: 'devto' | 'medium' | 'hashnode';
    username: string;
  };
  typingSvg?: {
    enabled: boolean;
    font: string;
    lines: string[];
    color: string;
  };
  devQuotes?: {
    enabled: boolean;
    theme: string;
  };
  codingChallenge?: {
    enabled: boolean;
    problemName: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
    solutionCode: string;
  };
}

export function compileSpotifyWidget(track = 'Deep Focus & Lofi Coding', artist = 'SynthetixGit Beats'): string {
  return `<img src="https://synthetixgit.vercel.app/api/svg/spotify?track=${encodeURIComponent(track)}&artist=${encodeURIComponent(artist)}" width="100%" alt="Spotify Now Playing" />`;
}

export function compileLeetCodeWidget(username = 'Fr_Nurul', theme = 'nord'): string {
  return `<a href="https://leetcode.com/${username}/" target="_blank">\n  <img src="https://leetcard.jacoblin.cool/${username}?theme=${theme}&font=Fira%20Code&ext=heatmap" width="100%" alt="LeetCode Stats" />\n</a>`;
}

export function compileBlogSyncWidget(platform = 'devto', username = 'developer'): string {
  return `<a href="https://${platform}.com/${username}" target="_blank">\n  <img src="https://github-readme-medium-recent-article.vercel.app/recent-article?username=${username}" width="100%" alt="Recent Blog Posts" />\n</a>`;
}

export function compileTypingSvg(lines: string[], font = 'Orbitron', color = 'gradient'): string {
  const linesParam = lines.map((l) => encodeURIComponent(l)).join('%3B');
  return `<img src="https://readme-typing-svg.demolab.com?font=${encodeURIComponent(font)}&weight=900&size=25&duration=3000&pause=1000&color=${color}&customColorList=0,4,4,8,30&center=true&vCenter=true&multiline=true&width=800&height=100&lines=${linesParam}" alt="Typing SVG" />`;
}
