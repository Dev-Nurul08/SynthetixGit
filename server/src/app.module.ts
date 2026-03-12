import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { GithubModule } from './github/github.module';
import { ThemeModule } from './theme/theme.module';

@Module({
  imports: [HealthModule, GithubModule, ThemeModule],
})
export class AppModule {}
