/**
 * Automated Verification Script (Milestone 18 Feb 2026)
 * Validates all 15 template profiles with the Markdown validator
 */

import { compileProfile, createDefaultModules, ALL_15_TEMPLATES } from '../src/lib/template-engine';
import { validateMarkdown } from '../src/lib/markdown-validator';

async function runVerification() {
  console.log('🧪 Running SynthetixGit Profile Generator Verification Engine...\n');

  let passed = 0;
  let failed = 0;

  for (const tpl of ALL_15_TEMPLATES) {
    const modules = createDefaultModules();
    const result = compileProfile({
      username: 'Dev-Nurul08',
      templateId: tpl.id,
      theme: 'dracula',
      modules,
    });

    const report = validateMarkdown(result.markdown);

    if (report.isValid) {
      console.log(`✅ [PASS] Template: ${tpl.name} (${report.metrics.lineCount} lines, ${report.metrics.imageCount} images)`);
      passed++;
    } else {
      console.error(`❌ [FAIL] Template: ${tpl.name}`, report.errors);
      failed++;
    }
  }

  console.log(`\n🎉 Verification Summary: ${passed} Passed, ${failed} Failed.`);
  if (failed > 0) process.exit(1);
}

runVerification();
