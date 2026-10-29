import { NextResponse } from 'next/server';
import { runSeed } from '@/lib/seedData';

export async function POST() {
  try {
    const result = await runSeed();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}
