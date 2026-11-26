// Text, quantity and scaling helpers for the recipe box.
export const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const MS = '\u0001', ME = '\u0002';
export const fmt = s => esc(s).replace(/\[\[([a-z0-9-]+)\|([^\]]+)\]\]/g,'<a class="rlink" href="#$1">$2</a>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\u0001(.*?)\u0002/g,'<span class="sc">$1</span>');
export const FR = {'¼':.25,'½':.5,'¾':.75,'⅓':1/3,'⅔':2/3,'⅛':.125};
export const Q = '(?:\\d+(?:\\.\\d+)?(?:\\s?[¼½¾⅓⅔⅛])?|[¼½¾⅓⅔⅛])';
export const RANGE = '(' + Q + ')(?:\\s?[–-]\\s?(' + Q + '))?';
export const UNITS = 'g|kg|mL|ml|L|tbsp|tsp|cups?|tea bags|large eggs?|whole eggs?|egg yolks?|eggs?|yolks?|cloves|handfuls|stalks|tart shells|shells';
export function parseQ(s){ const m = /^(\d+(?:\.\d+)?)?([¼½¾⅓⅔⅛])?$/.exec(String(s).replace(/\s/g,'')); if (!m) return NaN; return (m[1]?+m[1]:0) + (m[2]?FR[m[2]]:0); }
export function fmtQty(v, metric){
  if (!isFinite(v)) return '?';
  if (metric) { if (v >= 10) return String(Math.round(v)); return String(Math.round(v*10)/10); }
  if (v >= 10) return String(Math.round(v));
  let whole = Math.floor(v), frac = v - whole;
  const C = [[0,''],[.125,'⅛'],[.25,'¼'],[1/3,'⅓'],[.5,'½'],[2/3,'⅔'],[.75,'¾'],[1,'']];
  let best = C[0]; C.forEach(c => { if (Math.abs(c[0]-frac) < Math.abs(best[0]-frac)) best = c; });
  if (best[0] === 1) { whole += 1; best = C[0]; }
  if (!whole && !best[1]) return v > 0 ? '⅛' : '0';
  return (whole ? whole : '') + best[1];
}
export const isOne = f => Math.abs(f-1) < 1e-6;
export function scaleStr(str, f, mode){
  if (!str || isOne(f)) return str || '';
  const re = mode === 'all' ? new RegExp(RANGE,'g') : new RegExp(RANGE + '(?=\\s?(?:' + UNITS + ')\\b)','g');
  return String(str).replace(re, (m, a, b, off, whole) => {
    const rest = whole.slice(off + m.length);
    const metric = /^\s?(g|kg|ml|mL|L)\b/.test(rest) || (/\./.test(a) && !/[¼½¾⅓⅔⅛]/.test(a));
    let out = fmtQty(parseQ(a)*f, metric);
    if (b) out += '–' + fmtQty(parseQ(b)*f, metric);
    const many = parseQ(b || a)*f > 1.001;
    return MS + out + ME + (many ? '\u0003' : '');
  }).replace(/\u0003(\s?)(cup|can|bunch)\b(?!s|es)/g, (m, sp, w) => sp + w + (w==='bunch' ? 'es' : 's')).replace(/\u0003/g, '');
}
export function firstNum(str){ const m = new RegExp(RANGE).exec(String(str||'')); if (!m) return null; const v = parseQ(m[1]); return isFinite(v) && v > 0 ? {v, metric:/^\s?(g|kg|ml|mL|L)\b/.test(String(str).slice(m.index + m[0].length)) || /\./.test(m[1]), rest:String(str).slice(m.index+m[0].length).trim()} : null; }
export const strip = s => String(s).replace(/[\u0001\u0002]/g,'');

export function scaleOf(r){ return r.scale || {kind:'count', base:1, unit:'batches'}; }
/** Merge the chosen variant (flavour/style tab) over the recipe. */
export function eff(r, vIndex = 0){
  const vs = r.variants || [];
  if (!vs.length) return {r, vi:-1, v:null, key:r.id};
  const vi = Math.min(vIndex || 0, vs.length-1);
  const v = vs[vi];
  const e = Object.assign({}, r);
  ['ingredients','ingNote','steps','yield','time','scale','tips','notes'].forEach(k => { if (v[k] !== undefined && !(Array.isArray(v[k]) && !v[k].length && k==='steps')) e[k] = v[k]; });
  return {r:e, vi, v, key: v.scale ? r.id + ':' + vi : r.id};
}
export function newScale(sc){ return {f:1, shape:'rect', w:sc.w||9, l:sc.l||9, d:sc.d||9, vu:'mL', src:''}; }
export const single = u => u ? u.replace(/ies$/,'y').replace(/s$/,'') : u;
export function panDesc(s){ return s.shape === 'round' ? `${trimN(s.d)}-inch round` : `${trimN(s.w)} × ${trimN(s.l)}-inch`; }
export const trimN = n => String(Math.round(n*100)/100);
export function panArea(s){ return s.shape === 'round' ? Math.PI*Math.pow(s.d/2,2) : s.w*s.l; }
export function yieldText(r, s){
  const sc = scaleOf(r), f = s.f;
  if (sc.kind === 'pan') {
    if (s.src === 'pan' || isOne(f)) return 'one ' + (isOne(f) && s.src !== 'pan' ? `${sc.w} × ${sc.l}-inch` : panDesc(s)) + ' pan';
    return `${fmtQty(f,false)}× a ${sc.w} × ${sc.l}-inch pan`;
  }
  if (isOne(f)) return r.yield;
  if (sc.kind === 'volume') {
    if (sc.lo && sc.hi) return `about ${Math.round(sc.lo*f)}–${Math.round(sc.hi*f)} mL`;
    return `about ${Math.round(sc.base*f)} mL`;
  }
  if (sc.lo && sc.hi) return `${fmtQty(sc.lo*f,false)}–${fmtQty(sc.hi*f,false)} ${sc.unit}`;
  const n = sc.base*f;
  return `${fmtQty(n,false)} ${Math.abs(n-1)<.01 ? single(sc.unit) : sc.unit}`;
}
export function panToken(text, r, s){
  const sc = scaleOf(r);
  if (sc.kind !== 'pan') return text;
  const d = (s.src==='pan') ? panDesc(s) : `${sc.w} × ${sc.l}-inch`;
  return text.replace(/\{pan\}/g, d);
}

export function itemsHTML(items, S){
  let out = '';
  items.forEach(i => {
    if (/^-\s/.test(i) && out) { const sub = `<li>${S(i.replace(/^-\s+/,''))}</li>`; out = out.endsWith('</ul></li>') ? out.slice(0,-10) + sub + '</ul></li>' : out.slice(0,-5) + `<ul class="sub">${sub}</ul></li>`; }
    else out += `<li>${S(i.replace(/^-\s+/,''))}</li>`;
  });
  return out;
}
export function parseSteps(lines){
  const out = []; let cur = null;
  (lines||[]).forEach(raw => {
    const line = String(raw).trim(); if (!line) return;
    if (line.startsWith('## ')) { out.push({section: line.slice(3)}); cur = null; }
    else if (line.startsWith('# ')) { cur = {title: line.slice(2), items: [], notes: []}; out.push(cur); }
    else if (line.startsWith('>')) { if (!cur) { cur = {title:'',items:[],notes:[]}; out.push(cur); } cur.notes.push(line.replace(/^>\s?/,'')); }
    else if (cur && cur.title) cur.items.push(line);
    else { cur = {title:'', items:[line], notes:[]}; out.push(cur); }
  });
  return out;
}

/* scaled parts (re-rendered in place while typing) */
export function slug(s){ return (String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,60)) || 'recipe'; }

export const SORTS = {default:'default', newest:'latest to oldest', oldest:'oldest to latest', az:'A–Z', za:'Z–A'};
export function sortList(list, sort){
  const t = r => String(r.title||'').toLowerCase();
  const a = r => r.added || '';
  const c = list.slice();
  if (sort==='default') return c;
  if (sort==='az') c.sort((x,y)=>t(x).localeCompare(t(y)));
  else if (sort==='za') c.sort((x,y)=>t(y).localeCompare(t(x)));
  else if (sort==='oldest') c.sort((x,y)=>a(x).localeCompare(a(y)));
  else c.sort((x,y)=>a(y).localeCompare(a(x)));
  return c;
}
export const CATS = {
  bowls:{label:'Bowls & Noodles', icon:'bowl'},
  bakes:{label:'Bakes & Sweets', icon:'whisk'},
  sips:{label:'Sips', icon:'cup'},
  syrups:{label:'Syrups', icon:'bottle'},
  bits:{label:'Little Bits', icon:'leaf'}
};
/** Render the method into HTML, with scaled quantities highlighted. */
export function stepsHTML(r, s, f){
  const blocks = parseSteps(r.steps);
  const S = t => fmt(panToken(scaleStr(t, f, 'units'), r, s));
  let html = '<ol>';
  blocks.forEach(gp => {
    if (gp.section !== undefined) { html += `</ol><h3 class="section">${fmt(gp.section)}</h3><ol>`; return; }
    html += `<li class="step"><div>${gp.title?`<h3>${fmt(gp.title)}</h3>`:''}
      ${gp.items.length>1 || gp.title ? `<ul>${itemsHTML(gp.items, S)}</ul>` : `<p>${S(gp.items[0]||'')}</p>`}
      ${gp.notes.map(n=>`<div class="aside">${ASIDE}<span>${S(n)}</span></div>`).join('')}</div></li>`;
  });
  return (html + '</ol>').replace(/<ol><\/ol>/g,'');
}
export const ASIDE = '<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="#543F2B" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19C5 10 11 5 20 4c0 9-5 15-15 15z"/><path d="M5 19L14 10"/></g></svg>';
export const readIng = text => String(text||'').split('\n').map(s=>s.trim()).filter(Boolean).map(l => {
  if (l.startsWith('## ')) return ['#', l.slice(3).trim()];
  const i = l.indexOf('|'); return i<0 ? ['', l] : [l.slice(0,i).trim(), l.slice(i+1).trim()];
});
export const ingToText = list => (list||[]).map(x=> x[0]==='#' ? '## '+x[1] : (x[0]?x[0]+' | '+x[1]:x[1])).join('\n');
