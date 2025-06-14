import { routes, testRoute } from '../test-routes';

export default async function TestPage() {
  const results = await Promise.all(routes.map(testRoute));

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Route Testing Results</h1>
      <div className="grid gap-4">
        {results.map((result) => (
          <div
            key={result.route}
            className={`p-4 rounded-lg ${
              result.accessible
                ? 'bg-green-900/50 border border-green-500/30'
                : 'bg-red-900/50 border border-red-500/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono">{result.route}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  result.accessible
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-red-500/20 text-red-300'
                }`}
              >
                {result.accessible ? 'Accessible' : 'Error'}
              </span>
            </div>
            {result.error && (
              <p className="mt-2 text-red-400 text-sm">{result.error}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 