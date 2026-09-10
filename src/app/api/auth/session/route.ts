import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth-session';
import { maskPatToken } from '@/lib/security';

export async function GET() {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({
    authenticated: true,
    username: session.username,
    tokenPreview: maskPatToken(session.token),
  });
}
