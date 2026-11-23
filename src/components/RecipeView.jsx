import React, { useState } from 'react';
import Html from './Html.jsx';
import NumberField from './NumberField.jsx';
import { art, icon, loopy, cutoutFlowers } from '../lib/art.js';
import { CATS, eff, esc, fmt, scaleOf, newScale, yieldText, scaleStr, strip, firstNum, isOne, panArea, stepsHTML, slug } from '../lib/text.js';
import { buildPdf } from '../lib/pdf.js';
import { downloadBlob } from '../lib/storage.js';

const CONV = { mL: 1, cups: 250, 'fl oz': 29.57 };
const MULTS = [[.5,'½×'],[1,'1×'],[1.5,'1½×'],[2,'2×'],[3,'3×']];
const PANS = [['rect',8,8],['rect',9,9],['rect',8,12],['rect',9,13],['round',8],['round',9]];

function AmountButton({ amount, f, onScale }) {
  const [editing, setEditing] = useState(false);
  const fn = firstNum(amount);
  if (!fn) return amount ? <span className="plain">{amount}</span> : null;
  if (editing) {
    const commit = el => { const v = parseFloat(el.value); setEditing(false); if (v > 0) onScale(v / fn.v); };
    return (
      <span className="amt-wrap">
        <input className="amt-input" type="number" step="any" min="0" autoFocus
          defaultValue={+(fn.v * f).toFixed(fn.metric ? 1 : 2)}
          onKeyDown={e => { if (e.key === 'Enter') commit(e.target); if (e.key === 'Escape') setEditing(false); }}
          onBlur={e => commit(e.target)} onClick={e => e.stopPropagation()} />
        <span className="amt-unit">{fn.rest.split(',')[0]}</span>
      </span>
    );
  }
  return (
    <span className="amt-wrap">
      <button type="button" className={'amt-btn' + (isOne(f) ? '' : ' scaled')} title="change this amount and everything else adjusts"
        onClick={e => { e.stopPropagation(); setEditing(true); }}>{strip(scaleStr(amount, f, 'all'))}</button>
    </span>
  );
}

function ScalePanel({ r, s, set, open, setOpen }) {
  const sc = scaleOf(r);
  const setF = (f, src) => { if (f > 0 && isFinite(f)) set({ f, src }); };
  const panF = next => panArea(next) / (sc.w * sc.l);
  let q;
  if (sc.kind === 'pan') {
    q = <>
      <p className="q">what size pan?</p>
      <div className="mchips" style={{ marginBottom: 10 }}>
        {PANS.map(p => {
          const on = s.src === 'pan' && s.shape === p[0] && (p[0] === 'round' ? s.d === p[1] : s.w === p[1] && s.l === p[2]);
          const next = p[0] === 'round' ? { ...s, shape: 'round', d: p[1] } : { ...s, shape: 'rect', w: p[1], l: p[2] };
          return <button key={p.join()} type="button" className={'mchip' + (on ? ' on' : '')}
            onClick={() => set({ ...next, f: panF(next), src: 'pan' })}>{p[0] === 'round' ? `${p[1]}" round` : `${p[1]} × ${p[2]}`}</button>;
        })}
      </div>
      <div className="srow">
        <select value={s.shape} aria-label="pan shape" onChange={e => { const next = { ...s, shape: e.target.value }; set({ ...next, f: panF(next), src: 'pan' }); }}>
          <option value="rect">square / rectangle</option><option value="round">round</option>
        </select>
        {s.shape === 'round'
          ? <><NumberField step="0.5" min="1" value={s.d} aria-label="diameter" onValue={v => { const next = { ...s, d: v }; set({ ...next, f: panF(next), src: 'pan' }); }} /><span className="u">inch across</span></>
          : <><NumberField step="0.5" min="1" value={s.w} aria-label="width" onValue={v => { const next = { ...s, w: v }; set({ ...next, f: panF(next), src: 'pan' }); }} />
              <span className="x">×</span>
              <NumberField step="0.5" min="1" value={s.l} aria-label="length" onValue={v => { const next = { ...s, l: v }; set({ ...next, f: panF(next), src: 'pan' }); }} /><span className="u">inches</span></>}
      </div>
    </>;
  } else if (sc.kind === 'volume') {
    q = <>
      <p className="q">how much do you want to make?</p>
      <div className="srow">
        <NumberField value={+((sc.base * s.f) / CONV[s.vu]).toFixed(s.vu === 'mL' ? 0 : 2)} aria-label="amount" onValue={v => setF(v * CONV[s.vu] / sc.base, 'vol')} />
        <select value={s.vu} aria-label="unit" onChange={e => set({ vu: e.target.value })}>{Object.keys(CONV).map(u => <option key={u}>{u}</option>)}</select>
      </div>
    </>;
  } else {
    q = <>
      <p className="q">how many {sc.unit}?</p>
      <div className="srow"><NumberField value={+(sc.base * s.f).toFixed(2)} aria-label={sc.unit} onValue={v => setF(v / sc.base, 'count')} /><span className="u">{sc.unit}</span></div>
    </>;
  }
  return (
    <div className="scale">
      <button type="button" className="sc-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
        <h2><Html html={icon('scale')} /> Adjust the batch</h2><span className={'chev' + (open ? ' up' : '')}><Html html={icon('back')} /></span>
      </button>
      <div className="factor top"><span>making <b>{yieldText(r, s)}</b></span>{!isOne(s.f) && <button type="button" onClick={() => set({ f: 1, src: '' })}>reset</button>}</div>
      {!isOne(s.f) && <p className="warn">Bake &amp; cook times and temperatures stay as written{sc.kind === 'pan' ? ' — a deeper or shallower layer may need more or less time, so check early' : ' — keep an eye on things'}.</p>}
      {open && <div className="sc-body">
        <p className="sub">or tap any amount in the ingredients to change it</p>
        {q}
        <div className="mchips">{MULTS.map(([m, l]) => <button key={m} type="button" className={'mchip' + (Math.abs(s.f - m) < 1e-6 ? ' on' : '')} onClick={() => setF(m, 'mult')}>{l}</button>)}</div>
      </div>}
    </div>
  );
}

export default function RecipeView({ recipe: r, onBack, onEdit, onDelete, toast }) {
  const [vi, setVi] = useState(0);
  const [scales, setScales] = useState({});
  const [got, setGot] = useState({});
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const e = eff(r, vi);
  const sc = scaleOf(e.r);
  const s = scales[e.key] || newScale(sc);
  const set = patch => setScales(m => ({ ...m, [e.key]: { ...(m[e.key] || newScale(sc)), ...patch } }));
  const cat = CATS[r.cat] || CATS.bits;
  const vs = r.variants || [];
  const vlabel = r.variantLabel || (vs.every(v => !v.steps || !v.steps.length) ? 'flavour' : 'part');
  const tips = (e.r.tips || []).filter(Boolean), notes = (e.r.notes || '').trim();
  const g = got[e.key] || {};
  const stats = [['time', e.r.time], ['makes', yieldText(e.r, s)], ['level', e.r.level]].filter(x => x[1]);

  const pdf = async () => {
    setBusy(true);
    try { const blob = await buildPdf(r, e, s); downloadBlob(blob, slug(r.title) + (e.v ? '-' + slug(e.v.name) : '') + '.pdf'); }
    catch (err) { toast('couldn’t make the pdf just now'); }
    finally { setBusy(false); }
  };

  return (
    <div className="wrap">
      <button className="back" onClick={onBack}><Html html={icon('back')} /> back to the box</button>
      <section className="r-head">
        <div className={'r-art bg-' + r.cat}><Html html={art(r.art)} /><Html style={{ position: 'absolute', left: 14, top: 14 }} html={loopy('#F0EACF', '#5A3A2A', 54)} /></div>
        <div className="r-info">
          <div className="cat"><Html html={icon(cat.icon, '#7C7B50')} />{cat.label}{r.signature && <> · <Html html={icon('heart', '#7C7B50')} /> signature</>}</div>
          <h1>{r.title}</h1>
          {r.blurb && <p className="blurb">{r.blurb}</p>}
          {stats.length > 0 && <div className="stats">{stats.map(([k, v]) => <div className="stat" key={k}><b>{k}</b><span>{v}</span></div>)}</div>}
          <div className="r-actions">
            <button className="btn olive" onClick={pdf} disabled={busy}><Html html={icon('list', '#F0EACF')} /> {busy ? 'making your pdf…' : 'download pdf'}</button>
            <button className="btn ghost" onClick={onEdit}><Html html={icon('pencil')} /> edit</button>
            <button className="btn danger" onClick={onDelete}><Html html={icon('trash', '#7a3b2a')} /> delete</button>
          </div>
        </div>
      </section>
      {vs.length > 0 && <div className="variants" role="tablist"><span className="lbl">choose a {vlabel}:</span>
        {vs.map((v, i) => <button key={i} className={'vtab' + (i === e.vi ? ' on' : '')} role="tab" aria-selected={i === e.vi} onClick={() => setVi(i)}>
          <span className="dot" style={{ background: v.dot || '#D3CCAB' }} />{v.name}</button>)}
      </div>}
      <section className="r-body">
        <aside className="ing-col">
          <ScalePanel r={e.r} s={s} set={set} open={open} setOpen={setOpen} />
          <div className="ing">
            <h2><Html html={icon('list')} /> Ingredients{e.v && <span className="mono vname"> · {e.v.name}</span>}</h2>
            <p className="hint">tap to tick off as you go</p>
            <ul>{(e.r.ingredients || []).map((x, i) => x[0] === '#'
              ? <li key={i} className="group">{x[1]}</li>
              : <li key={i} className={g[i] ? 'got' : ''} onClick={() => setGot(m => ({ ...m, [e.key]: { ...g, [i]: !g[i] } }))}>
                  <span className="box" /><span className="txt"><AmountButton amount={x[0]} f={s.f} onScale={f => set({ f, src: 'ing' })} /><span className="nm">{x[1]}</span></span>
                </li>)}
            </ul>
            {e.r.ingNote && <Html as="p" className="note" html={fmt(e.r.ingNote)} />}
          </div>
        </aside>
        <div>
          <div className="steps"><h2><Html html={icon('pot')} /> Method{e.v && <span className="mono vname"> · {e.v.name}</span>}</h2><Html as="div" html={stepsHTML(e.r, s, s.f)} /></div>
          {tips.length > 0 && <div className="tips"><h2><Html html={icon('flower')} /> Tips</h2><ul>{tips.map((t, i) => <Html as="li" key={i} html={fmt(t)} />)}</ul></div>}
          {notes && <div className="notes"><Html html={cutoutFlowers()} /><div className="inner"><h2><Html html={icon('heart')} /> Notes to self</h2>{notes.split(/\n\s*\n/).map((p, i) => <Html as="p" key={i} html={fmt(p)} />)}</div></div>}
        </div>
      </section>
    </div>
  );
}
