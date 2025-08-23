export interface QuoteLoadResponse {
  quote: string | null;
  etag: string | null;
  status: number;
}

export async function ensureGuest(baseUrl: string): Promise<{ guestId: string } | null> {
  try {
    const res = await fetch(`${baseUrl}/api/guest/ensure`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function loadQuote(baseUrl: string, etag?: string | null): Promise<QuoteLoadResponse | null> {
  try {
    const headers: Record<string, string> = {};
    if (etag) headers['If-None-Match'] = etag;
    const res = await fetch(`${baseUrl}/api/guest/quote`, {
      method: 'GET',
      credentials: 'include',
      headers,
    });
    if (res.status === 304) {
      const hdrEtag = res.headers.get('ETag');
      return { quote: null, etag: hdrEtag, status: 304 };
    }
    if (!res.ok) return { quote: null, etag: null, status: res.status };
    const data = await res.json();
    const hdrEtag = res.headers.get('ETag');
    return { quote: data?.quote ?? null, etag: hdrEtag ?? data?.etag ?? null, status: 200 };
  } catch {
    return null;
  }
}

export async function saveQuote(baseUrl: string, quote: string, etag: string | null): Promise<{ etag: string | null; status: number }> {
  try {
    // Parse the quote to ensure it has required fields
    let quoteData;
    try {
      quoteData = JSON.parse(quote);
    } catch {
      quoteData = quote;
    }

    // Structure the request body as expected by the API
    const requestBody = {
      quote: quoteData,
      etag: etag
    };

    const res = await fetch(`${baseUrl}/api/guest/quote`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    if (res.status === 412) return { etag: null, status: 412 };
    if (!res.ok) return { etag: null, status: res.status };
    const data = await res.json();
    return { etag: data?.etag ?? null, status: 200 };
  } catch {
    return { etag: null, status: 0 };
  }
}


