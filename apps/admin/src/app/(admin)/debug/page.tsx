'use client';

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [env, setEnv] = useState<any>(null);
  const [apiTest, setApiTest] = useState<any>(null);

  useEffect(() => {
    // Check environment variables
    setEnv({
      NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
      NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE,
    });

    // Test API call
    const testApi = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE;
        if (!base) {
          setApiTest({ error: 'No API base URL found' });
          return;
        }

        const url = `${base}/api/v1/quote/admin?admin=true&page=1&pageSize=10`;
        console.log('Testing API URL:', url);
        
        const response = await fetch(url, { cache: 'no-store' });
        const data = await response.json();
        
        setApiTest({
          url,
          status: response.status,
          ok: response.ok,
          data: data
        });
      } catch (error) {
        setApiTest({ error: error instanceof Error ? error.message : 'Unknown error' });
      }
    };

    testApi();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Page</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Environment Variables:</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(env, null, 2)}
        </pre>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">API Test:</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(apiTest, null, 2)}
        </pre>
      </div>
    </div>
  );
}


