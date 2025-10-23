import { NextRequest, NextResponse } from 'next/server';

const BASE = process.env.NP_API_BASE!;
const KEY  = process.env.NP_API_KEY!;

function withApiKey(url: string, params: Record<string, string>) {
  const u = new URL(url);
  // додаємо apiKey в query, як вимагає NovaPost
  u.searchParams.set('apiKey', KEY);
  Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));
  return u.toString();
}

async function npGet(path: string, params: Record<string, string> = {}, lang = 'uk') {
  const url = withApiKey(`${BASE}/${path}`, params);
  const r = await fetch(url, {
    headers: { 'Accept-Language': lang },
    cache: 'no-store',
  });
  if (!r.ok) throw new Error(`NP ${r.status}: ${await r.text()}`);
  return r.json();
}

export async function POST(req: NextRequest) {
  try {
    const { action, payload, lang = 'uk' } = await req.json();

    if (action === 'authCheck') {
      // приклад з постмана: /clients/authorization?apiKey=...
      const data = await npGet('clients/authorization', {}, lang);
      return NextResponse.json({ data });
    }

    if (action === 'divisionsByName') {
      // пошук міст/поділень: name=*запит*
      const data = await npGet('divisions', {
        'countryCodes[]': payload.countryCode ?? 'UA',
        limit: String(payload.limit ?? 100),
        name: payload.name, // наприклад "*Київ*"
      }, lang);
      return NextResponse.json({ data });
    }

    if (action === 'divisionsExactCity') {
      // усі відділення для конкретного міста (без зірочки)
      const data = await npGet('divisions', {
        'countryCodes[]': payload.countryCode ?? 'UA',
        limit: String(payload.limit ?? 500),
        name: payload.city, // наприклад "Київ"
      }, lang);
      return NextResponse.json({ data });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
