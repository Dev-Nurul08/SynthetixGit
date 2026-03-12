import { Controller, Get, Param, Query } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  /**
   * GET /github/profile/:username
   * Returns profile, top repos, and language distribution for a GitHub user.
   */
  @Get('profile/:username')
  async getProfile(@Param('username') username: string) {
    return this.githubService.fetchProfile(username);
  }

  /**
   * GET /github/search?q=username
   * Quick search alias — same as profile lookup.
   */
  @Get('search')
  async searchUser(@Query('q') q: string) {
    if (!q) return { error: 'Query param "q" is required' };
    return this.githubService.fetchProfile(q.trim());
  }
}
