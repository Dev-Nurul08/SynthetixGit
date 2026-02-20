/**
 * Security & Input Sanitization Engine (Milestone 20 Feb 2026)
 * Validates GitHub usernames, sanitizes PAT tokens, and prevents XSS/injection in profile generation
 */

export function sanitizeUsername(raw: string): string {
  if (!raw) return '';
  return raw.trim().replace(/[^a-zA-Z0-9-_]/g, '').substring(0, 39);
}

export function validatePatToken(token?: string): { valid: boolean; message?: string } {
  if (!token) return { valid: false, message: 'Token is missing' };
  const clean = token.trim();
  if (!clean.startsWith('ghp_') && !clean.startsWith('github_pat_')) {
    return { valid: false, message: 'Invalid GitHub PAT format (must start with ghp_ or github_pat_)' };
  }
  return { valid: true };
}

export function maskPatToken(token?: string): string {
  if (!token) return '';
  const clean = token.trim();
  if (clean.length < 8) return '****';
  return `${clean.substring(0, 4)}...${clean.substring(clean.length - 4)}`;
}
