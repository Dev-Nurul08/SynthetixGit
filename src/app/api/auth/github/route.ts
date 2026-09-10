import { randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getAppUrl } from '@/lib/app-url';
import { setOAuthState } from '@/lib/auth-session';

export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      {
        error:
          'GitHub OAuth is not configured. Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET on Vercel.',
      },
      { status: 503 }
    );
  }

  const returnTo = request.nextUrl.searchParams.get('returnTo') || '/studio';
  const state = randomBytes(24).toString('hex');
  await setOAuthState(state, returnTo);

  const redirectUri = `${getAppUrl()}/api/auth/github/callback`;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'repo read:user user:email',
    state,
  });

  return NextResponse.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
}
