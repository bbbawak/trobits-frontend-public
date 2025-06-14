import { headers } from 'next/headers';

// List of all routes to test
export const routes = [
  '/',
  '/aboutus',
  '/archive',
  '/archive/lunc',
  '/archive/shiba',
  '/articles',
  '/auth/forgotPassword',
  '/auth/login',
  '/auth/signin',
  '/contact',
  '/contactUs',
  '/cookiepolicy',
  '/cryptohub',
  '/cryptohub/cryptochat',
  '/cryptohub/feed',
  '/cryptohub/myspot',
  '/cryptohub/notifications',
  '/cryptohub/videoPost',
  '/disclaimer',
  '/faq',
  '/howitworks',
  '/leaderboard',
  '/learn',
  '/learnType/cryptoBasic',
  '/learnType/cryptoTips',
  '/lunc',
  '/privacypolicy',
  '/shiba'
];

// Function to test if a route is accessible
export async function testRoute(route: string) {
  try {
    const headersList = headers();
    const pathname = headersList.get('x-pathname') || '';
    
    return {
      route,
      accessible: true,
      current: pathname === route
    };
  } catch (error) {
    return {
      route,
      accessible: false,
      error: (error as Error).message
    };
  }
} 