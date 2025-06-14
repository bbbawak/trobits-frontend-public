import { navItems, archiveItems, learnItems, footerItems, authItems } from '@/components/Constant/Navbar.constant';

// Combine all routes
export const allRoutes = [
  ...navItems,
  ...archiveItems,
  ...learnItems,
  ...footerItems,
  ...authItems
].map(item => item.href);

// Function to test if a route exists
export async function testLink(route: string) {
  try {
    // Get the base URL from the environment or default to localhost
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3006';
    const fullUrl = `${baseUrl}${route}`;

    const response = await fetch(fullUrl, {
      method: 'HEAD', // Use HEAD request to check if route exists without fetching content
      cache: 'no-store' // Disable caching
    });

    return {
      route,
      fullUrl,
      status: response.status,
      ok: response.ok
    };
  } catch (error) {
    return {
      route,
      fullUrl: `http://localhost:3006${route}`,
      status: 500,
      ok: false,
      error: (error as Error).message
    };
  }
}

// Function to test all links
export async function testAllLinks() {
  const results = await Promise.all(allRoutes.map(testLink));
  return results;
} 