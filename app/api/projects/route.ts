import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

// ── Auth ─────────────────────────────────────────────────────
function isAuthed(req: NextRequest): boolean {
  const key = req.headers.get('X-Admin-Key');
  return key === process.env.ADMIN_PASSWORD || key === process.env.API_KEY;
}

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
};

// ── OPTIONS (CORS preflight) ─────────────────────────────────
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

// ── GET ───────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const slug = req.nextUrl.searchParams.get('slug');
  const id   = req.nextUrl.searchParams.get('id');

  try {
    if (slug) {
      const { data, error } = await supabaseAdmin.from('projects').select('*').eq('slug', slug).single();
      if (error) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(data, { headers: CORS });
    }
    if (id) {
      const { data, error } = await supabaseAdmin.from('projects').select('*').eq('id', id).single();
      if (error) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(data, { headers: CORS });
    }
    const { data, error } = await supabaseAdmin
      .from('projects').select('*')
      .order('sort_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json(data ?? [], { headers: CORS });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500, headers: CORS });
  }
}

// ── POST (create) ─────────────────────────────────────────────
export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    if (!body.title || !body.slug || !body.category || !body.status) {
      return NextResponse.json({ error: 'Missing required fields: title, slug, category, status' }, { status: 400 });
    }
    const { data, error } = await supabaseAdmin.from('projects').insert(body).select().single();
    if (error) throw error;
    return NextResponse.json(data, { status: 201, headers: CORS });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500, headers: CORS });
  }
}

// ── PUT (update) ──────────────────────────────────────────────
export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing ?id=' }, { status: 400 });

  try {
    const body = await req.json();
    const { data, error } = await supabaseAdmin.from('projects').update(body).eq('id', id).select().single();
    if (error) throw error;
    return NextResponse.json(data, { headers: CORS });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500, headers: CORS });
  }
}

// ── DELETE ────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing ?id=' }, { status: 400 });

  try {
    const { error } = await supabaseAdmin.from('projects').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ deleted: true }, { headers: CORS });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500, headers: CORS });
  }
}
