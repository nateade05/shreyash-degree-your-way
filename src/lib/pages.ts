// The prototype switched between five in-memory "pages"; each one is now a real route.
export type Page = 'home' | 'days' | 'price' | 'schools' | 'quiz' | 'terms' | 'booked';

export const PAGE_PATH: Record<Page, string> = {
  home: '/',
  days: '/course',
  price: '/prices',
  schools: '/schools',
  quiz: '/pathfinder',
  terms: '/terms',
  booked: '/booked',
};

export function pageFromPath(pathname: string | null): Page {
  const p = (pathname || '/').replace(/\/+$/, '') || '/';
  const hit = (Object.keys(PAGE_PATH) as Page[]).find(k => PAGE_PATH[k] === p);
  return hit ?? 'home';
}
