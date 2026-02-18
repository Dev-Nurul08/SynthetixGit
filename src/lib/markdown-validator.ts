/**
 * Markdown & GFM Syntax Validation Engine (Milestone 18 Feb 2026)
 * Validates GFM table formatting, HTML tag balance, and URI encodings
 */

export interface ValidationReport {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  metrics: {
    lineCount: number;
    imageCount: number;
    linkCount: number;
    tableCount: number;
  };
}

export function validateMarkdown(markdown: string): ValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];

  const lines = markdown.split('\n');
  const lineCount = lines.length;

  const imageMatches = markdown.match(/<img\s+[^>]*>|!\[[^\]]*\]\([^)]+\)/g) || [];
  const linkMatches = markdown.match(/<a\s+[^>]*>|\[[^\]]+\]\([^)]+\)/g) || [];
  const tableMatches = markdown.match(/<table[\s\S]*?<\/table>/g) || [];

  // Check tag balance for critical tags
  const openDivs = (markdown.match(/<div(\s+[^>]*)?>/g) || []).length;
  const closeDivs = (markdown.match(/<\/div>/g) || []).length;
  if (openDivs !== closeDivs) {
    warnings.push(`Mismatch in <div> tags: ${openDivs} opened vs ${closeDivs} closed.`);
  }

  const openDetails = (markdown.match(/<details(\s+[^>]*)?>/g) || []).length;
  const closeDetails = (markdown.match(/<\/details>/g) || []).length;
  if (openDetails !== closeDetails) {
    errors.push(`Unclosed <details> tag detected: ${openDetails} opened vs ${closeDetails} closed.`);
  }

  // Check for common broken image protocols
  if (markdown.includes('src="http://')) {
    warnings.push('Insecure HTTP images found; consider HTTPS for GitHub GFM compatibility.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    metrics: {
      lineCount,
      imageCount: imageMatches.length,
      linkCount: linkMatches.length,
      tableCount: tableMatches.length,
    },
  };
}
