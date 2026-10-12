import type { Metadata } from 'next';
import PathfinderApp from '@/components/pathfinder/PathfinderApp';

export const metadata: Metadata = {
  title: 'Pathfinder | DegreeYourWay',
  description: 'About ten questions, 3 minutes: your best-fit sector, ranked degree apprenticeship matches, a 12-month plan, stage-by-stage preparation and a CV check.',
};

export default function Page() {
  return <PathfinderApp />;
}
