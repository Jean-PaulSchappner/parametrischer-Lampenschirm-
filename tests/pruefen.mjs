// Prüft Lampenschirm Studio ohne Browser: alle Vorlagen, Passungen, Korrekturen, STL-Lernen und die OpenSCAD-Fassung.
// Aufruf:  node tests/pruefen.mjs              (ohne OpenSCAD-Vergleich)
//          OPENSCAD="C:/Pfad/openscad.com" node tests/pruefen.mjs   (mit Vergleich App ↔ OpenSCAD)
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync, spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const root = new URL('../', import.meta.url);
const html = readFileSync(new URL('index.html', root), 'utf8');
const scadFile = readFileSync(new URL('makerworld/lampenschirm.scad', root), 'utf8');

// Geometrie und Korrekturen aus der Seite holen (ohne Three.js und Oberfläche)
const cut = (a, b) => { const i = html.indexOf(a), j = html.indexOf(b, i); if (i < 0 || j < 0) throw new Error('Abschnitt fehlt: ' + a); return html.slice(i, j); };
const code = cut('const SCHEMA = [', 'function download(') +
  "const fmt = v => (Math.round(v * 100) / 100).toLocaleString('de-DE', { maximumFractionDigits: 2 });\n" +
  cut('const ITEM = Object.fromEntries', "document.getElementById('warnings').addEventListener") +
  '\nreturn { SCHEMA, ITEMS, DEFAULTS, PRESETS, FORMEN, buildLampshade, makeSurface, measureOverhang, analyzeSTL, formSampler, toSTL, scadExport, rrectRadius, runFix, describeChanges, setState: (p, c) => { P = p; current = c; },' +
  ' meshReport, parseSTL, spotGeom, buildWandspotRaw, SPOT_ZAPFEN, SPOT_KEYS };';
const A = new Function('let current;\n' + code)();
const { DEFAULTS, PRESETS, FORMEN, buildLampshade, makeSurface, analyzeSTL, formSampler, toSTL, scadExport, rrectRadius, runFix, describeChanges } = A;

let fails = 0, oks = 0;
const ok = (cond, text) => { if (cond) { oks++; console.log('  ✓ ' + text); } else { fails++; console.log('  ✗ ' + text); } };
const codes = r => r.warnings.filter(w => w.code).map(w => w.code);

// Geschlossenheit: jede Kante muss genau einmal in Gegenrichtung vorkommen, Volumen positiv (Normalen außen)
function closed(pos, idx) {
  const key = i => `${pos[i * 3].toFixed(3)},${pos[i * 3 + 1].toFixed(3)},${pos[i * 3 + 2].toFixed(3)}`;
  const edges = new Map(); let vol = 0;
  for (let t = 0; t < idx.length; t += 3) {
    const v = [idx[t], idx[t + 1], idx[t + 2]], k = v.map(key);
    const [a, b, c] = v.map(i => [pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]]);
    vol += (a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0])) / 6;
    for (let e = 0; e < 3; e++) { const s = k[e] + '>' + k[(e + 1) % 3]; edges.set(s, (edges.get(s) || 0) + 1); }
  }
  let open = 0; for (const [s] of edges) { const [x, y] = s.split('>'); if (!edges.has(y + '>' + x)) open++; }
  return { open, vol };
}
const light = p => ({ ...p, straenge: Math.min(24, p.straenge), maschen: Math.min(40, p.maschen), korbStaebe: Math.min(24, p.korbStaebe) });

/* ---------- 1. Vorlagen ---------- */
console.log('\n1. Vorlagen: ohne Warnung, alle Teile geschlossen');
for (const [name, pr] of Object.entries(PRESETS)) {
  const p = { ...DEFAULTS, ...pr };
  const r = buildLampshade(p);
  const q = buildLampshade(light(p)), s = closed(q.positions, q.indices);
  const parts = [s];
  if (q.base) parts.push(closed(q.base.positions, q.base.indices));
  if (q.diffuser) parts.push(closed(q.diffuser.positions, q.diffuser.indices));
  ok(codes(r).length === 0 && parts.every(x => x.open === 0 && x.vol > 0),
    `${name}: ${codes(r).join(',') || 'keine Warnung'}, Überhang ${r.stats.maxOverhang.toFixed(0)}°, ${parts.length} Teil(e) geschlossen`);
}

/* ---------- 2. Passungen ---------- */
console.log('\n2. Passungen (nachgemessen im Netz)');
const segDist = (p, a, b) => { const ex = b[0] - a[0], ey = b[1] - a[1]; let t = ((p[0] - a[0]) * ex + (p[1] - a[1]) * ey) / (ex * ex + ey * ey); t = Math.max(0, Math.min(1, t)); return Math.hypot(p[0] - a[0] - t * ex, p[1] - a[1] - t * ey); };
const inside = (p, poly) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > p[1]) !== (yj > p[1]) && p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi) c = !c; } return c; };
for (const [label, x] of [['Panel 120×160, Sockel, flach', {}], ['Panel, Haube versenkt, 50 % Dichte', { diffusorForm: 'haube', diffusorDichte: 50 }], ['Panel um 30° gedreht', { drehUnten: 30 }], ['Puck 70 mm', { einsatz: 'puck' }]]) {
  const p = { ...DEFAULTS, ...PRESETS['Panel 120×160 · Sockel getrennt'], straenge: 12, ...x };
  const r = buildLampshade(p), bh = p.sockelHoehe, pos = r.base.positions, rot = (p.drehUnten || 0) * Math.PI / 180;
  const puck = p.einsatz === 'puck', hx = puck ? p.puckD / 2 : p.panelB / 2, hy = puck ? p.puckD / 2 : p.panelL / 2, rr = puck ? hx : p.panelEcke;
  const item = []; for (let i = 0; i < 3000; i++) { const a = 2 * Math.PI * i / 3000, d = rrectRadius(a, hx, hy, rr); item.push([d * Math.cos(a + rot), d * Math.sin(a + rot)]); }
  const m = new Map();
  for (let i = 0; i < pos.length; i += 3) if (Math.abs(pos[i + 2] - bh) < 1e-3) { const px = pos[i], py = pos[i + 1], a = Math.atan2(py, px); if (Math.hypot(px, py) < rrectRadius(a - rot, hx + 1, hy + 1, rr + 1)) m.set(px.toFixed(4) + ',' + py.toFixed(4), [px, py]); }
  const poly = [...m.values()].sort((a, b) => Math.atan2(a[1], a[0]) - Math.atan2(b[1], b[0]));
  let mn = Infinity, mx = -Infinity;
  for (const q of item) { let d = Infinity; for (let i = 0; i < poly.length; i++) d = Math.min(d, segDist(q, poly[i], poly[(i + 1) % poly.length])); d = inside(q, poly) ? d : -d; mn = Math.min(mn, d); mx = Math.max(mx, d); }
  const d = r.diffuser; let dx = 0, dy = 0; for (let i = 0; i < d.positions.length; i += 3) { dx = Math.max(dx, Math.abs(d.positions[i])); dy = Math.max(dy, Math.abs(d.positions[i + 1])); }
  const panelTop = bh - (r.insert.depth - p.einsatzTiefe), diffTop = panelTop + d.height;
  const zs = new Set(); for (let i = 2; i < pos.length; i += 3) zs.add(pos[i].toFixed(3));
  ok(Math.abs(mn - p.spiel) < 0.002 && Math.abs(mx - p.spiel) < 0.002 && Math.abs(2 * dx - 2 * hx) < 0.001 && Math.abs(2 * dy - 2 * hy) < 0.001
     && Math.abs(diffTop - bh) < 1e-6 && zs.has((bh - p.lippe).toFixed(3)),
    `${label}: Luft ${mn.toFixed(3)}–${mx.toFixed(3)} mm, Diffusor ${(2 * dx).toFixed(2)} × ${(2 * dy).toFixed(2)} mm bündig, Nut ${p.lippe} mm`);
}

/* ---------- 3. Korrekturen ---------- */
console.log('\n3. Automatische Korrekturen');
const broken = [
  ['Überhang (Drehung 0,6)', { ...PRESETS['Woven Light'], drehung: 0.6 }],
  ['Panel passt nicht', { ...PRESETS['Woven Light · Panel 120×160'], radiusUnten: 60, radiusOben: 60 }],
  ['Webversatz zu groß', { ...PRESETS['Woven Light'], webTiefe: 1.2 }],
  ['Sockel zu flach', { ...PRESETS['Panel 120×160 · Sockel getrennt'], diffusorForm: 'haube', diffusorHoehe: 40, sockelHoehe: 30 }],
  ['Strickreihen lose', { ...PRESETS['Strick-Lampe'], strickHoehe: 1 }],
  ['Korbbrücken zu lang', { ...PRESETS['Korb-Lampe'], korbStaebe: 16 }],
  ['Kanten zu stark gedreht', { ...PRESETS['Woven Light · Mitte gedreht'], drehUnten: -80, drehOben: 80 }],
  ['Diffusor zu dick', { ...PRESETS['Panel 120×160 · Sockel getrennt'], diffusorDichte: 100, diffusorNoppe: 1.5, diffusorDicke: 1 }],
  ['Mehrere Probleme', { ...PRESETS['Woven Light · Panel 120×160'], radiusUnten: 60, radiusOben: 60, drehung: 0.5, webTiefe: 1 }],
  ['Wandspot: Kopf an der Wand, Knick 70°', { ...PRESETS['Wandspot · Korbgeflecht'], spotWandabstand: 5, spotWinkel: 70 }],
  ['Wandspot: Streben ohne Kontakt', { ...PRESETS['Wandspot · Korbgeflecht'], spotHub: 2.4 }],
  ['Wandspot: Brücken zu lang', { ...PRESETS['Wandspot · Korbgeflecht'], spotStreben: 10 }],
  ['Wandspot: Leuchtmittel passt nicht', { ...PRESETS['Wandspot · Korbgeflecht'], spotLampeD: 80, spotLampeL: 95 }],
  ['Wandspot: Schrauben passen nicht', { ...PRESETS['Wandspot · Stäbe + Ringe'], spotPlatteB: 40, spotPlatteH: 25, spotSchraubenAbstand: 30, spotPlatteDicke: 3 }],
  ['Wandspot: Überhang Diagonale', { ...PRESETS['Wandspot · Diagonal'], spotFlechtwinkel: 60, spotForm: 'konisch', spotKegel: 15 }],
  ['Wandspot: Kegel zu spitz, Struktur zu hoch', { ...PRESETS['Wandspot · Gitter'], spotKegel: 30, spotKorbHoehe: 190 }],
];
for (const [label, pr] of broken) {
  const p = { ...DEFAULTS, ...pr }, before = buildLampshade(p);
  A.setState(p, before);
  const q = await runFix('*'), after = buildLampshade(q);
  ok(codes(before).length > 0 && codes(after).length === 0, `${label}: ${codes(before).join(',')} → ${codes(after).join(',') || 'behoben'} (${describeChanges(p, q).length} Wert(e) geändert)`);
}

/* ---------- 4. STL lernen ---------- */
console.log('\n4. Formen aus STL lernen');
for (const name of ['Käfig', 'Woven Light', 'Kissen-Stapel']) {
  const p = { ...DEFAULTS, ...PRESETS[name], straenge: 60, sockel: false, fassungPos: 'oben' };
  const r = buildLampshade(p), L = analyzeSTL(toSTL(r.positions, r.indices, false, r.stats.H), 'z', name + '.stl');
  const surf = makeSurface(p), F = formSampler(L, 0), err = [];
  for (let i = 3; i < 61; i++) for (let j = 0; j < 144; j += 4) { const t = (i + 0.5) / 64, a = 2 * Math.PI * j / 144; err.push(F(a, t) - surf.radiusAt(a, t)); }
  err.sort((a, b) => a - b);
  const p05 = err[Math.floor(err.length * 0.05)], p95 = err[Math.floor(err.length * 0.95)];
  // Gelernt wird die Außenhaut: 0 bis gut 1 mm außerhalb der Mittelfläche der Stränge
  ok(Math.abs(L.H - p.hoehe) < 0.01 && p05 > -0.3 && p95 < 1.6, `${name}: Höhe ${L.H} mm, Abweichung zur Mittelfläche ${p05.toFixed(2)} bis ${p95.toFixed(2)} mm`);
  FORMEN.set(L.id, L);
  const d = buildLampshade({ ...DEFAULTS, ...PRESETS['Korb-Lampe'], grundform: L.id, hoehe: Math.round(L.H), korbStaebe: 24 });
  const c = closed(d.positions, d.indices);
  ok(c.open === 0 && c.vol > 0, `  Korblampe auf der gelernten Form: ${d.stats.tris} Dreiecke, geschlossen`);
}
ok(codes(buildLampshade({ ...DEFAULTS, grundform: 'stl-fehlt' })).includes('formFehlt'), 'Fehlende Form wird gemeldet');

/* ---------- 5. Wandspot ---------- */
console.log('\n5. Wandspot: Netz intern und in der exportierten STL, Maße, Streben, Flechtung, Parameter');
const { meshReport, parseSTL, spotGeom, buildWandspotRaw, SPOT_ZAPFEN, SPOT_KEYS } = A;
const spotP = (name, x = {}) => ({ ...DEFAULTS, ...PRESETS[name], ...x });
const good = c => c.closed && c.openEdges === 0 && c.nonManifold === 0 && c.degenerate === 0 && c.inverted === 0;
// STL schreiben, als Datei-Inhalt wieder einlesen (Dreiecksliste ohne Indizes) und prüfen
const viaSTL = (pos, idx) => { const buf = toSTL(pos, idx, false, 0), tri = parseSTL(buf); return { buf, tri, rep: meshReport(tri, Uint32Array.from({ length: tri.length / 3 }, (_, i) => i)) }; };
const near = (a, b, tol = 0.02) => Math.abs(a - b) <= tol;
const spotNames = Object.keys(PRESETS).filter(n => n.startsWith('Wandspot'));
for (const name of spotNames) {
  const p = spotP(name), r = buildLampshade(p), g = r.spot.g;
  const ih = meshReport(r.positions, r.indices), ib = meshReport(r.base.positions, r.base.indices);
  const eh = viaSTL(r.positions, r.indices), eb = viaSTL(r.base.positions, r.base.indices);
  const rims = g.struct ? 2 : 1;
  // Maße des Kopfes: Tiefe, größter Durchmesser aus dem Profil; Halter: Wandseite auf z = 0, Ausladung bis zum Zapfen
  const headDia = 2 * r.spot.headR, sa = Math.sin(g.alpha), ca = Math.cos(g.alpha);
  const holdTop = Math.max(g.O[2] + SPOT_ZAPFEN * ca + g.rp * sa, g.O[2] + g.ra * sa);
  ok(good(ih) && ih.connected && good(ib) && ib.connected && ih.shells === rims + r.spot.strutCount,
    `${name}: intern Kopf ${ih.shells} Körper (${rims} Ring/Topf + ${r.spot.strutCount} Streben) → ${ih.parts} Teil, Halter ${ib.shells} Körper, alle geschlossen`);
  ok(good(eh.rep) && eh.rep.connected && eh.rep.shells === ih.shells && eh.rep.tris === r.indices.length / 3 && good(eb.rep) && eb.rep.connected && eb.rep.shells === 1,
    `  STL-Datei: Kopf ${eh.rep.tris} Dreiecke, ${eh.rep.shells} Körper, 0 offene/mehrfache Kanten, 0 entartet, verbunden; Halter ${eb.rep.tris} Dreiecke, 1 Körper`);
  ok(near(eh.rep.size[2], g.L) && near(eh.rep.min[2], 0) && near(eh.rep.size[0], headDia, 0.05) && near(eb.rep.min[2], 0) && near(eb.rep.max[2], holdTop, 0.05)
     && eb.rep.size[0] >= (g.round ? 2 * g.hx : 2 * g.hx) - 0.05,
    `  Maße in der STL: Kopf ${eh.rep.size.map(v => v.toFixed(2)).join(' × ')} mm (Tiefe ${g.L}), Halter bis ${eb.rep.max[2].toFixed(2)} mm (erwartet ${holdTop.toFixed(2)})`);
}

// Streben sind echte Körper: ohne Struktur ein einziger Rotationskörper, mit Struktur Topf + Ring + n Streben (+ Reihen)
{
  const base = spotP('Wandspot · Korbgeflecht'), on = buildLampshade(base), off = buildLampshade({ ...base, spotKorb: false });
  const g = on.spot.g, a = viaSTL(on.positions, on.indices).rep, b = viaSTL(off.positions, off.indices).rep;
  ok(b.shells === 1 && a.shells === 2 + g.n + g.rows && on.spot.strutCount === g.n + g.rows && a.volume < b.volume,
    `Korb an/aus in der STL: ${a.shells} Körper (2 + ${g.n} Stäbe + ${g.rows} Flechtreihen) gegen ${b.shells}; Volumen ${(a.volume / 1000).toFixed(1)} gegen ${(b.volume / 1000).toFixed(1)} cm³`);
  // Jeder Stab trägt die Strebenstärke: radiale Ausdehnung eines Stabs = Strebenstärke
  const shellsOf = (pos, idx) => {
    const key = i => `${pos[i * 3].toFixed(4)},${pos[i * 3 + 1].toFixed(4)},${pos[i * 3 + 2].toFixed(4)}`, id = new Map(), par = [];
    const f = x => { while (par[x] !== x) x = par[x] = par[par[x]]; return x; };
    const vid = i => { const k = key(i); if (!id.has(k)) { id.set(k, par.length); par.push(par.length); } return id.get(k); };
    const tv = []; for (let t = 0; t < idx.length; t += 3) { const v = [vid(idx[t]), vid(idx[t + 1]), vid(idx[t + 2])]; tv.push(v); par[f(v[0])] = f(v[1]); par[f(v[1])] = f(v[2]); }
    const m = new Map(); for (let t = 0; t < tv.length; t++) { const k = f(tv[t][0]); if (!m.has(k)) m.set(k, new Set()); for (let e = 0; e < 3; e++) m.get(k).add(idx[t * 3 + e]); }
    return [...m.values()].map(s => [...s].map(i => [pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]]));
  };
  // Über/unter im Netz nachgemessen: Mittellage jeder Flechtreihe an jedem Stab, relativ zur Wandmitte
  const sh = shellsOf(on.positions, on.indices);
  const rowsSh = sh.filter(v => { const zs = v.map(q => q[2]); return Math.max(...zs) - Math.min(...zs) < g.w + 0.5 && Math.max(...v.map(q => Math.hypot(q[0], q[1]))) > g.rmMin; });
  let alt = 0, flips = 0, total = 0, prevSigns = null;
  rowsSh.sort((x, y) => x[0][2] - y[0][2]);
  for (const v of rowsSh) {
    const zc = v.reduce((s, q) => s + q[2], 0) / v.length, signs = [];
    for (let j = 0; j < g.n; j++) {
      const phi = 2 * Math.PI * (j + 0.5) / g.n, sel = v.filter(q => Math.abs(Math.atan2(Math.sin(Math.atan2(q[1], q[0]) - phi), Math.cos(Math.atan2(q[1], q[0]) - phi))) < 0.25 * Math.PI / g.n);
      const off = sel.reduce((s, q) => s + Math.hypot(q[0], q[1]), 0) / sel.length - g.rm(zc);
      signs.push(Math.sign(Math.round(off * 100)));
      if (Math.abs(Math.abs(off) - g.A) < 0.05) total++;
    }
    for (let j = 0; j < g.n; j++) if (signs[j] !== 0 && signs[j] === -signs[(j + 1) % g.n]) alt++;
    if (prevSigns) for (let j = 0; j < g.n; j++) if (signs[j] === -prevSigns[j]) flips++;
    prevSigns = signs;
  }
  ok(rowsSh.length === g.rows && alt === g.rows * g.n && flips === (g.rows - 1) * g.n && total === g.rows * g.n,
    `Korbgeflecht im Netz: ${rowsSh.length} Reihen, an allen ${g.n} Stäben abwechselnd ±${g.A} mm vor/hinter dem Stab, Nachbarreihen gegenläufig`);
  const st = sh.filter(v => { const zs = v.map(q => q[2]); return Math.max(...zs) - Math.min(...zs) > g.Hs; }).filter(v => v.length <= 40);
  const radial = st.map(v => { const rs = v.map(q => Math.hypot(q[0], q[1]) - g.rm(q[2])); return Math.max(...rs) - Math.min(...rs); });
  ok(st.length === g.n && radial.every(x => Math.abs(x * Math.cos(Math.atan(g.slope)) - g.ts) < 0.05),
    `Stäbe im Netz: ${st.length} Stück, radiale Stärke ${radial.length ? (radial[0] * Math.cos(Math.atan(g.slope))).toFixed(2) : '–'} mm (Strebenstärke ${g.ts} mm)`);
}

// Flechtung der Diagonalmuster: an jeder Kreuzung liegt ein Strang genau über dem anderen (gleicher Betrag, Gegenseite)
for (const name of ['Wandspot · Diagonal', 'Wandspot · Kreuzgeflecht']) {
  const r = buildLampshade(spotP(name)), g = r.spot.g, wv = r.spot.weave;
  const opp = wv.every(([a, b]) => near(a, -b, 1e-9) && near(Math.abs(a), g.A, 1e-9));
  // Entlang eines Strangs: Leinwand wechselt an jeder Kreuzung, Köper 2/2 nach je zwei
  const seq = wv.filter(x => x[2] === 0).map(x => Math.sign(x[0])), runs = [];
  for (const s of seq) { if (runs.length && runs[runs.length - 1][0] === s) runs[runs.length - 1][1]++; else runs.push([s, 1]); }
  const inner = runs.slice(1, -1).map(x => x[1]), want = g.muster === 'kreuz' ? 2 : 1;
  ok(wv.length > 2 * g.n && opp && inner.length > 0 && inner.every(x => x === want),
    `${name}: ${wv.length} Kreuzungen, jede über/unter um ±${g.A} mm, entlang des Strangs je ${want} über und ${want} unter`);
}

// Parameter wirken auf die erzeugte Geometrie (gemessen in der STL)
{
  const p = spotP('Wandspot · Korbgeflecht'), base = viaSTL(buildLampshade(p).positions, buildLampshade(p).indices).rep;
  const m = x => { const r = buildLampshade({ ...p, ...x }); return { r, c: viaSTL(r.positions, r.indices).rep }; };
  const d = m({ spotD: 110 }), n = m({ spotStreben: 36 }), t = m({ spotTiefe: 120 }), z = m({ spotForm: 'zylinder' }), w = m({ spotStrebeStaerke: 2.2 });
  ok(near(d.c.size[0] - base.size[0], 20, 0.05) && n.c.shells - base.shells === 8 && near(t.c.size[2], 120)
     && z.r.spot.g.Rb === z.r.spot.g.Rf && base.volume < w.c.volume,
    `Spotkopf Ø +20 mm → Breite +${(d.c.size[0] - base.size[0]).toFixed(2)} mm; 36 statt 28 Stäbe → +${n.c.shells - base.shells} Körper; Tiefe 120 → ${t.c.size[2].toFixed(2)} mm; zylindrisch hinten Ø ${2 * z.r.spot.g.Rb}`);
  const all = ['korb', 'diagonal', 'kreuz', 'gitter', 'ringe'].map(mu => buildLampshade({ ...p, spotMuster: mu }));
  const sig = all.map(r => r.indices.length + ':' + r.positions.reduce((s, v, i) => s + v * (1 + (i % 7)), 0).toFixed(3));
  ok(new Set(sig).size === 5 && all.every(r => good(meshReport(r.positions, r.indices))),
    `Fünf Strukturtypen erzeugen fünf verschiedene, geschlossene Netze (${all.map(r => r.spot.strutCount + ' Streben').join(', ')})`);
  // Halterungswinkel und Ausrichtung bewegen den Kopf: Achse des Kopfes = Knickrichtung
  const k = buildLampshade({ ...p, spotWinkel: 60, spotAusrichtung: 90 }).spot.matrix, ax = [k[8], k[9], k[10]];
  ok(near(ax[0], Math.sin(60 * Math.PI / 180), 1e-9) && near(ax[1], 0, 1e-9) && near(ax[2], Math.cos(60 * Math.PI / 180), 1e-9),
    `Knick 60°, Ausrichtung 90° (rechts): Kopfachse ${ax.map(v => v.toFixed(3)).join(', ')}`);
}

// Cache: gleicher Schlüssel → gleiches Ergebnis; jede Änderung eines Geometriewerts → neue Geometrie
{
  const p = spotP('Wandspot · Korbgeflecht'), r0 = buildLampshade(p), hit = buildLampshade({ ...p }) === r0, changed = [];
  for (const k of SPOT_KEYS) {
    const it = A.ITEMS.find(i => i.k === k);
    let v;
    if (it.type === 'check') v = !p[k]; else if (it.type === 'select') v = it.opts.find(o => o[0] !== p[k])[0];
    else v = p[k] + it.step * (p[k] + it.step * 3 <= it.max ? 3 : -3);
    const r = buildLampshade({ ...p, [k]: v }), fresh = buildWandspotRaw({ ...p, [k]: v });
    if (r === r0 || r.indices.length !== fresh.indices.length || r.positions.some((x, i) => x !== fresh.positions[i]) || r.base.positions.some((x, i) => x !== fresh.base.positions[i])) changed.push(k);
  }
  ok(hit && changed.length === 0, `Cache${changed.length ? ' (veraltet: ' + changed.join(', ') + ')' : ''}: Treffer bei gleichen Werten, ${SPOT_KEYS.length} Geometriewerte im Schlüssel, nach jeder Änderung frische Geometrie`);
}

// Zufällige Werte im ganzen Reglerbereich: Netz bleibt gültig; ohne Kontakt-Warnung auch zusammenhängend
{
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const spotItems = A.ITEMS.filter(i => A.SPOT_KEYS.includes(i.k) && i.k !== 'aufloesung');
  let bad = [], cnt = 0;
  for (let c = 0; c < 60; c++) {
    const p = { ...DEFAULTS, lampentyp: 'wandspot', aufloesung: 60 };
    for (const it of spotItems) p[it.k] = it.type === 'check' ? rnd() < 0.8 : it.type === 'select' ? it.opts[Math.floor(rnd() * it.opts.length)][0]
      : +(Math.round((it.min + rnd() * (it.max - it.min)) / it.step) * it.step).toFixed(4);
    p.spotStreben = Math.min(p.spotStreben, 60); p.spotKorbHoehe = Math.min(p.spotKorbHoehe, 120);
    let r;
    try { r = buildLampshade(p); } catch (e) { bad.push(`#${c}: ${e.message}`); continue; }
    const ih = meshReport(r.positions, r.indices, !codes(r).includes('spotLose')), ib = meshReport(r.base.positions, r.base.indices);
    const lose = codes(r).includes('spotLose');
    if (!good(ih) || !good(ib) || !ib.connected || (!lose && !ih.connected)) bad.push(`#${c}: ${JSON.stringify(Object.fromEntries(spotItems.map(i => [i.k, p[i.k]])))} ${JSON.stringify({ ...ih, min: 0, max: 0 })}`);
    cnt++;
  }
  ok(bad.length === 0, `${cnt} zufällige Wandspots: alle Netze geschlossen, ohne entartete Dreiecke, Halter einteilig, Kopf zusammenhängend` + (bad.length ? '\n' + bad.slice(0, 3).join('\n') : ''));
}

/* ---------- 6. OpenSCAD ---------- */
// OpenSCAD suchen: Umgebungsvariable, portable Version im Projekt (npm run openscad-holen), Standardinstallation, PATH
function findOpenSCAD() {
  const tryRun = exe => { try { execFileSync(exe, ['--version'], { stdio: 'pipe' }); return exe; } catch { return null; } };
  const candidates = [
    process.env.OPENSCAD,
    join(new URL('.openscad/openscad-2021.01/', root).pathname.replace(/^\/([A-Za-z]:)/, '$1'), 'openscad.com'),
    'C:/Program Files/OpenSCAD/openscad.com',
    'C:/Program Files (x86)/OpenSCAD/openscad.com',
    '/Applications/OpenSCAD.app/Contents/MacOS/OpenSCAD',
    'openscad',
  ].filter(Boolean);
  for (const c of candidates) { const r = tryRun(c); if (r) return r; }
  return null;
}
const OS = process.env.OHNE_OPENSCAD ? null : findOpenSCAD();
console.log('\n6. OpenSCAD-Fassung' + (OS ? ` (${OS})` : ' (Vergleich übersprungen: OpenSCAD nicht gefunden, „npm run openscad-holen“ lädt es)'));
const tplHtml = cut('<script type="text/plain" id="scad-vorlage">', '</script><!-- /scad-vorlage -->').replace('<script type="text/plain" id="scad-vorlage">\n', '');
ok(tplHtml === scadFile, 'Eingebettete Vorlage in index.html entspricht makerworld/lampenschirm.scad');
if (OS) {
  const dir = mkdtempSync(join(tmpdir(), 'lampe-'));
  const readAsciiSTL = text => { const v = []; const re = /vertex\s+(\S+)\s+(\S+)\s+(\S+)/g; let m; while ((m = re.exec(text))) v.push(+m[1], +m[2], +m[3]); return new Float64Array(v); };
  const stats = (pos, idx) => {
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity, z0 = Infinity, z1 = -Infinity, vol = 0;
    const n = idx ? idx.length / 3 : pos.length / 9;
    const P = (t, k) => { const i = idx ? idx[t * 3 + k] : t * 3 + k; return [pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]]; };
    for (let t = 0; t < n; t++) {
      const [a, b, c] = [P(t, 0), P(t, 1), P(t, 2)];
      for (const q of [a, b, c]) { x0 = Math.min(x0, q[0]); x1 = Math.max(x1, q[0]); y0 = Math.min(y0, q[1]); y1 = Math.max(y1, q[1]); z0 = Math.min(z0, q[2]); z1 = Math.max(z1, q[2]); }
      vol += (a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0])) / 6;
    }
    return { size: [x1 - x0, y1 - y0, z1 - z0], vol, n };
  };
  const cases = [
    ['Woven Mesh', 'schirm'], ['Käfig', 'schirm'], ['Kissen-Stapel', 'schirm'], ['Kissen-Stapel', 'sockel'],
    ['Strick-Lampe', 'schirm'], ['Korb-Lampe', 'schirm'], ['Woven Light · Mitte gedreht', 'schirm'],
    ['Panel 120×160 · Sockel getrennt', 'schirm'], ['Panel 120×160 · Sockel getrennt', 'sockel'], ['Panel 120×160 · Sockel getrennt', 'diffusor'],
  ];
  // Gelernte Form: Korblampe auf der aus dem Kissen-Stapel gelernten Form (Radiusfeld in der SCAD-Datei)
  const learnedId = [...FORMEN.keys()].pop();
  PRESETS['(gelernte Form)'] = { ...PRESETS['Korb-Lampe'], grundform: learnedId, korbStaebe: 24, formGlaettung: 2, hoehe: 250 };
  cases.push(['(gelernte Form)', 'schirm']);
  for (const [name, teil] of cases) {
    const p = { ...DEFAULTS, ...PRESETS[name], ...(teil === 'schirm' ? { straenge: Math.min(40, PRESETS[name].straenge || 16) } : {}) };
    const r = buildLampshade(p);
    const flip = teil === 'schirm' ? (p.fassung && p.fassungPos === 'oben' && p.druckUmdrehen) : teil === 'sockel';
    const js = teil === 'schirm' ? { pos: r.positions, idx: r.indices } : teil === 'sockel' ? { pos: r.base.positions, idx: r.base.indices } : { pos: r.diffuser.positions, idx: r.diffuser.indices };
    const jsStl = toSTL(js.pos, js.idx, flip, teil === 'schirm' ? r.stats.H + r.stats.lip : r.base ? r.base.height : 0);
    const dv = new DataView(jsStl), nj = dv.getUint32(80, true), jp = new Float64Array(nj * 9);
    for (let i = 0; i < nj; i++) for (let k = 0; k < 9; k++) jp[i * 9 + k] = dv.getFloat32(84 + i * 50 + 12 + k * 4, true);
    const f = join(dir, 'l.scad'), o = join(dir, 'l.stl');
    writeFileSync(f, scadExport(scadFile, p).replace(/^teil = [^;]*;/m, `teil = "${teil}";`));
    const t0 = Date.now();
    execFileSync(OS, ['-o', o, f], { stdio: 'pipe' });
    const sec = (Date.now() - t0) / 1000;
    const a = stats(jp), b = stats(readAsciiSTL(readFileSync(o, 'utf8')));
    const dSize = Math.max(...a.size.map((v, i) => Math.abs(v - b.size[i]))), dVol = Math.abs(a.vol - b.vol) / Math.abs(a.vol);
    ok(dSize < 0.3 && dVol < 0.01 && a.n === b.n, `${name} · ${teil}: Maße ±${dSize.toFixed(2)} mm, Volumen ±${(dVol * 100).toFixed(2)} %, Dreiecke ${a.n}/${b.n}, OpenSCAD ${sec.toFixed(1)} s`);
  }
  // Wandspot: Die Streben sind einzelne Körper, die sich durchdringen. Hier wird die exportierte STL in ihre Körper
  // zerlegt und mit CGAL (OpenSCAD) wirklich vereinigt; erwartet wird genau ein mannigfaltiges Volumen.
  for (const name of ['Wandspot · Korbgeflecht', 'Wandspot · Diagonal', 'Wandspot · Kreuzgeflecht', 'Wandspot · Gitter', 'Wandspot · Stäbe + Ringe']) {
    const r = buildLampshade({ ...DEFAULTS, ...PRESETS[name], aufloesung: 60 });
    const dv = new DataView(toSTL(r.positions, r.indices, false, 0)), nt = dv.getUint32(80, true), tris = [];
    for (let i = 0; i < nt; i++) tris.push([0, 1, 2].map(k => [0, 1, 2].map(d => dv.getFloat32(84 + i * 50 + 12 + k * 12 + d * 4, true))));
    const id = new Map(), par = [], f = x => { while (par[x] !== x) x = par[x] = par[par[x]]; return x; };
    const vid = q => { const k = q.join(','); if (!id.has(k)) { id.set(k, par.length); par.push(par.length); } return id.get(k); };
    const tv = tris.map(t => t.map(vid)); for (const t of tv) { par[f(t[0])] = f(t[1]); par[f(t[1])] = f(t[2]); }
    const groups = new Map(); tv.forEach((t, i) => { const k = f(t[0]); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(tris[i]); });
    let scad = 'union() {\n', j = 0;
    for (const g of groups.values()) {
      const buf = Buffer.alloc(84 + 50 * g.length); buf.writeUInt32LE(g.length, 80);
      g.forEach((t, i) => t.forEach((q, k) => q.forEach((x, d) => buf.writeFloatLE(x, 84 + i * 50 + 12 + k * 12 + d * 4))));
      writeFileSync(join(dir, `k${j}.stl`), buf); scad += ` import("k${j}.stl");\n`; j++;
    }
    writeFileSync(join(dir, 'v.scad'), scad + '}\n');
    const t0 = Date.now(), res = spawnSync(OS, ['--render', '-o', join(dir, 'v.stl'), join(dir, 'v.scad')], { encoding: 'utf8' });
    const log = (res.stdout || '') + (res.stderr || ''), vols = +(log.match(/Volumes:\s+(\d+)/) || [])[1];
    const u = readAsciiSTL(readFileSync(join(dir, 'v.stl'), 'utf8')), rep = meshReport(u, Uint32Array.from({ length: u.length / 3 }, (_, i) => i), false);
    // Maßgeblich ist CGALs exaktes Ergebnis („Simple“ = mannigfaltig). OpenSCAD 2021 schreibt nur 6 Stellen; dabei fallen
    // Schnittkanten unter etwa 0,001 mm (Stellen, an denen sich Streben nur streifen) zusammen. Solche Fehler in der
    // Textdatei sind erlaubt, wenn jedes flache Dreieck eine Kante unter 0,01 mm hat (weit unter der Slicer-Auflösung).
    // Jedes entartete Dreieck und jede mehrfach benutzte Kante der Textdatei muss an einem Dreieck mit einer Kante
    // unter 0,01 mm hängen, sonst ist es ein echter Fehler
    const kk = q => q.map(x => Math.round(x * 1e4)).join(','), edgeTris = new Map();
    let bad = 0;
    for (let i = 0; i < u.length; i += 9) {
      const P = k => [u[i + 3 * k], u[i + 3 * k + 1], u[i + 3 * k + 2]], v3 = [P(0), P(1), P(2)];
      const e = [0, 1, 2].map(k => Math.hypot(...v3[k].map((x, d) => x - v3[(k + 1) % 3][d])));
      const [a, b, c] = v3, ar = Math.hypot((b[1] - a[1]) * (c[2] - a[2]) - (b[2] - a[2]) * (c[1] - a[1]), (b[2] - a[2]) * (c[0] - a[0]) - (b[0] - a[0]) * (c[2] - a[2]), (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]));
      const tiny = Math.min(...e) < 0.01;
      if (ar < 2e-9 && !tiny) bad++;
      for (let k = 0; k < 3; k++) { const s = kk(v3[k]) + '>' + kk(v3[(k + 1) % 3]); if (!edgeTris.has(s)) edgeTris.set(s, []); edgeTris.get(s).push(tiny); }
    }
    for (const t of edgeTris.values()) if (t.length > 1 && !t.some(Boolean)) bad++;
    ok(/Simple:\s+yes/.test(log) && vols === 2 && rep.shells === 1 && rep.openEdges === 0 && bad === 0 && near(rep.size[2], r.spot.g.L) && near(rep.size[0], 2 * r.spot.headR, 0.05),
      `${name} · Spotkopf mit CGAL vereinigt: ${j} Körper → ${vols - 1} mannigfaltiges Volumen, ${rep.shells} Hülle, ${rep.size.map(x => x.toFixed(1)).join(' × ')} mm, ${(rep.volume / 1000).toFixed(1)} cm³, ${((Date.now() - t0) / 1000).toFixed(0)} s`
      + (rep.nonManifold || rep.degenerate ? ` (Text-STL mit 6 Stellen: ${rep.nonManifold} mehrfache Kanten, ${rep.degenerate} entartete Dreiecke, alle an Kanten < 0,01 mm)` : ''));
  }
  rmSync(dir, { recursive: true, force: true });
}

console.log(`\n${oks} bestanden, ${fails} fehlgeschlagen`);
process.exit(fails ? 1 : 0);
