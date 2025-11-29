import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { userVideos } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId || userId.trim() === '') {
      return NextResponse.json(
        { error: 'userId is required', code: 'MISSING_USER_ID' },
        { status: 400 }
      );
    }

    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const status = searchParams.get('status');

    let query = db
      .select()
      .from(userVideos)
      .where(eq(userVideos.userId, userId))
      .orderBy(desc(userVideos.createdAt));

    if (status) {
      query = db
        .select()
        .from(userVideos)
        .where(and(eq(userVideos.userId, userId), eq(userVideos.status, status)))
        .orderBy(desc(userVideos.createdAt));
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, prompt, settings } = body;

    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
      return NextResponse.json(
        { error: 'userId is required and must be a non-empty string', code: 'MISSING_USER_ID' },
        { status: 400 }
      );
    }

    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a non-empty string', code: 'MISSING_PROMPT' },
        { status: 400 }
      );
    }

    if (settings !== undefined && settings !== null) {
      if (typeof settings !== 'object') {
        return NextResponse.json(
          { error: 'Settings must be a valid JSON object', code: 'INVALID_SETTINGS' },
          { status: 400 }
        );
      }
    }

    const timestamp = new Date().toISOString();

    const newVideo = await db
      .insert(userVideos)
      .values({
        userId: userId.trim(),
        prompt: prompt.trim(),
        videoUrl: null,
        thumbnailUrl: null,
        settings: settings || null,
        status: 'pending',
        createdAt: timestamp,
        updatedAt: timestamp,
      })
      .returning();

    return NextResponse.json(newVideo[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status, videoUrl, thumbnailUrl, settings } = body;

    const existing = await db
      .select()
      .from(userVideos)
      .where(eq(userVideos.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Video not found', code: 'VIDEO_NOT_FOUND' },
        { status: 404 }
      );
    }

    if (status !== undefined) {
      const validStatuses = ['pending', 'processing', 'completed', 'failed'];
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          {
            error: 'Invalid status. Must be one of: pending, processing, completed, failed',
            code: 'INVALID_STATUS',
          },
          { status: 400 }
        );
      }
    }

    if (settings !== undefined && settings !== null && typeof settings !== 'object') {
      return NextResponse.json(
        { error: 'Settings must be a valid JSON object', code: 'INVALID_SETTINGS' },
        { status: 400 }
      );
    }

    const updates: Record<string, any> = {
      updatedAt: new Date().toISOString(),
    };

    if (status !== undefined) updates.status = status;
    if (videoUrl !== undefined) updates.videoUrl = videoUrl;
    if (thumbnailUrl !== undefined) updates.thumbnailUrl = thumbnailUrl;
    if (settings !== undefined) updates.settings = settings;

    const updated = await db
      .update(userVideos)
      .set(updates)
      .where(eq(userVideos.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const existing = await db
      .select()
      .from(userVideos)
      .where(eq(userVideos.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Video not found', code: 'VIDEO_NOT_FOUND' },
        { status: 404 }
      );
    }

    await db
      .delete(userVideos)
      .where(eq(userVideos.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Video deleted successfully',
        id: parseInt(id),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}