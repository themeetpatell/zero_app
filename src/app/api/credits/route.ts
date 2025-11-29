import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { userCredits } from '@/db/schema';
import { eq } from 'drizzle-orm';

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

    const record = await db
      .select()
      .from(userCredits)
      .where(eq(userCredits.userId, userId))
      .limit(1);

    if (record.length === 0) {
      return NextResponse.json(
        {
          userId,
          credits: 111,
          updatedAt: new Date().toISOString(),
        },
        { status: 200 }
      );
    }

    return NextResponse.json(record[0], { status: 200 });
  } catch (error: any) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId || userId.trim() === '') {
      return NextResponse.json(
        { error: 'userId is required', code: 'MISSING_USER_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { credits, amount, operation } = body;

    let finalCredits: number;

    if (credits !== undefined) {
      if (typeof credits !== 'number') {
        return NextResponse.json(
          { error: 'credits must be a number', code: 'INVALID_CREDITS' },
          { status: 400 }
        );
      }
      finalCredits = credits;
    } else if (amount !== undefined && operation !== undefined) {
      if (typeof amount !== 'number') {
        return NextResponse.json(
          { error: 'amount must be a number', code: 'INVALID_AMOUNT' },
          { status: 400 }
        );
      }

      if (operation !== 'add' && operation !== 'deduct') {
        return NextResponse.json(
          {
            error: 'operation must be "add" or "deduct"',
            code: 'INVALID_OPERATION',
          },
          { status: 400 }
        );
      }

      const existingRecord = await db
        .select()
        .from(userCredits)
        .where(eq(userCredits.userId, userId))
        .limit(1);

      const currentCredits =
        existingRecord.length > 0 ? existingRecord[0].credits : 111;

      if (operation === 'add') {
        finalCredits = currentCredits + amount;
      } else {
        if (currentCredits < amount) {
          return NextResponse.json(
            {
              error: 'Insufficient credits',
              code: 'INSUFFICIENT_CREDITS',
            },
            { status: 400 }
          );
        }
        finalCredits = currentCredits - amount;
      }
    } else {
      return NextResponse.json(
        {
          error:
            'Either credits or (amount and operation) must be provided',
          code: 'MISSING_REQUIRED_FIELDS',
        },
        { status: 400 }
      );
    }

    const existingRecord = await db
      .select()
      .from(userCredits)
      .where(eq(userCredits.userId, userId))
      .limit(1);

    if (existingRecord.length === 0) {
      const newRecord = await db
        .insert(userCredits)
        .values({
          userId,
          credits: finalCredits,
          updatedAt: new Date().toISOString(),
        })
        .returning();

      return NextResponse.json(newRecord[0], { status: 200 });
    } else {
      const updatedRecord = await db
        .update(userCredits)
        .set({
          credits: finalCredits,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(userCredits.userId, userId))
        .returning();

      return NextResponse.json(updatedRecord[0], { status: 200 });
    }
  } catch (error: any) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}