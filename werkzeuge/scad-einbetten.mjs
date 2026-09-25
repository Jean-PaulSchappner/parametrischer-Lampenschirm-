// Bettet makerworld/lampenschirm.scad als Vorlage in index.html ein (für den Knopf „OpenSCAD exportieren“).
// Aufruf: node werkzeuge/scad-einbetten.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const scad = readFileSync(new URL('makerworld/lampenschirm.scad', root), 'utf8');
if (scad.includes('</script')) throw new Error('Die SCAD-Datei darf kein „</script“ enthalten.');
const file = new URL('index.html', root);
const html = readFileSync(file, 'utf8');
const start = '<script type="text/plain" id="scad-vorlage">', end = '</script><!-- /scad-vorlage -->';
const a = html.indexOf(start), b = html.indexOf(end);
const block = start + '\n' + scad + end;
const out = a >= 0 && b > a ? html.slice(0, a) + block + html.slice(b + end.length) : html.replace('<script type="importmap">', block + '\n\n<script type="importmap">');
writeFileSync(file, out);
console.log(a >= 0 ? 'SCAD-Vorlage aktualisiert' : 'SCAD-Vorlage eingefügt');
