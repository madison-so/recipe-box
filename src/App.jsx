import React, { useEffect, useMemo, useRef, useState } from 'react';
import Html from './components/Html.jsx';
import RecipeView from './components/RecipeView.jsx';
import RecipeForm from './components/RecipeForm.jsx';
import { art, icon, logo, loopy, loopyRaw, cutoutFlowers, DEFS } from './lib/art.js';
import { CATS, SORTS, sortList, slug } from './lib/text.js';
import { load, save, resetToSeed, pref, downloadBlob } from './lib/storage.js';

const readHash = () => decodeURIComponent((window.location.hash || '').slice(1));
const pl = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

function Card({ r, onOpen }) {
  const y = r.yield || (r.variants && r.variants.length ? `${r.variants.length} ${r.variantLabel ? r.variantLabel + 's' : (r.variants.every(v => !v.steps || !v.steps.length) ? 'flavours' : 'parts')}` : '');
  return (
    <button className="card" onClick={() => onOpen(r.id)}>
      <div className={'art-wrap bg-' + r.cat}><Html as="div" className="artbox" html={art(r.art)} />{r.signature && <span className="sig"><Html html={icon('heart', '#F0EACF')} /> signature</span>}</div>
      <div className="body"><h3>{r.title}</h3><p>{r.blurb}</p>
        <div className="chips">{[r.time, y].filter(Boolean).map(c => <span className="chip" key={c}>{c}</span>)}</div></div>
    </button>
  );
}

export default function App() {
  const [recipes, setRecipes] = useState(load);
  const [tab, setTab] = useState('all');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState(() => pref.get('little-recipe-box-sort', 'default'));
  const [route, setRoute] = useState(() => ({ mode: 'list', id: null }));
  const [confirm, setConfirm] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  const tabsRef = useRef(null);
  const fileRef = useRef(null);
  const lastSurprise = useRef(null);

  const toast = msg => { setToastMsg(msg); clearTimeout(toast.t); toast.t = setTimeout(() => setToastMsg(''), 2600); };
  const commit = next => { setRecipes(next); save(next); };

  // hash routing: #recipe-id opens a recipe, #tab-bakes opens a tab
  useEffect(() => {
    const sync = () => {
      const h = readHash();
      if (h && recipes.some(r => r.id === h)) setRoute({ mode: 'recipe', id: h });
      else if (h.startsWith('tab-')) { setTab(h.slice(4)); setRoute({ mode: 'list', id: null }); }
      else setRoute(rt => rt.mode === 'form' ? rt : { mode: 'list', id: null });
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [recipes]);

  const openRecipe = id => { window.location.hash = id; setRoute({ mode: 'recipe', id }); window.scrollTo({ top: 0 }); };
  const goHome = () => { history.replaceState(null, '', window.location.pathname + window.location.search); setRoute({ mode: 'list', id: null }); setQ(''); window.scrollTo({ top: 0 }); };
  const pickTab = k => {
    setTab(k); setRoute({ mode: 'list', id: null });
    history.replaceState(null, '', k === 'all' ? window.location.pathname : '#tab-' + k);
    requestAnimationFrame(() => { const t = tabsRef.current; if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 14, behavior: 'smooth' }); });
  };

  const count = c => recipes.filter(r => r.cat === c || (r.also || []).includes(c)).length;
  const shown = useMemo(() => sortList(recipes.filter(r => {
    if (tab === 'signature') { if (!r.signature) return false; }
    else if (tab !== 'all' && r.cat !== tab && !(r.also || []).includes(tab)) return false;
    if (!q.trim()) return true;
    const ing = [r.ingredients || []].concat((r.variants || []).map(v => v.ingredients || [])).flat().map(x => x.join(' ')).join(' ');
    return [r.title, r.blurb, ing, (r.variants || []).map(v => v.name).join(' ')].join(' ').toLowerCase().includes(q.toLowerCase());
  }), sort), [recipes, tab, q, sort]);
  const newest = useMemo(() => recipes.slice().sort((a, b) => String(b.added || '').localeCompare(String(a.added || '')))[0], [recipes]);

  const saveRecipe = rec => {
    const exists = rec.id && recipes.some(r => r.id === rec.id);
    let next;
    if (exists) next = recipes.map(r => r.id === rec.id ? rec : r);
    else {
      let id = slug(rec.title), n = 2; while (recipes.some(r => r.id === id)) id = slug(rec.title) + '-' + (n++);
      rec = { ...rec, id, added: new Date().toISOString() };
      next = [...recipes, rec];
    }
    commit(next); toast('saved ✓'); openRecipe(rec.id);
  };
  const doDelete = id => { commit(recipes.filter(r => r.id !== id)); setConfirm(null); goHome(); toast('removed'); };
  const surprise = () => { if (!recipes.length) return; let p; do { p = recipes[Math.floor(Math.random() * recipes.length)]; } while (recipes.length > 1 && p.id === lastSurprise.current); lastSurprise.current = p.id; openRecipe(p.id); };

  const exportJson = () => downloadBlob(new Blob([JSON.stringify(recipes, null, 1)], { type: 'application/json' }), 'recipes.json');
  const importJson = async file => {
    try { const d = JSON.parse(await file.text()); const list = Array.isArray(d) ? d : d.recipes; if (!Array.isArray(list)) throw 0; commit(list); toast(`imported ${pl(list.length, 'recipe')} ✓`); }
    catch (e) { toast('that file doesn’t look like a recipe export'); }
  };

  const current = route.id && recipes.find(r => r.id === route.id);
  const tabs = [['all', 'All recipes', 'flower', recipes.length], ['signature', 'Signature', 'heart', recipes.filter(r => r.signature).length]]
    .concat(Object.keys(CATS).filter(k => k !== 'bits' || count('bits')).map(k => [k, CATS[k].label, CATS[k].icon, count(k)]));

  return (
    <>
      <Html html={DEFS} />
      <header className="top"><div className="wrap">
        <button className="brand" onClick={goHome} aria-label="Home"><Html html={logo()} />
          <div className="wordmark">madison's little recipe box<span className="sub">warm bowls · soft bakes · slow sips</span></div></button>
        <div className="spacer" />
        <label className="search"><Html html={icon('search')} /><input type="search" placeholder="search recipes or ingredients" value={q}
          onChange={e => { setQ(e.target.value); if (route.mode !== 'list') { setRoute({ mode: 'list', id: null }); history.replaceState(null, '', window.location.pathname); } }} /></label>
        <button className="btn olive" onClick={() => { setRoute({ mode: 'form', id: null }); window.scrollTo({ top: 0 }); }}><Html html={icon('plus', '#F0EACF')} /> new recipe</button>
      </div></header>

      {route.mode === 'form' ? (
        <RecipeForm key={route.id || 'new'} recipe={route.id ? recipes.find(r => r.id === route.id) : null} defaultCat={tab in CATS ? tab : 'bowls'}
          onSave={saveRecipe} onCancel={() => route.id ? openRecipe(route.id) : goHome()} />
      ) : route.mode === 'recipe' && current ? (
        <RecipeView key={current.id} recipe={current} toast={toast} onBack={goHome}
          onEdit={() => { setRoute({ mode: 'form', id: current.id }); window.scrollTo({ top: 0 }); }}
          onDelete={() => setConfirm(current)} />
      ) : (
        <div className="wrap">
          <section className="hero">
            <div className="panel p-main"><Html html={cutoutFlowers()} /><h1 className="wonk">what are we <em>making</em> today?</h1><p>A quiet little place for the recipes I keep coming back to.</p></div>
            {newest ? <button className="panel p-a hero-btn" onClick={() => openRecipe(newest.id)}><span className="lbl">freshly added ✦</span><span className="hero-t">{newest.title}</span><span className="hero-go mono">open recipe →</span><Html as="div" className="hero-art" html={art(newest.art)} /></button>
              : <div className="panel p-a"><span className="lbl">freshly added ✦</span><span className="hero-t">nothing yet</span></div>}
            <button className="panel p-b hero-btn" onClick={surprise}><span className="lbl">can't decide?</span><span className="hero-t">surprise me</span><span className="hero-go mono">pick a random recipe →</span><Html html={loopy('#5A3A2A', '#F0EACF', 92)} /></button>
          </section>
          <nav className="tabs" role="tablist" ref={tabsRef}>{tabs.map(([k, l, ic, n]) =>
            <button key={k} className={'tab' + (tab === k ? ' on' : '')} role="tab" aria-selected={tab === k} onClick={() => pickTab(k)}><Html html={icon(ic)} />{l} <span className="n">{n}</span></button>)}
          </nav>
          <div className="section-title"><h2>{tab === 'all' ? 'Everything in the box' : tab === 'signature' ? 'Signature recipes' : (CATS[tab] || {}).label}</h2>
            <div className="sortbar"><span>{q ? `matching “${q}”` : ''}</span><label className="sort">sort<select value={sort} aria-label="sort recipes" onChange={e => { setSort(e.target.value); pref.set('little-recipe-box-sort', e.target.value); }}>
              {Object.keys(SORTS).map(k => <option key={k} value={k}>{SORTS[k]}</option>)}</select></label></div></div>
          <div className="grid">
            {shown.length ? shown.map(r => <Card key={r.id} r={r} onOpen={openRecipe} />) : <div className="empty">nothing here yet{q ? ' for that search' : ''}.</div>}
            {!q && <button className="card add" onClick={() => setRoute({ mode: 'form', id: null })}><Html html={icon('sprout', '#7C7B50')} /><span>add a new recipe</span></button>}
          </div>
        </div>
      )}

      <footer><div className="wrap">
        <Html html={`<svg viewBox="0 0 280 60" aria-hidden="true"><g filter="url(#wob)">${[30, 100, 170, 240].map((x, i) => `<g transform="translate(${x} 30) scale(.55)">${i % 2 ? loopyRaw('#5A3A2A', '#A1AFB8') : loopyRaw('#A1AFB8', '#5A3A2A')}</g>`).join('')}</g></svg>`} />
        <div className="foot-actions">
          <button className="linkbtn" onClick={exportJson}>export recipes</button>
          <button className="linkbtn" onClick={() => fileRef.current && fileRef.current.click()}>import recipes</button>
          <button className="linkbtn" onClick={() => setConfirm({ reset: true })}>reset to original</button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={e => { const file = e.target.files[0]; if (file) importJson(file); e.target.value = ''; }} />
        </div>
        <p>made with butter, patience &amp; slow afternoons.</p>
      </div></footer>

      {confirm && <div className="modal" onClick={e => { if (e.target === e.currentTarget) setConfirm(null); }}>
        <div className="m"><Html html={loopy('#A1AFB8', '#5A3A2A', 80)} />
          {confirm.reset ? <><h3>reset the recipe box?</h3><p>Recipes you've added or changed in this browser will be replaced with the original set.</p>
            <div className="row"><button className="btn ghost" onClick={() => setConfirm(null)}>keep mine</button><button className="btn" onClick={() => { setRecipes(resetToSeed()); setConfirm(null); goHome(); }}>reset</button></div></>
          : <><h3>remove this recipe?</h3><p>“{confirm.title}” will be taken out of the box for good.</p>
            <div className="row"><button className="btn ghost" onClick={() => setConfirm(null)}>keep it</button><button className="btn" onClick={() => doDelete(confirm.id)}>remove</button></div></>}
        </div></div>}
      {toastMsg && <div className="toast">{toastMsg}</div>}
    </>
  );
}
