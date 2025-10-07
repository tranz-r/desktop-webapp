'use client';

import { useEffect, useState } from 'react';
import { getAdminQuotesPaged } from '../../../lib/api';

export default function DirectApiTest() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testApi = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Testing getAdminQuotesPaged...');
        const data = await getAdminQuotesPaged(1, 10);
        console.log('API result:', data);
        setResult(data);
      } catch (err) {
        console.error('API Error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    testApi();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Direct API Test</h1>
      
      {loading && <div className="mb-4">Loading...</div>}

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">API Result:</h2>
          <div className="mb-2">
            <strong>Items count:</strong> {result.items?.length || 0}
          </div>
          <div className="mb-2">
            <strong>Total:</strong> {result.total || 0}
          </div>
          {result.items && result.items.length > 0 && (
            <div className="mb-2">
              <strong>First item:</strong>
              <pre className="bg-gray-100 p-2 rounded text-sm">
                {JSON.stringify(result.items[0], null, 2)}
              </pre>
            </div>
          )}
          <details className="mt-4">
            <summary className="cursor-pointer font-semibold">Full Response</summary>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}


