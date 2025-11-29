import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { userVideos } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    const video = await db
      .select()
      .from(userVideos)
      .where(eq(userVideos.id, parseInt(id)))
      .limit(1);

    if (video.length === 0) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(video[0], { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}