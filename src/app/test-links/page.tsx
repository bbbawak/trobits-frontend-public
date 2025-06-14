import { testAllLinks } from '../test-links';
import Link from 'next/link';
import TestDirectUrlButton from './TestDirectUrlButton';

export default async function TestLinksPage() {
  const results = await testAllLinks();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Link Testing Results</h1>
      <div className="grid gap-4">
        {results.map((result) => (
          <div
            key={result.route}
            className={`p-4 rounded-lg ${
              result.ok
                ? 'bg-green-900/50 border border-green-500/30'
                : 'bg-red-900/50 border border-red-500/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="font-mono text-sm text-slate-300">
                  Route: {result.route}
                </span>
                <div className="text-xs text-slate-400 font-mono">
                  Full URL: {result.fullUrl}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-400">
                  Status: {result.status}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    result.ok
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-red-500/20 text-red-300'
                  }`}
                >
                  {result.ok ? 'Working' : 'Error'}
                </span>
              </div>
            </div>
            {result.error && (
              <p className="mt-2 text-red-400 text-sm">{result.error}</p>
            )}
            <div className="mt-2 flex gap-2">
              <Link
                href={result.route}
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
              >
                Visit Page
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <TestDirectUrlButton url={result.fullUrl} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 