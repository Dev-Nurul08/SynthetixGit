import { cookies } from 'next/headers';

export const AUTH_COOKIE_TOKEN = 'synthetix_github_token';
export const AUTH_COOKIE_USER = 'synthetix_github_user';
export const AUTH_COOKIE_STATE = 'synthetix_oauth_state';
export const AUTH_COOKIE_RETURN = 'synthetix_oauth_return';

const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_MAX_AGE,
  };
}

export async function setAuthSession(token: string, username: string) {
  const jar = await cookies();
  jar.set(AUTH_COOKIE_TOKEN, token, sessionCookieOptions());
  jar.set(AUTH_COOKIE_USER, username, sessionCookieOptions());
}

export async function clearAuthSession() {
  const jar = await cookies();
  jar.delete(AUTH_COOKIE_TOKEN);
  jar.delete(AUTH_COOKIE_USER);
}

export async function getAuthSession(): Promise<{ token: string; username: string } | null> {
  const jar = await cookies();
  const token = jar.get(AUTH_COOKIE_TOKEN)?.value;
  const username = jar.get(AUTH_COOKIE_USER)?.value;
  if (!token || !username) return null;
  return { token, username };
}

export async function setOAuthState(state: string, returnTo: string) {
  const jar = await cookies();
  const opts = { ...sessionCookieOptions(), maxAge: 60 * 10 };
  jar.set(AUTH_COOKIE_STATE, state, opts);
  jar.set(AUTH_COOKIE_RETURN, returnTo, opts);
}

export async function consumeOAuthState(
  state: string
): Promise<{ valid: boolean; returnTo: string }> {
  const jar = await cookies();
  const stored = jar.get(AUTH_COOKIE_STATE)?.value;
  const returnTo = jar.get(AUTH_COOKIE_RETURN)?.value || '/studio';
  jar.delete(AUTH_COOKIE_STATE);
  jar.delete(AUTH_COOKIE_RETURN);
  return { valid: Boolean(stored && stored === state), returnTo };
}
