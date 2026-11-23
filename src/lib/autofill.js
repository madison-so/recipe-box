// A small, offline recipe reader for the “paste a recipe” box.
export const FRAC = {'1/2':'½','1/4':'¼','3/4':'¾','1/3':'⅓','2/3':'⅔','1/8':'⅛'};
export const fixFrac = t => String(t).replace(/(\d+)\s+(1\/2|1\/4|3\/4|1\/3|2\/3|1\/8)\b/g, (m,a,b)=>a+FRAC[b]).replace(/\b(1\/2|1\/4|3\/4|1\/3|2\/3|1\/8)\b/g, m=>FRAC[m]);
export function quickParse(text){
  const raw = String(text).split(/\r?\n/);
  const clean = l => fixFrac(l.replace(/^#+\s*/,'').replace(/\*\*/g,'').replace(/^\\-\s*/,'').replace(/&#x20;/g,' ').trim());
  const lines = raw.map(l=>l.trim()).filter(l => l && !/^\[[^\]]*\]\(https?:[^)]*\)$/.test(l) && !/^\|?[\s:-]*-{3,}/.test(l));
  const rec = {title:'', blurb:'', time:'', yield:'', ingredients:[], steps:[], tips:[], notes:''};
  let mode = 'intro';
  const UNIT = '(?:g|kg|ml|mL|l|L|tbsp|tsp|teaspoons?|tablespoons?|cups?|oz|lbs?|cloves?|slices?|stalks?|cans?|large|small|medium|pinch|handfuls?|sprigs?|bunch(?:es)?|pieces?|portions?)';
  const AMT = new RegExp('^((?:about |approx\\.? |approximately )?(?:\\d+(?:\\.\\d+)?\\s?[¼½¾⅓⅔⅛]?|[¼½¾⅓⅔⅛])(?:\\s?[–-]\\s?(?:\\d+(?:\\.\\d+)?\\s?[¼½¾⅓⅔⅛]?|[¼½¾⅓⅔⅛]))?(?:\\s?' + UNIT + '\\b\\.?)?(?:\\s?\\([^)]*\\))?)\\s+(.+)$','i');
  lines.forEach((l, i) => {
    const c = clean(l), lc = c.toLowerCase().replace(/[:：]\s*$/,'');
    if (!rec.title) { rec.title = c.replace(/[:]$/,''); return; }
    const mk = /^(makes|serves|yield|servings?)\s*[:\-]?\s*(.+)$/i.exec(c);
    if (mk && !rec.yield) { rec.yield = mk[2].replace(/\.$/,''); return; }
    const tm = /^(total time|time|cook time|bake time)\s*[:\-]\s*(.+)$/i.exec(c);
    if (tm && !rec.time) { rec.time = tm[2]; return; }
    if (/^(ingredients?|what you.?ll need)\b/.test(lc) && c.length < 40) { mode = 'ing'; const g = c.replace(/^ingredients?\s*/i,'').replace(/[():]/g,'').trim(); if (g && rec.ingredients.length) rec.ingredients.push(['#', g]); return; }
    if (/^(instructions?|method|directions|steps|how to make|preparation)\b/.test(lc) && c.length < 40) { mode = 'steps'; return; }
    if (/^((a few )?(important )?(cooking |baking )?(notes?|tips?)( for .*)?|my recommendations?.*)$/.test(lc) && c.length < 50) { mode = 'tips'; return; }
    if (mode === 'intro') { if (!rec.blurb && c.length > 25 && !/^\d/.test(c)) rec.blurb = c; return; }
    if (mode === 'ing') {
      if (/^\|/.test(l)) { const cells = l.split('|').map(x=>clean(x)).filter(Boolean); if (!cells.length || /^ingredient/i.test(cells[0])) return; rec.ingredients.push([cells[1]||'', cells[0]]); return; }
      const t = c.replace(/^[-*•·]\s*/,'');
      if (/[:：]$/.test(t) && !/\d/.test(t)) { rec.ingredients.push(['#', t.replace(/[:：]$/,'')]); return; }
      const m = AMT.exec(t); rec.ingredients.push(m ? [m[1].trim(), m[2].charAt(0).toUpperCase()+m[2].slice(1)] : ['', t]); return;
    }
    if (mode === 'steps') {
      const sub = /^\s*[-*•]/.test(raw.find(r=>r.trim()===l) || '') && rec.steps.length;
      let t = c.replace(/^(\d+[.)]\s*|step\s*\d+[:.)]?\s*)/i,'').replace(/^[-*•·]\s*/,'');
      const bold = /^\s*(?:\d+\\?[.)]\s*)?\*\*([^*]+)\*\*\s*(.+)$/.exec(l); if (bold && bold[2].trim()) { rec.steps.push('**' + bold[1].trim() + '** ' + fixFrac(bold[2].replace(/\*\*/g,'').trim())); return; }
      if (/^\*\*[^*]+\*\*\s*$/.test(l.replace(/^\d+\\?[.)]\s*/,''))) { rec.steps.push('# ' + t.replace(/[:.]$/,'')); return; }
      if (/^\d+\\?[.)]/.test(l) && /^[-*•]/.test(lines[i+1]||'')) { rec.steps.push('# ' + t.replace(/[:.]$/,'')); return; }
      rec.steps.push(t); return;
    }
    if (mode === 'tips') { rec.tips.push(c.replace(/^[-*•·]\s*/,'')); return; }
  });
  const n = /(\d+(?:\.\d+)?)(?:\s?[–-]\s?(\d+))?\s+([a-zA-Z]+)/.exec(rec.yield || '');
  if (n) rec.scale = {kind:'count', base: n[2] ? (+n[1] + +n[2])/2 : +n[1], unit: n[3].toLowerCase()};
  return rec;
}