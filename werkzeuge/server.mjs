// Kleiner Webserver ohne Abhängigkeiten, um die App über http://localhost zu öffnen
// (manche Browser-Erweiterungen und Einstellungen erlauben keine file://-Seiten).
// Aufruf: npm start   → http://localhost:8080
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, normalize, extname } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT) || 8080;
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json',
  '.png': 'image/png', '.stl': 'model/stl', '.scad': 'text/plain; charset=utf-8', '.md': 'text/markdown; charset=utf-8' };

createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const file = normalize(join(root, path === '/' ? 'index.html' : path));
  // Nur Dateien im Projekt, keine versteckten Ordner wie .git oder .openscad
  if (!file.startsWith(normalize(root)) || path.split('/').some(seg => seg.startsWith('.'))) { res.writeHead(403).end(); return; }
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' }).end(body);
  } catch { res.writeHead(404).end('Nicht gefunden'); }
}).listen(port, '127.0.0.1', () => console.log(`Lampenschirm Studio: http://localhost:${port}`));
