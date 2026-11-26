import { esc } from './text.js';
// Hand-drawn style SVG icons and illustrations (returned as SVG strings).
export const INK = '#352E2A';
export function icon(name, color){
  const c = color || INK;
  const g = `fill="none" stroke="${c}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"`;
  const m = {
    bowl:`<path d="M3 12h18c-.5 4.6-4.3 8-9 8s-8.5-3.4-9-8z"/><path d="M14 3l-4 8M18 4l-5 7"/><path d="M6 9c1-1 2 0 3-1"/>`,
    whisk:`<path d="M12 22v-7"/><path d="M12 15c-4-1-5-6-4-9 1-3 7-3 8 0 1 3 0 8-4 9z"/><path d="M12 15c-1.5-2-1.5-7 0-11M12 15c1.5-2 1.5-7 0-11"/>`,
    cup:`<path d="M6 8h11l-1.3 12.2a1 1 0 0 1-1 .8H8.3a1 1 0 0 1-1-.8z"/><path d="M14 8l3-6h2"/><path d="M7 12c2 1 7 1 9.6 0"/>`,
    bottle:`<path d="M10 2.5h4v3.5l2.2 3V20a1 1 0 0 1-1 1H8.8a1 1 0 0 1-1-1V9L10 6z"/><path d="M7.8 13.5h8.4"/>`,
    leaf:`<path d="M5 19C5 10 11 5 20 4c0 9-5 15-15 15z"/><path d="M5 19L14 10"/>`,
    flower:`<circle cx="12" cy="12" r="2.2"/><path d="M12 9.8C10 6 11 3 12 3s2 3 0 6.8M14.1 11.3c3.3-2.6 6.4-1.8 6.6-.9.3 1-2.6 2.6-6.6 2M13.4 14c1.5 3.9.3 6.8-.7 6.9-1 .1-1.7-3.2-.7-7M10.6 14c-1.5 3.9-.3 6.8.7 6.9M9.9 11.3C6.6 8.7 3.5 9.5 3.3 10.4c-.3 1 2.6 2.6 6.6 2"/>`,
    search:`<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>`,
    plus:`<path d="M12 5v14M5 12h14"/>`,
    back:`<path d="M15 5l-7 7 7 7"/>`,
    sprout:`<path d="M12 21v-9"/><path d="M12 12c0-4-3-6-7-6 0 4 3 6 7 6zM12 14c0-4 3-6 7-6 0 4-3 6-7 6z"/>`,
    list:`<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>`,
    pot:`<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M2 11h2M20 11h2M6 8h12"/><path d="M12 8V5"/><path d="M12 5c0-2-2-3-4-3 0 2 2 3 4 3z"/>`,
    pencil:`<path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/>`,
    trash:`<path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13"/>`,
    heart:`<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>`,
    scale:`<path d="M12 4v16M6 20h12"/><path d="M4 8h16"/><path d="M6 8l-3 6c0 1.5 1.3 2.5 3 2.5S9 15.5 9 14zM18 8l-3 6c0 1.5 1.3 2.5 3 2.5s3-1 3-2.5z"/>`
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><g ${g}>${m[name]||m.flower}</g></svg>`;
}
export function logo(){
  return `<svg viewBox="0 0 80 80" aria-hidden="true"><g filter="url(#wob)" stroke="${INK}" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M38 30c0-9-6-14-14-14 0 8 6 13 14 14z" fill="#7C7B50"/><path d="M42 26c0-8 5-12 12-12 0 7-5 11-12 12z" fill="#93ADA8"/><path d="M40 38V24"/>
  <path d="M18 40h44v16c0 7-6 12-13 12H31c-7 0-13-5-13-12z" fill="#F0EACF"/><path d="M14 42h4M62 42h4"/><path d="M22 38c4-3 32-3 36 0" />
  <path d="M26 54c3 2 5-2 8 0s5-2 8 0 5-2 8 0 4-1 4-1" stroke="#A1AFB8"/></g></svg>`;
}
export function daisy(cx, cy, r, n, rot, fill){
  let p = '';
  for (let i=0;i<n;i++){ const a = rot + i*360/n; p += `<ellipse cx="${cx}" cy="${cy - r*0.62}" rx="${r*0.26}" ry="${r*0.5}" transform="rotate(${a} ${cx} ${cy})"/>`; }
  return `<g fill="${fill}">${p}<circle cx="${cx}" cy="${cy}" r="${r*0.22}" fill="${fill}"/></g><circle cx="${cx}" cy="${cy}" r="${r*0.09}" fill="rgba(53,46,42,.25)"/>`;
}
export function cutoutFlowers(fill){
  const f = fill || '#DDE4F3';
  return `<svg class="flowers" viewBox="0 0 320 340" aria-hidden="true"><g filter="url(#wobBig)">
   <g stroke="${f}" stroke-width="9" fill="none" stroke-linecap="round"><path d="M150 120 C140 200 160 260 150 340"/><path d="M240 80 C250 170 220 250 215 340"/><path d="M80 190 C95 250 110 290 120 340"/><path d="M150 250 C120 240 105 225 100 205"/><path d="M222 230 C250 220 268 200 272 180"/></g>
   <path d="M100 205c-18-6-24-24-14-30 12 4 16 18 14 30z" fill="${f}"/><path d="M272 180c4-18 22-26 30-18-4 12-18 20-30 18z" fill="${f}"/><path d="M160 290c-20 0-34-14-30-24 14-2 26 10 30 24z" fill="${f}"/>
   ${daisy(150,110,62,9,8,f)}${daisy(240,72,48,7,20,f)}${daisy(80,186,38,8,0,f)}
   <circle cx="285" cy="150" r="10" fill="${f}"/><circle cx="60" cy="120" r="8" fill="${f}"/></g></svg>`;
}
export function loopyRaw(fill, stroke){
  const petal = 'M0 0 C -16 -10, -16 -38, 0 -42 C 16 -38, 16 -10, 0 0 Z';
  let a='', b='';
  for (let i=0;i<5;i++){ a += `<path d="${petal}" transform="rotate(${i*72+18})"/>`; b += `<path d="${petal}" transform="rotate(${i*72-8})"/>`; }
  return `<g fill="${fill}">${a}</g><g fill="none" stroke="${stroke}" stroke-width="3.2" stroke-linejoin="round">${b}</g>`;
}
export function loopy(fill, stroke, size){
  const s = size || 100;
  return `<svg class="loopy" viewBox="-50 -50 100 100" width="${s}" height="${s}" aria-hidden="true"><g filter="url(#wob)">${loopyRaw(fill,stroke)}</g></svg>`;
}
export function art(name){
  const S = `stroke="${INK}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"`;
  let inner = '';
  if (name === 'udon') inner = `
    <g fill="none" ${S} opacity=".7"><path d="M92 44q-7-8 0-16t0-16"/><path d="M112 40q-7-8 0-16t0-16"/><path d="M132 44q-7-8 0-16t0-16"/></g>
    <path d="M36 82 Q38 138 110 142 Q182 138 184 82 Z" fill="#F0EACF" ${S}/>
    <path d="M52 106 q9 7 18 0 t18 0 t18 0 t18 0 t18 0 t18 0 t14 0" fill="none" stroke="#7C7B50" stroke-width="2" stroke-linecap="round"/>
    <path d="M88 142 l3 9 h38 l3 -9" fill="#D3CCAB" ${S}/>
    <ellipse cx="110" cy="82" rx="74" ry="14" fill="#E6CDB0" ${S}/>
    <g fill="none" stroke="#F4EFDF" stroke-width="3.2" stroke-linecap="round"><path d="M52 82q8-9 16 0t16 0t16 0"/><path d="M60 88q8-8 16 0t16 0t16 0t16 0"/><path d="M112 76q8-7 16 0t16 0"/></g>
    <path d="M100 86c-6-14 8-20 18-14-2 10-8 14-18 14z" fill="#7C7B50" ${S}/>
    <circle cx="78" cy="78" r="7" fill="#B8664B" ${S}/><circle cx="92" cy="73" r="6" fill="#B8664B" ${S}/>
    <ellipse cx="140" cy="79" rx="17" ry="10" fill="#FBF6E7" ${S}/><circle cx="140" cy="79" r="6.5" fill="#D9A640" ${S}/>
    <circle cx="120" cy="86" r="6" fill="#FBF6E7" ${S}/>
    <g ${S} fill="none" stroke="#543F2B" stroke-width="3.4"><path d="M176 22 L124 84"/><path d="M188 28 L132 88"/></g>`;
  else if (name === 'rice') inner = `
    <g ${S} fill="#7C7B50"><path d="M46 70c-14-10-22-26-18-44 10 10 16 24 18 44z"/><path d="M52 66c-4-18 0-36 14-46 2 16-4 32-14 46z" fill="#93ADA8"/><path d="M40 76c-16-2-28-12-32-26 14 2 26 12 32 26z" fill="#7A774A"/></g>
    <path d="M40 80 Q44 136 112 138 Q180 136 186 80 Z" fill="#E0B94E" ${S}/>
    <g stroke="#B08A2E" stroke-width="1.6" fill="none" opacity=".8"><path d="M60 92l18 20M84 92l18 24M108 92l18 24M132 92l18 22M156 92l14 16M70 116l14-22M96 120l18-26M122 122l18-28M148 118l16-22"/></g>
    <path d="M40 80 Q112 92 186 80" fill="none" ${S}/>
    <path d="M48 80 C54 56 84 44 112 46 C142 44 172 56 178 80 Q112 92 48 80 Z" fill="#EBCB6E" ${S}/>
    <g fill="#F7EDCB"><circle cx="78" cy="66" r="2"/><circle cx="96" cy="58" r="2"/><circle cx="128" cy="60" r="2"/><circle cx="150" cy="68" r="2"/><circle cx="110" cy="74" r="2"/><circle cx="66" cy="76" r="2"/></g>
    <g ${S} stroke-width="2"><path d="M86 62c6-10 20-8 22 2-6-2-10 2-12 6" fill="#E39A7A"/><path d="M130 72c6-10 20-8 22 2-6-2-10 2-12 6" fill="#E39A7A"/></g>
    <g ${S} stroke-width="1.8"><rect x="112" y="54" width="9" height="9" rx="2" fill="#C2553F"/><rect x="70" y="70" width="8" height="8" rx="2" fill="#C2553F" transform="rotate(14 74 74)"/><rect x="150" y="58" width="9" height="9" rx="2" fill="#F2DC8C"/></g>
    <g fill="#8C9A4E" ${S} stroke-width="1.6"><circle cx="102" cy="68" r="4"/><circle cx="140" cy="56" r="4"/><circle cx="160" cy="74" r="3.6"/></g>
    <g fill="#F3E3C1" ${S} stroke-width="1.6"><path d="M118 40c4-4 10-2 10 4-3-1-6 0-7 3-2-1-3-4-3-7z"/><path d="M160 46c4-4 10-2 10 4-3-1-6 0-7 3-2-1-3-4-3-7z"/></g>
    <g fill="#483F29"><circle cx="122" cy="80" r="2.2"/><circle cx="96" cy="78" r="2"/></g>`;
  else if (name === 'madeleine') inner = `
    <g transform="translate(104 88)">
      <circle cx="-33" cy="-34" r="15" fill="#D9AE68" ${S}/><circle cx="33" cy="-34" r="15" fill="#D9AE68" ${S}/>
      <circle cx="-33" cy="-34" r="7" fill="#F0D7A2"/><circle cx="33" cy="-34" r="7" fill="#F0D7A2"/>
      <circle cx="0" cy="2" r="46" fill="#D9AE68" ${S}/>
      <circle cx="0" cy="4" r="38" fill="#EBCB8E"/>
      <path d="M-30 -14 q8 -12 22 -16" fill="none" stroke="#F5E2B8" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="0" cy="17" rx="15" ry="11" fill="#F6E6C2" ${S} stroke-width="2"/>
      <circle cx="-15" cy="2" r="3.6" fill="${INK}"/><circle cx="15" cy="2" r="3.6" fill="${INK}"/>
      <circle cx="-14" cy="0.8" r="1.1" fill="#FFFFFF"/><circle cx="16" cy="0.8" r="1.1" fill="#FFFFFF"/>
      <path d="M-4 12 Q0 9.5 4 12 Q3 16 0 16.5 Q-3 16 -4 12 Z" fill="${INK}"/>
      <path d="M0 16.5 V19 M-5 20 q5 4 5 -1 q0 5 5 1" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>
      <ellipse cx="-27" cy="15" rx="6" ry="4" fill="#E39A80" opacity=".55"/><ellipse cx="27" cy="15" rx="6" ry="4" fill="#E39A80" opacity=".55"/>
    </g>
    <g transform="translate(182 122)"><circle r="18" fill="#EFE29A" ${S}/><circle r="12" fill="#F7EFC4" stroke="#C9B44E" stroke-width="1.5"/><g stroke="#C9B44E" stroke-width="1.5"><path d="M0 -12V12M-12 0H12M-8.5 -8.5L8.5 8.5M8.5 -8.5L-8.5 8.5"/></g></g>
    <g fill="#F4EFDF" stroke="${INK}" stroke-width="1"><circle cx="40" cy="128" r="2.4"/><circle cx="50" cy="138" r="1.8"/><circle cx="30" cy="140" r="2"/><circle cx="160" cy="40" r="2"/><circle cx="172" cy="52" r="1.6"/></g>`;
  else if (name === 'shortbread') inner = `
    <g ${S}>
      <circle cx="74" cy="94" r="34" fill="#EAD9A8"/><circle cx="74" cy="94" r="26" fill="none" stroke="#C9A66B" stroke-width="1.6" stroke-dasharray="4 5"/>
      <circle cx="146" cy="94" r="34" fill="#6B4A35"/><circle cx="146" cy="94" r="26" fill="none" stroke="#8E6A50" stroke-width="1.6" stroke-dasharray="4 5"/>
      <circle cx="110" cy="62" r="34" fill="#A9B173"/><circle cx="110" cy="62" r="26" fill="none" stroke="#7C7B50" stroke-width="1.6" stroke-dasharray="4 5"/>
    </g>
    <g fill="${INK}" opacity=".55"><circle cx="102" cy="56" r="1.8"/><circle cx="118" cy="56" r="1.8"/><circle cx="110" cy="68" r="1.8"/><circle cx="66" cy="98" r="1.8"/><circle cx="82" cy="98" r="1.8"/><circle cx="74" cy="108" r="1.8"/></g>
    <g fill="#EAD9A8" opacity=".8"><circle cx="138" cy="98" r="1.8"/><circle cx="154" cy="98" r="1.8"/><circle cx="146" cy="108" r="1.8"/></g>
    <g transform="translate(190 40)" fill="none" ${S} stroke-width="2">${'<path d="M0 0 C -8 -5, -8 -18, 0 -20 C 8 -18, 8 -5, 0 0 Z" transform="rotate(0)"/>'.repeat(1)}<path d="M0 0 C -8 -5, -8 -18, 0 -20 C 8 -18, 8 -5, 0 0 Z" transform="rotate(72)"/><path d="M0 0 C -8 -5, -8 -18, 0 -20 C 8 -18, 8 -5, 0 0 Z" transform="rotate(144)"/><path d="M0 0 C -8 -5, -8 -18, 0 -20 C 8 -18, 8 -5, 0 0 Z" transform="rotate(216)"/><path d="M0 0 C -8 -5, -8 -18, 0 -20 C 8 -18, 8 -5, 0 0 Z" transform="rotate(288)"/></g>
    <g fill="#F4EFDF" stroke="${INK}" stroke-width="1"><circle cx="34" cy="138" r="2.2"/><circle cx="44" cy="146" r="1.6"/><circle cx="186" cy="138" r="2"/></g>`;
  else if (name === 'tart') inner = `
    ${[[68,92,1],[150,98,1.06]].map(([x,y,s]) => `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-40 -8 L-30 30 Q0 38 30 30 L40 -8 Z" fill="#E2B877" ${S}/>
      <path d="M-40 -8 q5 -9 10 0 q5 -9 10 0 q5 -9 10 0 q5 -9 10 0 q5 -9 10 0 q5 -9 10 0 q5 -9 10 0 q5 -9 10 0" fill="#E9C68A" ${S}/>
      <g stroke="#B88B4A" stroke-width="1.5"><path d="M-30 4 L-24 28M-15 4 L-12 32M0 4 V34M15 4 L12 32M30 4 L24 28"/></g>
      <ellipse cx="0" cy="-6" rx="34" ry="9" fill="#F2C94C" ${S}/>
      <g fill="#A66A2C" opacity=".55"><circle cx="-10" cy="-7" r="3"/><circle cx="8" cy="-5" r="2.2"/><circle cx="16" cy="-8" r="1.6"/></g>
    </g>`).join('')}
    <g fill="#F4EFDF" stroke="${INK}" stroke-width="1"><circle cx="110" cy="36" r="2.4"/><circle cx="122" cy="28" r="1.8"/><circle cx="184" cy="44" r="2"/></g>
    <g fill="none" ${S} opacity=".6"><path d="M60 52q-6-8 0-14t0-14"/><path d="M150 56q-6-8 0-14t0-14"/></g>`;
  else if (name === 'brownie') inner = `
    <path d="M44 74 L100 52 L156 74 L100 96 Z" fill="#A9B173" ${S}/><path d="M44 74 L100 96 L100 128 L44 106 Z" fill="#8C9460" ${S}/><path d="M100 96 L156 74 L156 106 L100 128 Z" fill="#7C7B50" ${S}/>
    <g fill="#62703A" opacity=".7"><circle cx="80" cy="70" r="1.6"/><circle cx="96" cy="64" r="1.4"/><circle cx="112" cy="72" r="1.8"/><circle cx="126" cy="78" r="1.4"/><circle cx="92" cy="82" r="1.5"/><circle cx="106" cy="60" r="1.3"/><circle cx="70" cy="76" r="1.3"/><circle cx="138" cy="72" r="1.5"/></g>
    <path d="M60 92 q4 4 0 8M76 98 q4 4 0 8M126 102 q-4 4 0 8M142 96 q-4 4 0 8" fill="none" stroke="#5C6332" stroke-width="1.6" stroke-linecap="round"/>
    <g transform="translate(186 80) scale(0.8)"><path d="M-7 20 C-24 12 -25 -10 -12 -23 Q0 -27 12 -23 C25 -10 24 12 7 20 Z" fill="#EEDFB4"/><ellipse cx="0" cy="-22" rx="11" ry="3.6" fill="#B79A5E"/><g fill="none" stroke="#A88650" stroke-width="1.1" stroke-linecap="round"><path d="M-1.8 20 C-3.2 6 -3.6 -8 -2.8 -19"/><path d="M-0.9 20 C-1.6 6 -1.8 -8 -1.4 -19"/><path d="M0.0 20 C0.0 6 0.0 -8 0.0 -19"/><path d="M0.9 20 C1.6 6 1.8 -8 1.4 -19"/><path d="M1.8 20 C3.2 6 3.6 -8 2.8 -19"/></g><g fill="none" stroke="#8C6F3E" stroke-width="1.3" stroke-linecap="round"><path d="M-6.4 20 C-22.4 12 -23.2 -10 -12.0 -22 q1.6 -2 3.6 1"/><path d="M-4.8 20 C-16.8 12 -17.4 -10 -9.0 -22 q1.2 -2 2.7 1"/><path d="M-3.2 20 C-11.2 12 -11.6 -10 -6.0 -22 q0.8 -2 1.8 1"/><path d="M-1.6 20 C-5.6 12 -5.8 -10 -3.0 -22 q0.4 -2 0.9 1"/><path d="M1.6 20 C5.6 12 5.8 -10 3.0 -22 q-0.4 -2 -0.9 1"/><path d="M3.2 20 C11.2 12 11.6 -10 6.0 -22 q-0.8 -2 -1.8 1"/><path d="M4.8 20 C16.8 12 17.4 -10 9.0 -22 q-1.2 -2 -2.7 1"/><path d="M6.4 20 C22.4 12 23.2 -10 12.0 -22 q-1.6 -2 -3.6 1"/></g><path d="M-7 20 C-24 12 -25 -10 -12 -23 M7 20 C24 12 25 -10 12 -23" fill="none" ${S}/><path d="M-12 -23 Q0 -28 12 -23" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/><rect x="-8" y="20" width="16" height="30" rx="3.5" fill="#D9C38F" ${S}/><path d="M-8 33 h16" stroke="#A88A50" stroke-width="1.8"/><path d="M-3 24 v6" stroke="#E9D8AA" stroke-width="2" stroke-linecap="round"/></g>
    <g fill="#7C7B50" opacity=".55"><circle cx="70" cy="34" r="1.6"/><circle cx="84" cy="26" r="1.2"/><circle cx="96" cy="38" r="1.4"/><circle cx="110" cy="28" r="1.2"/><circle cx="122" cy="36" r="1.6"/></g>
    <path d="M24 130c0-10 8-16 18-16 0 10-8 16-18 16z" fill="#7C7B50" ${S}/>`;
  else if (name === 'tea') inner = `
    <g transform="translate(-4 0)">
    <path d="M122 132 L150 4" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M122 132 L150 4" stroke="#93ADA8" stroke-width="5" stroke-linecap="round"/>
    <path d="M82 54 L93 138 Q112 146 131 138 L142 54 Z" fill="#C97F4E"/><path d="M82 54 L142 54 L140.5 66 Q112 74 83.5 66 Z" fill="#F3EAD3"/>
    <g fill="none" stroke="#F3EAD3" stroke-width="3" stroke-linecap="round"><path d="M96 70q8 16-2 30"/><path d="M122 70q-10 14 2 28"/><path d="M110 74q4 10 0 18"/></g>
    <g fill="rgba(255,255,255,.35)" stroke="${INK}" stroke-width="1.8"><rect x="92" y="40" width="20" height="18" rx="4" transform="rotate(-12 102 49)"/><rect x="114" y="38" width="19" height="17" rx="4" transform="rotate(14 123 46)"/></g>
    <path d="M78 28 L92 140 Q112 148 132 140 L146 28" fill="none" ${S}/><ellipse cx="112" cy="28" rx="34" ry="5" fill="none" ${S}/></g>
    <g ${S}><path d="M40 132c0-12 9-18 20-18 0 12-9 18-20 18z" fill="#483F29"/><path d="M58 140c2-10 10-14 18-12-2 9-10 13-18 12z" fill="#7A774A"/><path d="M170 136c-2-10 4-18 14-18 2 10-4 17-14 18z" fill="#483F29"/></g>
    <g fill="#F4EFDF" stroke="${INK}" stroke-width="1.6"><path d="M172 70l4-8 4 8-4 8z"/><path d="M48 80l3-6 3 6-3 6z"/></g>`;
  else if (name === 'latte') inner = `
    <path d="M78 54 L90 138 Q110 146 130 138 L142 54 Z" fill="#F4EEE0"/>
    <path d="M80 70 L84 98 Q110 106 136 98 L140 70 Z" fill="#9B6A43"/>
    <g fill="none" stroke="#C89A6B" stroke-width="3" stroke-linecap="round"><path d="M92 100q6 12-2 24"/><path d="M124 100q-6 12 2 22"/><path d="M108 104q4 8 0 14"/></g>
    <path d="M78 54 C78 34 142 34 142 54 C142 62 78 62 78 54 Z" fill="#EBD3A1" ${S}/>
    <path d="M86 52 q8-6 16 0 t16 0 t16 0" fill="none" stroke="#C9A66B" stroke-width="2" stroke-linecap="round"/>
    <g fill="#B07A45"><rect x="96" y="38" width="6" height="4" rx="1" transform="rotate(20 99 40)"/><rect x="110" y="34" width="7" height="4" rx="1" transform="rotate(-15 113 36)"/><rect x="124" y="40" width="5" height="4" rx="1"/><rect x="104" y="46" width="5" height="3" rx="1"/></g>
    <g fill="rgba(255,255,255,.45)" stroke="${INK}" stroke-width="1.8"><rect x="94" y="110" width="16" height="15" rx="4" transform="rotate(-10 102 117)"/><rect x="114" y="114" width="15" height="14" rx="4" transform="rotate(12 121 121)"/></g>
    <path d="M76 44 L90 140 Q110 148 130 140 L144 44" fill="none" ${S}/>
    <g transform="translate(170 104) rotate(-14)"><rect x="-20" y="-30" width="40" height="60" rx="3" fill="#C7894C" ${S}/><path d="M-20 -24 h40M-20 24 h40" stroke="#A46B36" stroke-width="1.6"/>${[-22,-12,-2,8,18].map(y=>`<circle cx="-20" cy="${y}" r="2.4" fill="#A46B36"/><circle cx="20" cy="${y}" r="2.4" fill="#A46B36"/>`).join('')}<g fill="#A46B36"><circle cx="-6" cy="-6" r="1.6"/><circle cx="6" cy="-6" r="1.6"/><circle cx="-6" cy="6" r="1.6"/><circle cx="6" cy="6" r="1.6"/></g></g>
    <g fill="#C7894C" ${S} stroke-width="1.4"><path d="M44 130l8-4 4 7-9 3z"/><path d="M58 138l6-3 3 5-7 2z"/></g>`;
  else if (name.startsWith('syrup')) { const SY = {'':['#D59B4A','#B98A5C','#E0A63E'], 'earl-grey':['#8C6A4E','#A9825F','#C9A66B'], osmanthus:['#E0A63E','#D59B4A','#E8B64C'], jasmine:['#E6DCA0','#D8CC8A','#B9B45A'], simple:['#F2EBD2','#E3D7B4','#A1AFB8'], pear:['#C9CB7E','#B5B96A','#7C7B50'], honey:['#E2A93B','#D4952C','#6E7A3E']}; const [c1,c2,c3] = SY[name.slice(6)] || SY['']; inner = `
    <g transform="translate(76 0)">
      <rect x="-9" y="22" width="18" height="16" rx="3" fill="#C9A66B" ${S}/>
      <path d="M-7 38 L-7 50 C-26 58 -30 70 -30 84 L-30 132 Q0 142 30 132 L30 84 C30 70 26 58 7 50 L7 38 Z" fill="#F4EEE0" ${S}/>
      <path d="M-28 90 L-28 131 Q0 140 28 131 L28 90 Q0 98 -28 90 Z" fill="${c1}"/>
      <path d="M-30 84 L-30 132 Q0 142 30 132 L30 84 C30 70 26 58 7 50 L7 38 L-7 38 L-7 50 C-26 58 -30 70 -30 84 Z" fill="none" ${S}/>
      <rect x="-18" y="100" width="36" height="22" rx="3" fill="#F0EACF" ${S} stroke-width="1.8"/>
      <g fill="${c3}">${[[-8,111],[0,107],[8,112],[1,116]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.6"/>`).join('')}</g>
    </g>
    <g transform="translate(144 20)">
      <rect x="-7" y="24" width="14" height="12" rx="3" fill="#C9A66B" ${S}/>
      <path d="M-5 36 L-5 46 C-20 52 -22 62 -22 72 L-22 118 Q0 126 22 118 L22 72 C22 62 20 52 5 46 L5 36 Z" fill="#F4EEE0" ${S}/>
      <path d="M-20 80 L-20 117 Q0 124 20 117 L20 80 Q0 86 -20 80 Z" fill="${c2}"/>
      <path d="M-22 72 L-22 118 Q0 126 22 118 L22 72 C22 62 20 52 5 46 L5 36 L-5 36 L-5 46 C-20 52 -22 62 -22 72 Z" fill="none" ${S}/>
    </g>
    <g ${S} stroke-width="1.8"><path d="M118 48 C126 40 132 40 138 46" fill="none"/><path d="M110 50 L122 44 L126 54 L114 60 Z" fill="#F0EACF"/></g>
    <g transform="translate(36 128)" ${S} stroke-width="1.8">${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-7" rx="4" ry="7" fill="#F7F2E2" transform="rotate(${a})"/>`).join('')}<circle r="3" fill="${c3}"/></g>
    <g transform="translate(188 132) scale(.8)" ${S} stroke-width="2">${[0,90,180,270].map(a=>`<ellipse cx="0" cy="-6" rx="4" ry="6" fill="${c3}" transform="rotate(${a})"/>`).join('')}</g>
    <path d="M182 54c0-12 9-18 20-18 0 12-9 18-20 18z" fill="#7C7B50" ${S}/>`; }
  else if (name === 'matchalatte') inner = `
    <path d="M70 46 L82 138 Q102 146 122 138 L134 46 Z" fill="#F4EEE0"/>
    <path d="M72 60 L76 92 Q102 100 128 92 L132 60 Z" fill="#8E9E5A"/>
    <path d="M78 116 L82 138 Q102 146 122 138 L126 116 Q102 124 78 116 Z" fill="#D9A15A" opacity=".85"/>
    <g fill="none" stroke="#B9C48A" stroke-width="3" stroke-linecap="round"><path d="M88 94q4 10-2 18"/><path d="M114 94q-4 10 2 16"/></g>
    <g fill="rgba(255,255,255,.45)" stroke="${INK}" stroke-width="1.8"><rect x="84" y="44" width="17" height="15" rx="4" transform="rotate(-10 92 51)"/><rect x="104" y="46" width="16" height="15" rx="4" transform="rotate(12 112 53)"/><rect x="92" y="100" width="15" height="14" rx="4" transform="rotate(8 99 107)"/></g>
    <path d="M68 38 L82 140 Q102 148 122 140 L136 38" fill="none" ${S}/><ellipse cx="102" cy="38" rx="34" ry="5" fill="none" ${S}/>
    <g transform="translate(170 96) scale(0.75)"><path d="M-7 20 C-24 12 -25 -10 -12 -23 Q0 -27 12 -23 C25 -10 24 12 7 20 Z" fill="#EEDFB4"/><ellipse cx="0" cy="-22" rx="11" ry="3.6" fill="#B79A5E"/><g fill="none" stroke="#A88650" stroke-width="1.1" stroke-linecap="round"><path d="M-1.8 20 C-3.2 6 -3.6 -8 -2.8 -19"/><path d="M-0.9 20 C-1.6 6 -1.8 -8 -1.4 -19"/><path d="M0.0 20 C0.0 6 0.0 -8 0.0 -19"/><path d="M0.9 20 C1.6 6 1.8 -8 1.4 -19"/><path d="M1.8 20 C3.2 6 3.6 -8 2.8 -19"/></g><g fill="none" stroke="#8C6F3E" stroke-width="1.3" stroke-linecap="round"><path d="M-6.4 20 C-22.4 12 -23.2 -10 -12.0 -22 q1.6 -2 3.6 1"/><path d="M-4.8 20 C-16.8 12 -17.4 -10 -9.0 -22 q1.2 -2 2.7 1"/><path d="M-3.2 20 C-11.2 12 -11.6 -10 -6.0 -22 q0.8 -2 1.8 1"/><path d="M-1.6 20 C-5.6 12 -5.8 -10 -3.0 -22 q0.4 -2 0.9 1"/><path d="M1.6 20 C5.6 12 5.8 -10 3.0 -22 q-0.4 -2 -0.9 1"/><path d="M3.2 20 C11.2 12 11.6 -10 6.0 -22 q-0.8 -2 -1.8 1"/><path d="M4.8 20 C16.8 12 17.4 -10 9.0 -22 q-1.2 -2 -2.7 1"/><path d="M6.4 20 C22.4 12 23.2 -10 12.0 -22 q-1.6 -2 -3.6 1"/></g><path d="M-7 20 C-24 12 -25 -10 -12 -23 M7 20 C24 12 25 -10 12 -23" fill="none" ${S}/><path d="M-12 -23 Q0 -28 12 -23" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/><rect x="-8" y="20" width="16" height="30" rx="3.5" fill="#D9C38F" ${S}/><path d="M-8 33 h16" stroke="#A88A50" stroke-width="1.8"/><path d="M-3 24 v6" stroke="#E9D8AA" stroke-width="2" stroke-linecap="round"/></g>
    <g fill="#8E9E5A" opacity=".6"><circle cx="160" cy="130" r="2"/><circle cx="172" cy="136" r="1.6"/><circle cx="182" cy="128" r="1.8"/></g>
    <path d="M30 128c0-12 9-18 20-18 0 12-9 18-20 18z" fill="#7C7B50" ${S}/>
    <g fill="#F4EFDF" stroke="${INK}" stroke-width="1.6"><path d="M40 52l3-6 3 6-3 6z"/><path d="M150 24l3-6 3 6-3 6z"/></g>`;
  else if (name === 'mochi') inner = `
    <ellipse cx="104" cy="116" rx="80" ry="24" fill="#F0EACF" ${S}/>
    <ellipse cx="104" cy="112" rx="60" ry="15" fill="none" stroke="#D3CCAB" stroke-width="2"/>
    ${[[70,100,17],[104,104,18],[138,100,17],[86,80,16],[122,80,16],[104,60,15]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#8E7398" ${S}/><path d="M${x-r*0.6} ${y-r*0.35} q${r*0.6} -${r*0.55} ${r*1.2} 0" fill="none" stroke="#D9A640" stroke-width="3" stroke-linecap="round" opacity=".8"/><circle cx="${x-r*0.35}" cy="${y-r*0.3}" r="${r*0.18}" fill="#C9B3D1"/>`).join('')}
    <g transform="translate(184 64) rotate(25)"><path d="M-12 -20 C6 -24 16 -8 14 8 C12 22 -4 26 -12 16 C-20 6 -22 -14 -12 -20 Z" fill="#7A5C86" ${S}/><path d="M-12 -20 l-6 -6M14 8 l7 4" ${S} fill="none"/><g fill="#C9B3D1"><circle cx="-2" cy="-6" r="1.6"/><circle cx="4" cy="6" r="1.4"/></g></g>
    <g fill="#F4EFDF" stroke="${INK}" stroke-width="1.6"><path d="M36 50l3-6 3 6-3 6z"/><path d="M160 26l3-6 3 6-3 6z"/></g>
    <g fill="none" ${S} opacity=".6"><path d="M80 40q-6-8 0-14t0-14"/><path d="M128 40q-6-8 0-14t0-14"/></g>`;
  else if (name === 'popcorn') inner = `
    <path d="M58 64 L76 146 Q110 152 144 146 L162 64 Z" fill="#F4EEE0" ${S}/>
    <g stroke="#B8664B" stroke-width="5" opacity=".55"><path d="M80 70 L92 146"/><path d="M104 70 L108 148"/><path d="M128 70 L124 148"/><path d="M150 70 L138 146"/></g>
    <path d="M58 64 L76 146 Q110 152 144 146 L162 64" fill="none" ${S}/>
    ${[[72,60,13],[94,52,14],[118,50,14],[142,58,13],[84,72,12],[108,68,13],[132,72,12],[100,40,11],[126,38,10]].map(([x,y,r],i)=>`<path d="M${x-r} ${y} q${r*0.2} -${r*0.9} ${r} -${r} q${r*0.9} ${r*0.1} ${r} ${r*0.9} q-${r*0.2} ${r*0.9} -${r} ${r} q-${r*0.9} -${r*0.1} -${r} -${r*0.9}z" fill="${i%2?'#D9A640':'#C98E3A'}" ${S} stroke-width="2"/><g fill="#F1D79A"><circle cx="${x-r*0.3}" cy="${y-r*0.3}" r="1.6"/><circle cx="${x+r*0.3}" cy="${y+r*0.1}" r="1.3"/></g>`).join('')}
    <g ${S} stroke-width="1.8"><path d="M86 34c-8-10-2-20 8-20 2 10-2 18-8 20z" fill="#6E7A3E"/><path d="M146 44c4-12 16-14 22-8-4 10-12 12-22 8z" fill="#7C7B50"/><path d="M64 50c-10-4-12-14-6-18 8 2 10 10 6 18z" fill="#6E7A3E"/></g>
    <path d="M150 30 L118 92" stroke="#C9A66B" stroke-width="4" stroke-linecap="round"/><path d="M150 30 L118 92" stroke="${INK}" stroke-width="1.2" stroke-linecap="round" opacity=".5"/>
    <g fill="#F4EFDF" stroke="${INK}" stroke-width="1.6"><path d="M38 96l3-6 3 6-3 6z"/><path d="M182 100l3-6 3 6-3 6z"/></g>
    <g fill="#F4EFDF"><circle cx="40" cy="132" r="2"/><circle cx="180" cy="134" r="1.8"/></g>`;
  else if (name === 'chocbrownie') inner = `
    <g transform="translate(-8 6)">
    <path d="M44 74 L100 52 L156 74 L100 96 Z" fill="#6B4A35" ${S}/>
    <path d="M44 74 L100 96 L100 128 L44 106 Z" fill="#543F2B" ${S}/>
    <path d="M100 96 L156 74 L156 106 L100 128 Z" fill="#483F29" ${S}/>
    <path d="M58 72 q14 -6 22 2 t24 -4 t22 2 t18 0" fill="none" stroke="#8E6A50" stroke-width="2" stroke-linecap="round"/>
    <path d="M64 80 q12 4 20 -2 t22 4 t20 -2" fill="none" stroke="#8E6A50" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>
    <path d="M60 92 q4 4 0 8M76 98 q4 4 0 8M126 102 q-4 4 0 8M142 96 q-4 4 0 8" fill="none" stroke="#2E241E" stroke-width="1.6" stroke-linecap="round"/>
    </g>
    <g transform="translate(176 96)"><path d="M-18 14 L18 14 L12 -10 L-12 -10 Z" fill="#F0EACF" ${S}/><path d="M-12 -10 Q0 -22 12 -10" fill="#6B4A35" ${S}/></g>
    ${[[170,46],[186,58],[164,62],[30,120],[44,134]].map(([x,y])=>`<path d="M${x} ${y} q4 -9 8 0 q-4 3 -8 0z" fill="#483F29" stroke="${INK}" stroke-width="1.4"/>`).join('')}
    <g fill="#F4EFDF" stroke="${INK}" stroke-width="1.6"><path d="M38 52l3-6 3 6-3 6z"/><path d="M120 26l3-6 3 6-3 6z"/></g>`;
  else if (name === 'wings') inner = `
    <ellipse cx="96" cy="112" rx="78" ry="26" fill="#F0EACF" ${S}/>
    <ellipse cx="96" cy="108" rx="58" ry="16" fill="none" stroke="#D3CCAB" stroke-width="2"/>
    ${[[62,96,-20],[94,88,10],[126,98,30],[78,112,-5],[112,114,15]].map(([x,y,r])=>`<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-20 -6 C-22 -16 -8 -18 0 -12 C8 -18 22 -16 20 -6 C24 4 14 12 0 10 C-14 12 -24 4 -20 -6 Z" fill="#7A3E22" ${S}/><path d="M-12 -8 q8 -4 16 0" fill="none" stroke="#C0784A" stroke-width="2.6" stroke-linecap="round"/><circle cx="8" cy="-2" r="1.4" fill="#F4EFDF"/><circle cx="-6" cy="2" r="1.2" fill="#F4EFDF"/></g>`).join('')}
    <path d="M70 70 q20 -10 40 0 t40 0" fill="none" stroke="#7A3E22" stroke-width="2" stroke-linecap="round" opacity=".5"/>
    <g fill="none" ${S} opacity=".6"><path d="M80 56q-6-8 0-14t0-14"/><path d="M112 52q-6-8 0-14t0-14"/></g>
    <g transform="translate(180 108)"><path d="M-22 -6 Q-20 20 0 22 Q20 20 22 -6 Z" fill="#F0EACF" ${S}/><path d="M-20 -6 C-14 -20 14 -20 20 -6 Z" fill="#FBF6E7" ${S}/><path d="M-8 -12l2 2M4 -14l2 2M-2 -9l2 2M10 -10l2 2" stroke="${INK}" stroke-width="1.2" stroke-linecap="round"/><path d="M-14 6 q7 4 14 0 t14 0" fill="none" stroke="#93ADA8" stroke-width="1.6"/></g>
    <g ${S} stroke-width="1.6"><circle cx="30" cy="70" r="7" fill="#EFD9A0"/><circle cx="44" cy="58" r="6" fill="#EFD9A0"/></g>
    <path d="M164 56c0-12 9-18 20-18 0 12-9 18-20 18z" fill="#7C7B50" ${S}/>`;
  else if (name === 'muffin') inner = `
    ${[[78,96,1],[146,102,0.92]].map(([x,y,k])=>`<g transform="translate(${x} ${y}) scale(${k})">
      <path d="M-30 4 L-22 44 Q0 50 22 44 L30 4 Z" fill="#DDE4F3" ${S}/>
      <g stroke="#9FB6C3" stroke-width="1.6"><path d="M-20 8 L-15 44M-8 8 L-6 47M4 8 L4 47M16 8 L14 45M26 8 L20 43"/></g>
      <path d="M-36 6 C-40 -18 -20 -34 0 -34 C20 -34 40 -18 36 6 C24 12 -24 12 -36 6 Z" fill="#E8C98A" ${S}/>
      ${[[-18,-14],[-2,-22],[14,-12],[-8,-2],[20,0],[4,-6],[-24,2]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r="4.2" fill="#5B5F8F" stroke="${INK}" stroke-width="1.4"/><circle cx="${a-1.2}" cy="${b-1.2}" r="1" fill="#C9CDE8"/>`).join('')}
      <g fill="#FBF6E7">${[[-12,-24],[6,-28],[-26,-8],[24,-16],[10,2],[-4,-12]].map(([a,b])=>`<rect x="${a}" y="${b}" width="2.2" height="2.2" transform="rotate(30 ${a} ${b})"/>`).join('')}</g>
    </g>`).join('')}
    ${[[34,140],[188,140],[176,52]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" fill="#5B5F8F" stroke="${INK}" stroke-width="1.6"/>`).join('')}
    <path d="M24 60c0-12 9-18 20-18 0 12-9 18-20 18z" fill="#7C7B50" ${S}/>
    <g fill="#F4EFDF" stroke="${INK}" stroke-width="1.6"><path d="M112 26l3-6 3 6-3 6z"/><path d="M196 86l3-6 3 6-3 6z"/></g>`;
  else if (name === 'spaghetti') inner = `
    <path d="M168 96 L212 82" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M168 96 L212 82" stroke="#543F2B" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="100" cy="100" rx="78" ry="34" fill="#483F29" ${S}/>
    <ellipse cx="100" cy="94" rx="68" ry="27" fill="#C2553F" opacity=".85"/>
    <g fill="none" stroke="#EBCB6E" stroke-width="3.2" stroke-linecap="round">
      <path d="M48 96 C60 74 92 72 100 88 C108 104 136 102 146 86"/><path d="M56 104 C70 84 98 84 106 98 C114 112 142 108 152 94"/>
      <path d="M64 86 C78 70 110 68 118 82 C126 96 150 92 156 82"/><path d="M60 110 C80 98 104 100 116 108 C128 116 146 110 150 102"/>
      <path d="M78 80 C90 66 116 66 126 76"/><path d="M88 106 q20 -20 40 -4"/></g>
    ${[[74,86],[112,80],[132,98],[90,104]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="9" ry="6" fill="#B8664B" ${S} stroke-width="1.8"/><ellipse cx="${x}" cy="${y}" rx="5" ry="3" fill="#D99A80" opacity=".7"/>`).join('')}
    <g ${S} stroke-width="1.6"><path d="M100 94c-4-8 4-12 10-8-2 6-6 8-10 8z" fill="#7C7B50"/><path d="M140 84c-4-8 4-12 10-8-2 6-6 8-10 8z" fill="#7C7B50"/></g>
    <g fill="#F4EFDF"><circle cx="84" cy="94" r="1.8"/><circle cx="120" cy="92" r="1.6"/><circle cx="104" cy="78" r="1.6"/></g>
    <g fill="none" ${S} opacity=".6"><path d="M84 46q-6-8 0-14t0-14"/><path d="M116 42q-6-8 0-14t0-14"/></g>
    <g transform="translate(36 40)" ${S} stroke-width="1.8"><path d="M0 -12 C10 -12 14 0 10 8 C6 14 -6 14 -10 8 C-14 0 -10 -12 0 -12 Z" fill="#F7F2E2"/><path d="M0 -12 q2 -6 6 -8" fill="none"/><path d="M-4 -6 q-2 8 0 14M4 -6 q2 8 0 14" fill="none" stroke-width="1.2"/></g>
    <g fill="#F4EFDF" stroke="${INK}" stroke-width="1.6"><path d="M176 40l3-6 3 6-3 6z"/></g>`;
  else if (name === 'yuzu') inner = `
    <path d="M76 34 L88 140 Q108 148 128 140 L140 34 Z" fill="#F4EEE0"/>
    <path d="M78.5 56 L88.5 138 Q108 146 127.5 138 L137.5 56 Q108 62 78.5 56 Z" fill="#E8B64C" opacity=".9"/>
    <g fill="#F7D98A" opacity=".9">${[[96,86],[116,100],[104,118],[122,76],[92,124]].map(([x,y])=>`<path d="M${x} ${y} q4 -6 8 0 q-4 3 -8 0z"/>`).join('')}</g>
    <g fill="#FFFFFF" opacity=".5">${[[100,74],[112,92],[98,106],[118,122],[108,130]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2"/>`).join('')}</g>
    <g fill="rgba(255,255,255,.4)" stroke="${INK}" stroke-width="1.8"><rect x="88" y="44" width="17" height="15" rx="4" transform="rotate(-10 96 51)"/><rect x="110" y="48" width="16" height="15" rx="4" transform="rotate(12 118 55)"/></g>
    <path d="M74 26 L88 142 Q108 150 128 142 L142 26" fill="none" ${S}/><ellipse cx="108" cy="26" rx="34" ry="5" fill="none" ${S}/>
    <g transform="translate(140 30)"><circle r="17" fill="#F2DC8C" ${S}/><circle r="11.5" fill="#FAEEC0" stroke="#C9B44E" stroke-width="1.4"/><g stroke="#C9B44E" stroke-width="1.4"><path d="M0 -11.5V11.5M-11.5 0H11.5M-8 -8L8 8M8 -8L-8 8"/></g></g>
    <g transform="translate(96 30) rotate(-18)"><path d="M0 0 L0 -46" stroke="#5C6332" stroke-width="2.2" stroke-linecap="round"/>${[-40,-34,-28,-22,-16,-10,-4].map((y,i)=>`<path d="M0 ${y} q-9 -2 -12 -8" fill="none" stroke="#6E7A3E" stroke-width="2.6" stroke-linecap="round"/><path d="M0 ${y+3} q9 -2 12 -8" fill="none" stroke="#7C7B50" stroke-width="2.6" stroke-linecap="round"/>`).join('')}</g>
    <g transform="translate(178 118)"><circle r="14" fill="#E8B64C" ${S}/><path d="M-4 -14 q2 -6 8 -6" fill="none" ${S} stroke-width="1.8"/><path d="M4 -16c4-6 12-6 14-2-4 4-10 4-14 2z" fill="#7C7B50" ${S} stroke-width="1.6"/><g fill="#C9922C"><circle cx="-4" cy="-2" r="1.2"/><circle cx="4" cy="4" r="1.2"/><circle cx="-2" cy="6" r="1"/></g></g>
    <g fill="#F4EFDF" stroke="${INK}" stroke-width="1.6"><path d="M40 60l3-6 3 6-3 6z"/><path d="M180 70l3-6 3 6-3 6z"/></g>
    <g ${S} stroke-width="1.6"><path d="M36 132c0-12 9-18 20-18 0 12-9 18-20 18z" fill="#6E7A3E"/></g>`;
  else if (name === 'buns') inner = `
    <path d="M24 120 L196 120 L184 138 L36 138 Z" fill="#9FB6C3" ${S}/>
    <path d="M30 120 h160" stroke="#DDE4F3" stroke-width="2"/>
    ${[[56,92,24],[104,90,26],[152,92,24],[80,62,22],[128,62,22]].map(([x,y,r])=>`<path d="M${x-r} ${y+r*0.9} C${x-r*1.1} ${y-r*0.2} ${x-r*0.6} ${y-r} ${x} ${y-r} C${x+r*0.6} ${y-r} ${x+r*1.1} ${y-r*0.2} ${x+r} ${y+r*0.9} Z" fill="#E9C68A" ${S}/><path d="M${x-r*0.55} ${y-r*0.35} q${r*0.55} -${r*0.4} ${r*1.1} 0" fill="none" stroke="#F7EBCB" stroke-width="3.2" stroke-linecap="round"/><g fill="#FBF6E7" opacity=".9"><circle cx="${x-r*0.2}" cy="${y-r*0.55}" r="1.3"/><circle cx="${x+r*0.25}" cy="${y-r*0.6}" r="1.1"/><circle cx="${x+r*0.05}" cy="${y-r*0.75}" r="1"/></g>`).join('')}
    <g fill="none" ${S} opacity=".6"><path d="M92 30q-6-8 0-14t0-14"/><path d="M124 30q-6-8 0-14t0-14"/></g>
    <g transform="translate(186 50)" ${S} stroke-width="2"><path d="M-10 -8 h20 l-3 22 h-14 z" fill="#F0EACF"/><path d="M-6 -2 h12" stroke-width="1.4"/></g>
    <g fill="#F4EFDF" stroke="${INK}" stroke-width="1.6"><path d="M34 46l3-6 3 6-3 6z"/></g>`;
  else if (name === 'eggbites') inner = `
    <path d="M22 96 L198 96 L190 130 Q110 140 30 130 Z" fill="#9FB6C3" ${S}/>
    ${[[52,96],[110,96],[168,96]].map(([x,y])=>`<g transform="translate(${x} ${y})"><path d="M-26 -2 C-28 -26 -14 -36 0 -36 C14 -36 28 -26 26 -2 Z" fill="#F2CF6A" ${S}/><path d="M-18 -18 q6 -8 14 -6" fill="none" stroke="#F8E3A0" stroke-width="3" stroke-linecap="round"/>${[[-12,-14,'#C2553F'],[6,-24,'#6E7A3E'],[14,-12,'#C2553F'],[-4,-8,'#6E7A3E'],[-16,-6,'#8E4A3A']].map(([a,b,c])=>`<rect x="${a}" y="${b}" width="6" height="5" rx="1.5" fill="${c}" stroke="${INK}" stroke-width="1"/>`).join('')}${[[0,-28],[-8,-22],[10,-30],[18,-20]].map(([a,b])=>`<path d="M${a} ${b} l3 -2 l3 2 l-1 3 h-4z" fill="#FBF6E7" stroke="${INK}" stroke-width="1"/>`).join('')}</g>`).join('')}
    <g fill="none" ${S} opacity=".6"><path d="M82 46q-6-8 0-14t0-14"/><path d="M140 46q-6-8 0-14t0-14"/></g>
    <g transform="translate(186 36)" ${S} stroke-width="2"><ellipse cx="0" cy="0" rx="11" ry="14" fill="#FBF6E7"/></g>
    <g ${S} stroke-width="1.6"><path d="M28 56c0-12 9-18 20-18 0 12-9 18-20 18z" fill="#6E7A3E"/></g>
    <g fill="#F4EFDF" stroke="${INK}" stroke-width="1.6"><path d="M112 20l3-6 3 6-3 6z"/></g>`;
  else if (name === 'mayak') inner = `
    <path d="M30 84 Q34 138 110 142 Q186 138 190 84 Z" fill="#F0EACF" ${S}/>
    <path d="M44 110 q11 7 22 0 t22 0 t22 0 t22 0 t22 0 t16 0" fill="none" stroke="#93ADA8" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="110" cy="84" rx="80" ry="15" fill="#7A4A2A" ${S}/>
    ${[[78,80,-10],[110,76,0],[142,80,10]].map(([x,y,r])=>`<g transform="translate(${x} ${y}) rotate(${r})"><ellipse cx="0" cy="0" rx="17" ry="12" fill="#B9844E" ${S} stroke-width="2"/><circle cx="0" cy="0" r="6.5" fill="#E8A53A" stroke="${INK}" stroke-width="1.6"/><circle cx="-1.6" cy="-1.6" r="2" fill="#F4C76A"/></g>`).join('')}
    <g fill="#7C9A4E" stroke="${INK}" stroke-width="1.2">${[[60,88],[96,90],[126,88],[160,86],[92,72],[134,70]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.2"/><circle cx="${x}" cy="${y}" r="1.2" fill="#F4EFDF" stroke="none"/>`).join('')}</g>
    <g fill="#C2553F">${[[70,92],[118,92],[150,92],[102,70]].map(([x,y])=>`<rect x="${x}" y="${y}" width="3" height="3" rx="1"/>`).join('')}</g>
    <g fill="#F4EFDF">${[[64,78],[90,86],[120,84],[152,78],[104,90],[138,92]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="1.6" ry="1" />`).join('')}</g>
    <g ${S} stroke="#543F2B" stroke-width="3.4" fill="none"><path d="M176 24 L130 74"/><path d="M188 30 L138 78"/></g>
    <g transform="translate(40 40)"><ellipse cx="0" cy="0" rx="11" ry="14" fill="#FBF6E7" ${S} stroke-width="2"/></g>
    <g fill="#F4EFDF" stroke="${INK}" stroke-width="1.6"><path d="M110 26l3-6 3 6-3 6z"/></g>`;
  else if (name === 'salmon') inner = `
    <ellipse cx="104" cy="108" rx="84" ry="28" fill="#F0EACF" ${S}/>
    <ellipse cx="104" cy="104" rx="64" ry="18" fill="none" stroke="#D3CCAB" stroke-width="2"/>
    <path d="M46 96 C48 72 72 62 104 64 C140 66 166 78 164 96 C160 112 130 118 102 116 C70 114 44 110 46 96 Z" fill="#E8875A" ${S}/>
    <g fill="none" stroke="#F7C4A2" stroke-width="3" stroke-linecap="round"><path d="M70 74 q-8 18 2 36"/><path d="M92 68 q-8 22 2 46"/><path d="M116 68 q-8 22 2 46"/><path d="M140 74 q-8 18 2 36"/></g>
    <path d="M150 82 C158 86 164 92 164 96 C160 110 148 114 140 115" fill="none" stroke="#B5573A" stroke-width="4" stroke-linecap="round"/>
    <g transform="translate(104 74)"><rect x="-14" y="-10" width="28" height="18" rx="5" fill="#F6E3A6" ${S} stroke-width="2"/><path d="M-8 -4 q8 -4 16 0" fill="none" stroke="#FBF1CC" stroke-width="2.4" stroke-linecap="round"/>${[[-6,-1],[4,2],[8,-5]].map(([a,b])=>`<path d="M${a} ${b} l3 -4 M${a} ${b} l-3 -3 M${a} ${b} l1 -5" stroke="#6E7A3E" stroke-width="1.4" stroke-linecap="round"/>`).join('')}</g>
    <g fill="#FBF6E7" stroke="${INK}" stroke-width=".8">${[[70,88],[84,96],[124,92],[140,100],[100,100]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="1.8" ry="1.1"/>`).join('')}</g>
    <g fill="#7C9A4E">${[[62,98],[132,86],[112,102],[80,82]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.4" stroke="${INK}" stroke-width="1"/>`).join('')}</g>
    <g transform="translate(182 118)"><circle r="16" fill="#F2DC8C" ${S}/><circle r="10.5" fill="#FAEEC0" stroke="#C9B44E" stroke-width="1.4"/><g stroke="#C9B44E" stroke-width="1.4"><path d="M0 -10.5V10.5M-10.5 0H10.5M-7.4 -7.4L7.4 7.4M7.4 -7.4L-7.4 7.4"/></g></g>
    <g transform="translate(184 60) rotate(22)"><path d="M0 30 V-24" stroke="#5C6332" stroke-width="2" stroke-linecap="round"/>${[-20,-12,-4,4,12,20].map(y=>`<path d="M0 ${y} l-8 -6 M0 ${y} l8 -6 M0 ${y} l-5 -9 M0 ${y} l5 -9" stroke="#7C7B50" stroke-width="1.6" stroke-linecap="round"/>`).join('')}</g>
    <g fill="none" ${S} opacity=".6"><path d="M90 46q-6-8 0-14t0-14"/><path d="M122 46q-6-8 0-14t0-14"/></g>
    <g fill="#F4EFDF" stroke="${INK}" stroke-width="1.6"><path d="M40 60l3-6 3 6-3 6z"/></g>`;
  else if (name === 'mushtart') inner = `
    ${[[64,98,1],[150,104,0.94]].map(([x,y,k])=>`<g transform="translate(${x} ${y}) scale(${k})">
      <path d="M-34 -6 L-26 34 Q0 42 26 34 L34 -6 Z" fill="#E2B877" ${S}/>
      <path d="M-40 -6 L-30 -22 L-14 -10 L0 -26 L14 -10 L30 -22 L40 -6 Q0 4 -40 -6 Z" fill="#EBC888" ${S}/>
      <g stroke="#C9965A" stroke-width="1.6" fill="none" stroke-linecap="round"><path d="M-24 8 q4 2 8 0M2 14 q4 2 8 0M-12 24 q4 2 8 0M14 26 q4 2 8 0"/></g>
      <ellipse cx="0" cy="-8" rx="28" ry="8" fill="#F2D27A" ${S} stroke-width="2"/>
      ${[[-12,-12],[4,-14],[14,-8],[-2,-6]].map(([a,b])=>`<path d="M${a-6} ${b} q6 -8 12 0 z" fill="#8E6A50" stroke="${INK}" stroke-width="1.4"/><path d="M${a-1.5} ${b} v4 h3 v-4" fill="#E8D8BC" stroke="${INK}" stroke-width="1.2"/>`).join('')}
      ${[[-18,-10],[10,-16],[20,-10]].map(([a,b])=>`<path d="M${a} ${b} l-3 -3 M${a} ${b} l3 -3 M${a} ${b} v-5" stroke="#6E7A3E" stroke-width="1.4" stroke-linecap="round"/>`).join('')}
    </g>`).join('')}
    <g transform="translate(184 56)" ${S} stroke-width="2"><path d="M-14 -2 q14 -18 28 0 z" fill="#B58A6A"/><path d="M-4 -2 v14 h8 v-14" fill="#EFE2C8"/></g>
    <g transform="translate(108 34) rotate(-15)"><path d="M0 18 V-18" stroke="#5C6332" stroke-width="2" stroke-linecap="round"/>${[-14,-8,-2,4,10].map(y=>`<ellipse cx="-4" cy="${y}" rx="3.2" ry="1.8" fill="#7C7B50"/><ellipse cx="4" cy="${y+2}" rx="3.2" ry="1.8" fill="#7C7B50"/>`).join('')}</g>
    <g fill="#F4EFDF" stroke="${INK}" stroke-width="1.6"><path d="M30 50l3-6 3 6-3 6z"/><path d="M196 128l3-6 3 6-3 6z"/></g>`;
  else if (name === 'pesto') inner = `
    <path d="M18 112 L196 112 L188 136 Q110 146 26 136 Z" fill="#C9A66B" ${S}/>
    <g stroke="#A88650" stroke-width="1.6" fill="none"><path d="M40 122 h40M100 126 h44M156 120 h24"/></g>
    ${[[60,82,-6],[110,76,4],[160,84,8]].map(([x,y,r])=>`<g transform="translate(${x} ${y}) rotate(${r})">
      <rect x="-24" y="-22" width="48" height="44" rx="4" fill="#E9C27E" ${S}/>
      <rect x="-15" y="-13" width="30" height="26" rx="2" fill="#6E8A3E" stroke="#4E6A2A" stroke-width="1.6"/>
      <g fill="#8EA858">${[[-8,-6],[6,-8],[-4,6],[8,5]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r="1.6"/>`).join('')}</g>
      <path d="M-11 -2 a7 7 0 0 1 14 0 z" fill="#D9573F" stroke="${INK}" stroke-width="1.4"/><path d="M-8 -2 a4 4 0 0 1 8 0" fill="none" stroke="#F2A08A" stroke-width="1.2"/>
      <path d="M1 8 a6 6 0 0 1 12 0 z" fill="#D9573F" stroke="${INK}" stroke-width="1.4"/>
      <g fill="#FBF6E7">${[[-10,8],[10,-8],[-2,-10]].map(([a,b])=>`<rect x="${a}" y="${b}" width="2" height="2" transform="rotate(30 ${a} ${b})"/>`).join('')}</g>
      <path d="M-6 -16 q4 -6 10 -4 q-2 6 -10 4 z" fill="#5E8A3A" stroke="${INK}" stroke-width="1.2"/>
    </g>`).join('')}
    <g transform="translate(190 46)"><path d="M0 -14 C10 -14 14 0 0 14 C-14 0 -10 -14 0 -14 Z" fill="#5E8A3A" ${S} stroke-width="2"/><path d="M0 -10 V12" stroke="#3E5A22" stroke-width="1.4"/></g>
    <g fill="#F4EFDF" stroke="${INK}" stroke-width="1.6"><path d="M30 46l3-6 3 6-3 6z"/><path d="M112 26l3-6 3 6-3 6z"/></g>`;
  else if (name === 'mushpasta') inner = `
    <path d="M30 84 Q34 138 110 142 Q186 138 190 84 Z" fill="#F0EACF" ${S}/>
    <path d="M44 110 q11 7 22 0 t22 0 t22 0 t22 0 t22 0 t16 0" fill="none" stroke="#93ADA8" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="110" cy="84" rx="80" ry="15" fill="#E9DDB4" ${S}/>
    <path d="M44 84 C60 62 160 62 176 84 Q110 96 44 84 Z" fill="#C9D08E" ${S} stroke-width="2"/>
    ${[[64,74,-30],[84,66,20],[104,62,-10],[126,64,35],[148,72,-20],[94,78,50],[120,78,-40],[140,82,10],[74,82,15]].map(([x,y,r])=>`<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-9" y="-4.5" width="18" height="9" rx="2" fill="#EFD38E" stroke="${INK}" stroke-width="1.4"/><path d="M-4 -4.5 v9 M1 -4.5 v9 M6 -4.5 v9" stroke="#C9A65A" stroke-width="1"/></g>`).join('')}
    ${[[78,70],[112,70],[136,76]].map(([x,y])=>`<path d="M${x-7} ${y} q7 -9 14 0 z" fill="#8E6A50" stroke="${INK}" stroke-width="1.4"/><path d="M${x-1.5} ${y} v4 h3 v-4" fill="#E8D8BC" stroke="${INK}" stroke-width="1.1"/>`).join('')}
    <g fill="#5E8A3A" stroke="${INK}" stroke-width="1.2"><path d="M98 58 q5 -8 12 -5 q-3 7 -12 5 z"/><path d="M152 66 q5 -8 12 -5 q-3 7 -12 5 z"/></g>
    <g fill="#FBF6E7">${[[70,66],[100,72],[128,70],[150,78],[88,62]].map(([a,b])=>`<rect x="${a}" y="${b}" width="2.2" height="2.2" transform="rotate(30 ${a} ${b})"/>`).join('')}</g>
    <g fill="none" ${S} opacity=".6"><path d="M92 44q-6-8 0-14t0-14"/><path d="M126 44q-6-8 0-14t0-14"/></g>
    <g ${S} stroke="#543F2B" stroke-width="3.2" fill="none"><path d="M184 24 L148 70"/></g><path d="M148 70 l-6 10 M148 70 l-2 11 M148 70 l3 11" stroke="#543F2B" stroke-width="2" stroke-linecap="round"/>
    <g fill="#F4EFDF" stroke="${INK}" stroke-width="1.6"><path d="M34 46l3-6 3 6-3 6z"/></g>`;
  else if (name === 'pear') inner = `
    <g transform="translate(70 92)">
      <path d="M0 -40 C10 -40 12 -24 14 -14 C30 -4 34 16 28 30 C20 46 -20 46 -28 30 C-34 16 -30 -4 -14 -14 C-12 -24 -10 -40 0 -40 Z" fill="#C9CB7E" ${S}/>
      <path d="M-14 14 C-14 26 -6 34 4 36" fill="none" stroke="#E6E3A9" stroke-width="3" stroke-linecap="round"/>
      <path d="M0 -40 C0 -48 4 -54 8 -56" fill="none" ${S}/><path d="M4 -48 C14 -62 30 -58 32 -52 C22 -44 10 -44 4 -48 Z" fill="#7C7B50" ${S}/>
      <g fill="#7A774A" opacity=".5"><circle cx="10" cy="6" r="1.4"/><circle cx="-8" cy="20" r="1.4"/><circle cx="14" cy="24" r="1.2"/></g>
    </g>
    <g transform="translate(14 0)">
    <path d="M118 52 L128 140 Q146 147 164 140 L174 52 Z" fill="#F4EEE0"/>
    <path d="M119.5 62 L123 90 Q146 96 169 90 L172.5 62 Z" fill="#8E9E5A"/>
    <path d="M126 122 L128 140 Q146 147 164 140 L166 122 Q146 128 126 122 Z" fill="#E8E2B2"/>
    <g fill="none" stroke="#B9C48A" stroke-width="3" stroke-linecap="round"><path d="M134 92q4 10-2 18"/><path d="M156 92q-4 10 2 16"/></g>
    <g fill="rgba(255,255,255,.4)" stroke="${INK}" stroke-width="1.8"><rect x="130" y="98" width="15" height="14" rx="4" transform="rotate(-10 137 105)"/><rect x="148" y="100" width="14" height="13" rx="4" transform="rotate(10 155 106)"/></g>
    <path d="M116 44 L128 142 Q146 149 164 142 L176 44" fill="none" ${S}/><ellipse cx="146" cy="44" rx="30" ry="4.5" fill="none" ${S}/>
    </g>
    <g fill="#F4EFDF" stroke="${INK}" stroke-width="1.6"><path d="M34 40l3-6 3 6-3 6z"/><path d="M118 24l3-6 3 6-3 6z"/></g>`;
  else inner = `
    <ellipse cx="110" cy="100" rx="78" ry="30" fill="#F0EACF" ${S}/><ellipse cx="110" cy="96" rx="56" ry="19" fill="none" stroke="#D3CCAB" stroke-width="2"/>
    <g transform="translate(110 76) scale(.9)">${loopyRaw('#A1AFB8','#5A3A2A')}</g>
    <path d="M150 54c0-12 9-18 20-18 0 12-9 18-20 18z" fill="#7C7B50" ${S}/>`;
  return `<svg class="art" viewBox="0 0 220 160" aria-hidden="true"><g filter="url(#wob)">${inner}</g></svg>`;
}
export const ARTS = [['udon','noodle bowl'],['rice','pineapple fried rice'],['madeleine','bear madeleine'],['brownie','matcha square'],['shortbread','three cookies'],['tart','egg tarts'],['tea','iced tea'],['latte','iced latte & cookie'],['pear','pear & matcha'],['matchalatte','matcha latte'],['mochi','mochi balls'],['chocbrownie','chocolate brownie'],['wings','glazed wings'],['muffin','blueberry muffins'],['spaghetti','one-pan spaghetti'],['yuzu','yuzu tea'],['buns','bread rolls'],['eggbites','egg bites'],['mayak','soy-marinated eggs'],['salmon','miso butter salmon'],['mushtart','mushroom tarts'],['pesto','pesto squares'],['mushpasta','mushroom pasta'],['syrup-honey','syrup · honey'],['popcorn','popcorn chicken'],['syrup','syrup bottles'],['syrup-earl-grey','syrup · earl grey'],['syrup-osmanthus','syrup · osmanthus'],['syrup-jasmine','syrup · jasmine'],['syrup-simple','syrup · simple'],['syrup-pear','syrup · pear'],['plate','flower plate']];
export const DEFS = `<svg class="defs" aria-hidden="true"><defs>
  <filter id="wob"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="2.6"/></filter>
  <filter id="wobBig"><feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" seed="9"/><feDisplacementMap in="SourceGraphic" scale="9"/></filter></defs></svg>`;

/* ---------- views ---------- */