// Lädt OpenSCAD 2021.01 (portable, Windows) nach .openscad/ im Projekt, damit tests/pruefen.mjs die
// OpenSCAD-Fassung mitprüfen kann. Der Ordner ist von Git ausgeschlossen. Auf Linux/macOS stattdessen
// OpenSCAD über die Paketverwaltung installieren (es wird dann über PATH gefunden).
// Aufruf: npm run openscad-holen
import { existsSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const dir = join(root, '.openscad');
const exe = join(dir, 'openscad-2021.01', 'openscad.com');

if (existsSync(exe)) { console.log('OpenSCAD ist schon vorhanden: ' + exe); process.exit(0); }
if (process.platform !== 'win32') {
  console.log('Bitte OpenSCAD über die Paketverwaltung installieren (z. B. „sudo apt install openscad“ oder „brew install openscad“).');
  process.exit(1);
}
mkdirSync(dir, { recursive: true });
const url = 'https://files.openscad.org/OpenSCAD-2021.01-x86-64.zip', zip = join(dir, 'openscad.zip');
console.log('Lade ' + url + ' …');
const res = await fetch(url);
if (!res.ok) throw new Error('Download fehlgeschlagen: HTTP ' + res.status);
writeFileSync(zip, Buffer.from(await res.arrayBuffer()));
console.log('Entpacke …');
execFileSync('powershell.exe', ['-NoProfile', '-Command', `Expand-Archive -LiteralPath '${zip}' -DestinationPath '${dir}' -Force`], { stdio: 'inherit' });
rmSync(zip, { force: true });
if (!existsSync(exe)) throw new Error('openscad.com wurde nach dem Entpacken nicht gefunden.');
console.log('Fertig: ' + exe);
