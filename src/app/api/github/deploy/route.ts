import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, token, markdown, workflowYaml, commitMessage } = body;

    const pat = token || process.env.GITHUB_TOKEN;

    if (!pat) {
      return NextResponse.json(
        { error: 'GitHub Personal Access Token is required to deploy.' },
        { status: 400 }
      );
    }

    if (!username || !markdown) {
      return NextResponse.json(
        { error: 'Username and markdown content are required.' },
        { status: 400 }
      );
    }

    const octokit = new Octokit({ auth: pat });
    const repoName = username; // Special profile repo: username/username

    // 1. Verify if repository exists, if not create it
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
        description: 'My Special GitHub Profile & Studio Showcase',
        private: false,
        auto_init: true,
      });
      // Wait briefly for GitHub repo init
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    // 2. Commit README.md
    let readmeSha: string | undefined;
    try {
      const existingFile = await octokit.repos.getContent({
        owner: username,
        repo: repoName,
        path: 'README.md',
      });
      if (!Array.isArray(existingFile.data) && 'sha' in existingFile.data) {
        readmeSha = existingFile.data.sha;
      }
    } catch (e: any) {
      // File doesn't exist yet
    }

    const readmeResponse = await octokit.repos.createOrUpdateFileContents({
      owner: username,
      repo: repoName,
      path: 'README.md',
      message: commitMessage || 'feat: update profile README via SynthetixGit Studio 🚀',
      content: Buffer.from(markdown).toString('base64'),
      sha: readmeSha,
    });

    // 3. Optionally provision .github/workflows/snake.yml
    if (workflowYaml) {
      let workflowSha: string | undefined;
      try {
        const existingWf = await octokit.repos.getContent({
          owner: username,
          repo: repoName,
          path: '.github/workflows/snake.yml',
        });
        if (!Array.isArray(existingWf.data) && 'sha' in existingWf.data) {
          workflowSha = existingWf.data.sha;
        }
      } catch (e: any) {
        // Workflow doesn't exist yet
      }

      await octokit.repos.createOrUpdateFileContents({
        owner: username,
        repo: repoName,
        path: '.github/workflows/snake.yml',
        message: 'ci: auto-provision GitHub Actions Snake & Arcade generator workflow 🐍',
        content: Buffer.from(workflowYaml).toString('base64'),
        sha: workflowSha,
      });
    }

    return NextResponse.json({
      success: true,
      repoUrl: `https://github.com/${username}/${repoName}`,
      commitSha: readmeResponse.data.commit.sha,
      message: `Successfully deployed README.md to ${username}/${repoName}!`,
    });
  } catch (error: any) {
    console.error('GitHub Deploy Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to deploy to GitHub.' },
      { status: 500 }
    );
  }
}
