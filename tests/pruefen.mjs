// Prüft Lampenschirm Studio ohne Browser: alle Vorlagen, Passungen, Korrekturen, STL-Lernen und die OpenSCAD-Fassung.
// Aufruf:  node tests/pruefen.mjs              (ohne OpenSCAD-Vergleich)
//          OPENSCAD="C:/Pfad/openscad.com" node tests/pruefen.mjs   (mit Vergleich App ↔ OpenSCAD)
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
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
  '\nreturn { SCHEMA, ITEMS, DEFAULTS, PRESETS, FORMEN, buildLampshade, makeSurface, measureOverhang, analyzeSTL, formSampler, toSTL, scadExport, rrectRadius, runFix, describeChanges, setState: (p, c) => { P = p; current = c; } };';
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

/* ---------- 5. OpenSCAD ---------- */
const OS = process.env.OPENSCAD;
console.log('\n5. OpenSCAD-Fassung' + (OS ? '' : ' (übersprungen, OPENSCAD nicht gesetzt)'));
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
  rmSync(dir, { recursive: true, force: true });
}

console.log(`\n${oks} bestanden, ${fails} fehlgeschlagen`);
process.exit(fails ? 1 : 0);
