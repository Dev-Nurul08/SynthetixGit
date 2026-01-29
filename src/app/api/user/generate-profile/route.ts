import { NextResponse } from 'next/server';
import { compileProfile, type ProfileConfig } from '@/lib/template-engine';

export async function POST(request: Request) {
  try {
    const body = await request.json() as ProfileConfig;

    if (!body.username) {
      return NextResponse.json(
        { success: false, error: 'Username is required' },
        { status: 400 }
      );
    }

    const result = compileProfile(body);

    return NextResponse.json({
      success: true,
      markdown: result.markdown,
      workflowYaml: result.workflowYaml || null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate profile',
      },
      { status: 500 }
    );
  }
}
