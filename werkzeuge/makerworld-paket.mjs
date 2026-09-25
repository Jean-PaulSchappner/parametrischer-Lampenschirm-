// Setzt die Voreinstellungen der OpenSCAD-Datei für MakerWorld auf eine Vorlage der App und bettet sie neu ein.
// Aufruf: node werkzeuge/makerworld-paket.mjs ["Name der Vorlage"]
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const root = new URL('../', import.meta.url);
const html = readFileSync(new URL('index.html', root), 'utf8');
const scadUrl = new URL('makerworld/lampenschirm.scad', root);
const cut = (a, b) => { const i = html.indexOf(a), j = html.indexOf(b, i); return html.slice(i, j); };
const A = new Function('let current;\n' + cut('const SCHEMA = [', 'function download(') + '\nreturn { DEFAULTS, PRESETS, scadExport };')();

const name = process.argv[2] || 'Woven Light · Sockel getrennt';
if (!A.PRESETS[name]) throw new Error('Unbekannte Vorlage: ' + name + '\nVorhanden: ' + Object.keys(A.PRESETS).join(', '));
const out = A.scadExport(readFileSync(scadUrl, 'utf8'), { ...A.DEFAULTS, ...A.PRESETS[name] });
writeFileSync(scadUrl, out);
execFileSync(process.execPath, [new URL('werkzeuge/scad-einbetten.mjs', root).pathname.replace(/^\/([A-Za-z]:)/, '$1')], { stdio: 'inherit' });
console.log(`makerworld/lampenschirm.scad: Voreinstellungen = „${name}“`);
