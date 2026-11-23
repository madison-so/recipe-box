import { art } from './art.js';
import { esc, fmt, strip, scaleStr, parseSteps, itemsHTML, panToken, yieldText, CATS } from './text.js';

const CATBG = {bowls:'#93ADA8', bakes:'#C6CAA2', sips:'#A1AFB8', syrups:'#D3CCAB', bits:'#DFD7C7'};
function artPrint(name){
  return art(name).replace('<svg class="art" viewBox="0 0 220 160" aria-hidden="true">',
    '<svg class="art" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 160" width="300" height="218"><defs><filter id="wobp"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="2.6"/></filter></defs>')
    .replace(/url\(#wob\)/g, 'url(#wobp)');
}

/** Lay the recipe out on A4 pages (off-screen), snapshot each page and return a PDF Blob. */
export async function buildPdf(recipe, e, s){
  const [{ jsPDF }, { default: html2canvas }] = await Promise.all([import('jspdf'), import('html2canvas')]);
  try { await document.fonts.ready; } catch (err) {}
  const r = recipe, f = s.f;
  const cat = CATS[r.cat] || CATS.bits;
  const host = document.createElement('div'); host.className = 'pdf-host'; document.body.appendChild(host);
  const W = 794, H = 1123, pages = [];
  const newPage = () => { const p = document.createElement('div'); p.className = 'pdfpage'; p.innerHTML = `<div class="pbody"></div><div class="pfoot"><span>madison's little recipe box</span><span class="pnum"></span></div>`; host.appendChild(p); pages.push(p); return p.querySelector('.pbody'); };
  let body = newPage();
  const add = html => {
    const t = document.createElement('div'); t.className = 'pblock'; t.innerHTML = html; body.appendChild(t);
    if (t.offsetTop + t.offsetHeight > body.clientHeight && body.children.length > 1) { body.removeChild(t); body = newPage(); body.appendChild(t); }
  };
  const stats = [['time',e.r.time],['makes',yieldText(e.r, s)],['level',e.r.level]].filter(x=>x[1]).map(([k,v])=>`<div><b>${k}</b>${esc(v)}</div>`).join('');
  add(`<div class="phead"><div class="part" style="background:${CATBG[r.cat]||'#DFD7C7'}">${artPrint(r.art)}</div>
    <div class="pinfo"><div class="pcat">${esc(cat.label)}${e.v ? ' · ' + esc(e.v.name) : ''}</div><h1>${esc(r.title)}</h1>${r.blurb?`<p>${esc(r.blurb)}</p>`:''}<div class="pstats">${stats}</div></div></div>`);
  const ings = (e.r.ingredients||[]).map(x => x[0]==='#' ? `<li class="g">${esc(x[1])}</li>` : `<li><span class="a">${esc(strip(scaleStr(x[0], f, 'all')))}</span> ${esc(x[1])}</li>`).join('');
  if (ings) add(`<h2>Ingredients</h2><ul class="pings">${ings}</ul>${e.r.ingNote?`<p class="pnote">${fmt(e.r.ingNote)}</p>`:''}`);
  const S = t => fmt(panToken(scaleStr(t, f, 'units'), e.r, s));
  let n = 0, first = true;
  parseSteps(e.r.steps).forEach(g => {
    const head = first ? '<h2>Method</h2>' : ''; first = false;
    if (g.section !== undefined) { n = 0; add(`${head}<h3 class="psec">${fmt(g.section)}</h3>`); return; }
    n++;
    const items = g.items.length>1 || g.title ? `<ul>${itemsHTML(g.items, S)}</ul>` : `<p>${S(g.items[0]||'')}</p>`;
    add(`${head}<div class="pstep"><div class="pn">${n}</div><div>${g.title?`<h3>${fmt(g.title)}</h3>`:''}${items}${g.notes.map(x=>`<p class="paside">${S(x)}</p>`).join('')}</div></div>`);
  });
  const tips = (e.r.tips||[]).filter(Boolean), notes = (e.r.notes||'').trim();
  if (tips.length) add(`<div class="ptips"><h2>Tips</h2><ul>${tips.map(t=>`<li>${fmt(t)}</li>`).join('')}</ul></div>`);
  if (notes) add(`<div class="pnotes"><h2>Notes</h2>${notes.split(/\n\s*\n/).map(p=>`<p>${fmt(p)}</p>`).join('')}</div>`);
  pages.forEach((p,i) => { p.querySelector('.pnum').textContent = pages.length > 1 ? `${i+1} / ${pages.length}` : ''; });
  const pdf = new jsPDF({unit:'mm', format:'a4', compress:true});
  try {
    for (let i = 0; i < pages.length; i++) {
      const c = await html2canvas(pages[i], {scale:2, backgroundColor:'#F4EFDF', width:W, height:H, logging:false});
      if (i) pdf.addPage();
      pdf.addImage(c.toDataURL('image/jpeg', 0.9), 'JPEG', 0, 0, 210, 297);
    }
  } finally { host.remove(); }
  return pdf.output('blob');
}
