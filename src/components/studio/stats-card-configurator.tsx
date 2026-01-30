'use client';

import { ToggleSwitch } from '@/components/ui/toggle-switch';
import type { ModuleConfig } from '@/lib/template-engine';

interface StatsCardConfiguratorProps {
  statsCard: ModuleConfig['githubAnalytics'];
  onUpdate: (value: Partial<ModuleConfig['githubAnalytics']>) => void;
}

export function StatsCardConfigurator({ statsCard, onUpdate }: StatsCardConfiguratorProps) {
  return (
    <div className="space-y-1.5">
      <ToggleSwitch
        enabled={statsCard.showProfileDetailsCard}
        onToggle={(v) => onUpdate({ showProfileDetailsCard: v })}
        label="Profile Details Header Card"
        description="Total stars, commits, PRs, and issues"
        icon="📊"
      />
      <ToggleSwitch
        enabled={statsCard.showReposPerLanguage}
        onToggle={(v) => onUpdate({ showReposPerLanguage: v })}
        label="Repos Per Language Card"
        description="Breakdown of repositories by language"
        icon="📁"
      />
      <ToggleSwitch
        enabled={statsCard.showMostCommitLanguage}
        onToggle={(v) => onUpdate({ showMostCommitLanguage: v })}
        label="Most Commit Language Card"
        description="Language with highest commit volume"
        icon="💬"
      />
      <ToggleSwitch
        enabled={statsCard.showActivityWave}
        onToggle={(v) => onUpdate({ showActivityWave: v })}
        label="Activity Timeline Wave Graph"
        description="Visual contribution wave chart"
        icon="📈"
      />
      <ToggleSwitch
        enabled={statsCard.showTrophies}
        onToggle={(v) => onUpdate({ showTrophies: v })}
        label="Profile Trophy Showcase"
        description="GitHub ranking and milestone trophies"
        icon="🏆"
      />
    </div>
  );
}
