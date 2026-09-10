import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, token, grid, targetYear = 2025, repoName = 'github-contribution-art' } = body;

    const pat = token || process.env.GITHUB_PERSONAL_ACCESS_TOKEN || process.env.GITHUB_TOKEN;

    if (!pat) {
      return NextResponse.json(
        { error: 'GitHub Personal Access Token is required to deploy contribution art.' },
        { status: 400 }
      );
    }

    if (!username || !grid) {
      return NextResponse.json(
        { error: 'Username and canvas grid are required.' },
        { status: 400 }
      );
    }

    const octokit = new Octokit({ auth: pat });

    // 1. Check or create repository
    let repoExists = true;
    try {
      await octokit.repos.get({ owner: username, repo: repoName });
    } catch (err: any) {
      if (err.status === 404) {
        repoExists = false;
      } else {
        throw err;
      }
    }

    if (!repoExists) {
      await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        description: `GitHub Contribution Graph Pixel Artwork by @${username} (generated via SynthetixGit)`,
        private: false,
        auto_init: true,
      });
      // Wait for GitHub to initialize
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // 2. Compute date schedule for painted cells
    const levelCommits: Record<number, number> = {
      0: 0,
      1: 2,
      2: 5,
      3: 10,
      4: 20,
    };

    const startDate = new Date(Date.UTC(targetYear, 0, 1));
    while (startDate.getUTCDay() !== 0) {
      startDate.setUTCDate(startDate.getUTCDate() + 1);
    }

    // Fetch default branch ref (main)
    const refData = await octokit.git.getRef({
      owner: username,
      repo: repoName,
      ref: 'heads/main',
    }).catch(async () => {
      return await octokit.git.getRef({
        owner: username,
        repo: repoName,
        ref: 'heads/master',
      });
    });

    let currentCommitSha = refData.data.object.sha;
    let totalCommitsPushed = 0;

    // Collect all cells to paint
    const cellsToPaint: { col: number; row: number; isoDate: string; count: number }[] = [];
    for (let col = 0; col < 52; col++) {
      for (let row = 0; row < 7; row++) {
        const level = grid[col]?.[row] || 0;
        const count = levelCommits[level] || 0;
        if (count > 0) {
          const cellDate = new Date(startDate);
          cellDate.setUTCDate(startDate.getUTCDate() + col * 7 + row);
          const isoDate = cellDate.toISOString().split('T')[0];
          cellsToPaint.push({ col, row, isoDate, count });
        }
      }
    }

    if (cellsToPaint.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No pixels were painted on the canvas.',
        repoUrl: `https://github.com/${username}/${repoName}`,
      });
    }

    // Create commits for each painted cell using GitHub Git Data API
    // Limit to reasonable batch to prevent rate limits, e.g. 1-2 commits per active cell
    for (const cell of cellsToPaint) {
      const commitCountForCell = Math.min(cell.count, 5); // 1-5 commits per cell
      for (let i = 0; i < commitCountForCell; i++) {
        const timestamp = `${cell.isoDate}T${String(12 + (i % 8)).padStart(2, '0')}:${String((i * 13) % 60).padStart(2, '0')}:00Z`;

        // 1. Create blob
        const blob = await octokit.git.createBlob({
          owner: username,
          repo: repoName,
          content: `Pixel art commit on ${cell.isoDate} (w${cell.col + 1},d${cell.row + 1}) #${i + 1}\nSynthetixGit contribution studio\n`,
          encoding: 'utf-8',
        });

        // 2. Create tree
        const tree = await octokit.git.createTree({
          owner: username,
          repo: repoName,
          base_tree: currentCommitSha,
          tree: [
            {
              path: 'art.txt',
              mode: '100644',
              type: 'blob',
              sha: blob.data.sha,
            },
          ],
        });

        // 3. Create commit with backdated dates
        const newCommit = await octokit.git.createCommit({
          owner: username,
          repo: repoName,
          message: `chore(art): paint pixel (${cell.col},${cell.row}) #${i + 1}`,
          tree: tree.data.sha,
          parents: [currentCommitSha],
          author: {
            name: username,
            email: `${username}@users.noreply.github.com`,
            date: timestamp,
          },
          committer: {
            name: username,
            email: `${username}@users.noreply.github.com`,
            date: timestamp,
          },
        });

        currentCommitSha = newCommit.data.sha;
        totalCommitsPushed++;
      }
    }

    // Update branch ref to point to the newest commit
    await octokit.git.updateRef({
      owner: username,
      repo: repoName,
      ref: 'heads/main',
      sha: currentCommitSha,
      force: true,
    });

    return NextResponse.json({
      success: true,
      repoUrl: `https://github.com/${username}/${repoName}`,
      commitsPushed: totalCommitsPushed,
      message: `Successfully pushed ${totalCommitsPushed} backdated commits to ${username}/${repoName}!`,
    });
  } catch (error: any) {
    console.error('Art Deploy Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to deploy contribution artwork.' },
      { status: 500 }
    );
  }
}
