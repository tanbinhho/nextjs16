type FetchOptions = RequestInit & {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

export async function fetcher<T>(url: string, options: FetchOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);

  // ===== Request interceptor =====
  headers.set('Content-Type', 'application/json');

  const token = process.env.API_TOKEN; // hoặc cookies()
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  // ===== Response interceptor =====
  if (!res.ok) {
    if (res.status === 401) {
      // handle refresh token / redirect login
      throw new Error('Unauthorized');
    }

    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
}
