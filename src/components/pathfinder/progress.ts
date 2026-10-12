/* eslint-disable */
// @ts-nocheck -- profile shape comes from the untyped engine.
import PF from '@/lib/pathfinderEngine';

// Progress is kept in this browser so a refresh or a return visit picks up where the student left
// off. Nothing here leaves the device; it's cleared after 30 days or on "Start again".
export const SAVE_KEY = 'dyw_pathfinder';
const SAVE_DAYS = 30;
export function loadSaved() {
  try {
    const o = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    if (!o || o.v !== 1 || Date.now() - o.at > SAVE_DAYS * 864e5) return null;
    return { step: o.step, p: { ...PF.blank(), ...o.p } };
  } catch { return null; }
}
export function clearSaved() {
  try { localStorage.removeItem(SAVE_KEY); localStorage.removeItem(SAVE_KEY + '_w'); } catch {}
}
