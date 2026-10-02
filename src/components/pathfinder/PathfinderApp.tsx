'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PathfinderWizard from './PathfinderWizard';
import { knownLead } from '@/lib/leads';
import './pathfinder.css';

// The Pathfinder runs full screen at /pathfinder, as designed: its own slim header and Close, no
// site chrome. Close returns to the overview; the report's course link goes to /course.
export default function PathfinderApp() {
  const router = useRouter();
  const [known, setKnown] = useState<ReturnType<typeof knownLead>>(null);
  // Details from the discovery-call pop-up live in this browser's storage, so read them after mount.
  useEffect(() => {
    const k = knownLead();
    if (k) queueMicrotask(() => setKnown(k));
  }, []);
  return (
    <div className="pf2">
      <PathfinderWizard useAI={false} knownLead={known} onExit={() => router.push('/')} onCourse={() => router.push('/course')} />
    </div>
  );
}
