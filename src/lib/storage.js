import seed from '../data/recipes.json';

const KEY = 'little-recipe-box-recipes';
export const load = () => {
  try { const d = localStorage.getItem(KEY); if (d) { const p = JSON.parse(d); if (Array.isArray(p)) return p; } } catch (e) {}
  return seed;
};
export const save = recipes => { try { localStorage.setItem(KEY, JSON.stringify(recipes)); return true; } catch (e) { return false; } };
export const resetToSeed = () => { try { localStorage.removeItem(KEY); } catch (e) {} return seed; };
export const pref = {
  get: (k, d) => { try { return localStorage.getItem(k) ?? d; } catch (e) { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} },
};
export function downloadBlob(blob, filename){
  const u = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = u; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(u), 4000);
}
