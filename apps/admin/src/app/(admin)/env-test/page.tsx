'use client';

export default function EnvTest() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variable Test</h1>
      <div className="space-y-4">
        <div>
          <strong>NEXT_PUBLIC_API_BASE_URL:</strong> {process.env.NEXT_PUBLIC_API_BASE_URL || 'undefined'}
        </div>
        <div>
          <strong>NEXT_PUBLIC_API_BASE:</strong> {process.env.NEXT_PUBLIC_API_BASE || 'undefined'}
        </div>
        <div>
          <strong>All env vars:</strong>
          <pre className="bg-gray-100 p-2 rounded mt-2">
            {JSON.stringify(process.env, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}


