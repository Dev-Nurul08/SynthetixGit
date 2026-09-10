import { NextRequest, NextResponse } from 'next/server';
import { getAppUrl } from '@/lib/app-url';
import { consumeOAuthState, setAuthSession } from '@/lib/auth-session';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const oauthError = searchParams.get('error');

  if (oauthError) {
    return NextResponse.redirect(
      `${getAppUrl()}/studio?auth_error=${encodeURIComponent(oauthError)}`
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(`${getAppUrl()}/studio?auth_error=missing_code`);
  }

  const { valid, returnTo } = await consumeOAuthState(state);
  if (!valid) {
    return NextResponse.redirect(`${getAppUrl()}/studio?auth_error=invalid_state`);
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return NextResponse.redirect(`${getAppUrl()}/studio?auth_error=oauth_not_configured`);
  }

  const redirectUri = `${getAppUrl()}/api/auth/github/callback`;
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
    }),
  });

  const tokenData = (await tokenRes.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };

  if (!tokenRes.ok || !tokenData.access_token) {
    const message = tokenData.error_description || tokenData.error || 'token_exchange_failed';
    return NextResponse.redirect(`${getAppUrl()}/studio?auth_error=${encodeURIComponent(message)}`);
  }

  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'SynthetixGit/2.0.0',
    },
  });

  if (!userRes.ok) {
    return NextResponse.redirect(`${getAppUrl()}/studio?auth_error=github_user_fetch_failed`);
  }

  const user = (await userRes.json()) as { login?: string };
  if (!user.login) {
    return NextResponse.redirect(`${getAppUrl()}/studio?auth_error=missing_username`);
  }

  await setAuthSession(tokenData.access_token, user.login);

  const destination = new URL(returnTo, getAppUrl());
  destination.searchParams.set('user', user.login);
  destination.searchParams.set('auth', 'success');
  return NextResponse.redirect(destination.toString());
}
