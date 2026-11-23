import React, { useState } from 'react';
import Html from './Html.jsx';
import { icon, ARTS } from '../lib/art.js';
import { CATS, readIng, ingToText } from '../lib/text.js';
import { quickParse } from '../lib/autofill.js';

const blank = { title: '', cat: 'bowls', art: '', time: '', yield: '', level: 'Easy', blurb: '', ingredients: [], ingNote: '', steps: [], tips: [], notes: '', scale: { kind: 'count', base: 2, unit: 'servings' } };

function toForm(r) {
  const sc = r.scale || { kind: 'count', base: 1, unit: 'batches' };
  return {
    title: r.title || '', cat: r.cat || 'bowls', art: r.art || '', level: r.level || 'Easy', time: r.time || '', yield: r.yield || '', blurb: r.blurb || '',
    signature: !!r.signature, also: r.also || [],
    sk: sc.kind, sb: sc.base || '', su: sc.unit || '', pw: sc.w || 9, pl: sc.l || 9,
    ingredients: ingToText(r.ingredients), ingNote: r.ingNote || '', steps: (r.steps || []).join('\n'), tips: (r.tips || []).join('\n'), notes: r.notes || '',
    variants: (r.variants || []).map(v => ({ ...v, _ing: ingToText(v.ingredients), _steps: (v.steps || []).join('\n') })),
  };
}

export default function RecipeForm({ recipe, defaultCat, onSave, onCancel }) {
  const isNew = !recipe;
  const [f, setF] = useState(() => toForm(recipe || { ...blank, cat: defaultCat || 'bowls' }));
  const [paste, setPaste] = useState('');
  const [status, setStatus] = useState('');
  const up = patch => setF(x => ({ ...x, ...patch }));
  const bind = k => ({ value: f[k], onChange: e => up({ [k]: e.target.value }) });
  const upVar = (i, patch) => setF(x => ({ ...x, variants: x.variants.map((v, j) => j === i ? { ...v, ...patch } : v) }));

  const autofill = () => {
    if (!paste.trim()) { setStatus('paste a recipe in the box first.'); return; }
    const r = quickParse(paste);
    const sc = r.scale || {};
    up({
      title: r.title || f.title, yield: r.yield || '', time: r.time || '', blurb: r.blurb || '',
      ingredients: ingToText(r.ingredients), steps: (r.steps || []).join('\n'), tips: (r.tips || []).join('\n'),
      ...(sc.kind ? { sk: sc.kind, sb: sc.base || '', su: sc.unit || 'servings' } : {}),
    });
    setStatus('filled in what I could ✓ — double-check the fields below before saving.');
  };

  const submit = e => {
    e.preventDefault();
    const lines = t => String(t || '').split('\n').map(s => s.trim()).filter(Boolean);
    const artDefault = { bowls: 'udon', bakes: 'madeleine', sips: 'tea', syrups: 'syrup', bits: 'plate' }[f.cat] || 'plate';
    const scale = f.sk === 'pan' ? { kind: 'pan', w: +f.pw || 9, l: +f.pl || 9 } : { kind: f.sk, base: +f.sb || 1, unit: f.su || 'servings' };
    const old = recipe && recipe.scale;
    if (old && old.kind === scale.kind && scale.kind !== 'pan' && old.base === scale.base) { if (old.lo) scale.lo = old.lo; if (old.hi) scale.hi = old.hi; }
    const rec = {
      ...(recipe || {}),
      title: f.title.trim() || 'Untitled recipe', cat: f.cat, art: f.art || artDefault, signature: f.signature, also: f.also.filter(k => k !== f.cat),
      time: f.time.trim(), yield: f.yield.trim(), level: f.level.trim(), blurb: f.blurb.trim(), scale,
      ingredients: readIng(f.ingredients), ingNote: f.ingNote.trim(), steps: lines(f.steps), tips: lines(f.tips), notes: f.notes.trim(),
    };
    const vs = f.variants.map(({ _ing, _steps, ...v }, i) => ({ ...v, name: v.name || 'variation ' + (i + 1), ingredients: readIng(_ing), steps: lines(_steps) }))
      .filter(v => v.name || v.ingredients.length);
    if (vs.length) rec.variants = vs; else delete rec.variants;
    onSave(rec);
  };

  return (
    <div className="wrap">
      <button className="back" onClick={onCancel}><Html html={icon('back')} /> {isNew ? 'back to the box' : 'back to recipe'}</button>
      <form className="form" onSubmit={submit}>
        <h1 className="wonk">{isNew ? 'A new recipe' : 'Edit recipe'}</h1>
        {isNew && <div className="paste">
          <h2><Html html={icon('sprout')} /> Paste a recipe</h2>
          <p>Paste a recipe from a website, a chat or your notes, and the form below fills in what it can.</p>
          <textarea value={paste} onChange={e => setPaste(e.target.value)} placeholder="paste your recipe here…" />
          <div className="paste-row"><button type="button" className="btn olive" onClick={autofill}><Html html={icon('heart', '#F0EACF')} /> fill it in for me</button><span id="paste-status" className="mono">{status}</span></div>
        </div>}
        <p className="lead">use **double stars** around words to make them bold.</p>
        <div className="field"><label htmlFor="f-title">title</label><input id="f-title" required {...bind('title')} /></div>
        <label className="field" style={{ flexDirection: 'row', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <input type="checkbox" checked={f.signature} onChange={e => up({ signature: e.target.checked })} style={{ width: 18, height: 18, accentColor: '#7C7B50' }} />
          <span className="mono" style={{ fontSize: '.85rem', color: '#543F2B' }}>a signature recipe (shows in the Signature tab)</span>
        </label>
        <div className="frow">
          <div className="field"><label>tab</label><select {...bind('cat')}>{Object.keys(CATS).map(k => <option key={k} value={k}>{CATS[k].label}</option>)}</select></div>
          <div className="field"><label>little drawing</label><select {...bind('art')}><option value="">match the tab</option>{ARTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
          <div className="field"><label>level</label><input {...bind('level')} /></div>
        </div>
        <div className="field"><label>also show in</label><div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {Object.keys(CATS).map(k => <label key={k} style={{ display: 'inline-flex', gap: 6, alignItems: 'center', cursor: 'pointer', fontSize: '.92rem' }}>
            <input type="checkbox" checked={f.also.includes(k)} onChange={e => up({ also: e.target.checked ? [...f.also, k] : f.also.filter(x => x !== k) })} style={{ width: 16, height: 16, accentColor: '#7C7B50' }} />{CATS[k].label}</label>)}
        </div></div>
        <div className="frow">
          <div className="field"><label>time</label><input placeholder="25 minutes" {...bind('time')} /></div>
          <div className="field"><label>makes</label><input placeholder="2 servings" {...bind('yield')} /></div><div />
        </div>
        <div className="field"><label>short description</label><input {...bind('blurb')} /></div>
        <h2 className="fh">How it scales</h2>
        <div className="frow">
          <div className="field"><label>scale by</label><select {...bind('sk')}><option value="count">a number of things (servings, cookies…)</option><option value="volume">total volume (mL)</option><option value="pan">pan size</option></select></div>
          <div className="field"><label>base amount</label><small>how many / how many mL the recipe makes</small><input type="number" step="any" {...bind('sb')} /></div>
          <div className="field"><label>counted in</label><small>plural, e.g. servings, cookies</small><input {...bind('su')} /></div>
        </div>
        <div className="frow">
          <div className="field"><label>pan width (in)</label><small>for “pan size” only</small><input type="number" step="0.5" {...bind('pw')} /></div>
          <div className="field"><label>pan length (in)</label><small>&nbsp;</small><input type="number" step="0.5" {...bind('pl')} /></div><div />
        </div>
        <h2 className="fh">Ingredients &amp; method</h2>
        <div className="field"><label>ingredients</label><small>one per line — amount | ingredient (e.g. 100 g | white sugar). start a line with “## ” for a little group heading.</small><textarea {...bind('ingredients')} /></div>
        <div className="field"><label>ingredient note</label><input {...bind('ingNote')} /></div>
        <div className="field"><label>method</label><small>one line per step. “# ” groups the lines below it under a step heading, “## ” starts a new section, “&gt; ” adds a side note, and “- ” tucks a point under the line above it.</small><textarea style={{ minHeight: 220 }} {...bind('steps')} /></div>
        <h2 className="fh">Flavours / variations</h2>
        <p className="lead" style={{ marginBottom: 12 }}>optional — each one gets its own tab on the recipe with its own ingredient list.</p>
        {f.variants.map((v, i) => <div className="vblock" key={i}>
          <div className="vh"><span>variation {i + 1}</span><button type="button" className="linkbtn" onClick={() => up({ variants: f.variants.filter((_, j) => j !== i) })}>remove</button></div>
          <div className="frow">
            <div className="field"><label>name</label><input value={v.name || ''} placeholder="e.g. matcha" onChange={e => upVar(i, { name: e.target.value })} /></div>
            <div className="field"><label>dot colour</label><input type="color" value={v.dot || '#D3CCAB'} onChange={e => upVar(i, { dot: e.target.value })} style={{ height: 42, padding: 4 }} /></div>
            <div className="field"><label>makes (optional)</label><input value={v.yield || ''} onChange={e => upVar(i, { yield: e.target.value || undefined })} /></div>
          </div>
          <div className="field"><label>ingredients</label><textarea value={v._ing} onChange={e => upVar(i, { _ing: e.target.value })} /></div>
          <div className="field"><label>ingredient note</label><input value={v.ingNote || ''} onChange={e => upVar(i, { ingNote: e.target.value })} /></div>
          <div className="field"><label>its own method (optional)</label><small>leave empty to use the main method</small><textarea value={v._steps} onChange={e => upVar(i, { _steps: e.target.value })} /></div>
        </div>)}
        <button type="button" className="btn ghost" style={{ marginBottom: 18 }} onClick={() => up({ variants: [...f.variants, { name: '', _ing: '', _steps: '', ingNote: '' }] })}><Html html={icon('plus')} /> add a variation</button>
        <div className="field"><label>tips</label><small>one per line</small><textarea {...bind('tips')} /></div>
        <div className="field"><label>notes to self</label><textarea {...bind('notes')} /></div>
        <div className="actions"><button type="button" className="btn ghost" onClick={onCancel}>cancel</button><button type="submit" className="btn"><Html html={icon('heart', '#F0EACF')} /> save recipe</button></div>
      </form>
    </div>
  );
}
