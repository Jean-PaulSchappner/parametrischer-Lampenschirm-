# Lampenschirm Studio

Web-App zum Gestalten parametrischer Lampenschirme für den 3D-Druck: Geflecht, Strickmuster oder Korbstruktur auf einer frei einstellbaren oder aus einer STL gelernten Form, mit Sockel, Fassung oder LED-Panel und Diffusor. Dazu eine gleichwertige OpenSCAD-Fassung für den Parametric Model Maker von MakerWorld.

## Starten

`index.html` im Browser öffnen (Chrome, Edge oder Firefox). Eine Internetverbindung ist nötig, weil Three.js und die Schriften per CDN geladen werden. Eine Installation ist nicht nötig.

## Ordner

| Pfad | Inhalt |
|---|---|
| `index.html` | Die App (eine Datei, enthält auch die OpenSCAD-Vorlage für den Export) |
| `makerworld/lampenschirm.scad` | Parametrisches OpenSCAD-Modell, gleiches Ergebnis wie die App |
| `makerworld/BESCHREIBUNG.md`, `makerworld/bilder/` | Texte, Bilder und Schritte für die Veröffentlichung auf MakerWorld |
| `tests/pruefen.mjs` | Prüft Vorlagen, Passungen, Korrekturen, STL-Lernen und die OpenSCAD-Fassung |
| `werkzeuge/` | Hilfsskripte für die OpenSCAD-Vorlage |

## Was sich einstellen lässt

| Gruppe | Einstellungen |
|---|---|
| Grundform | Parametrisch oder aus einer hochgeladenen STL gelernt; Größe, Mischung mit der parametrischen Form, Glättung |
| Form | Höhe, Radius unten/oben, Wölbung mit Position, Wellen-Rillen oder gestapelte Kissen-Etagen (Tiefe, Anzahl, Prallheit), Kanten oben/unten abrunden (höchstens 35° Neigung) |
| Querschnitt & Drehung | Rund oder abgerundetes Drei- bis Achteck, Eckigkeit, Seitenverhältnis; Unter- und Oberkante einzeln drehen; zusätzliche Verdrehung (gleichmäßig, S-Kurve, hin und zurück oder als Falte mit Höhe und Breite) |
| Muster | Gekreuztes Geflecht (Leinwand, Köper 2/2, Köper 2/1, Webversatz, seitliche Wellen), Spirale, Strickmuster (Maschen, Reihenabstand, Zickzack, Wölbung, Fadenhöhe), Korbstruktur (Stäbe, Bänder, Versatz, einfach/doppelt), keins |
| Stabilität | Senkrechte Rippen, Zwischenringe, Höhe und Stärke der Ränder |
| Leuchtmittel | Speichen oben/unten im Schirm, Boden fest im Schirm oder im Sockel; Fassung E27/E14/GU10 (mit Kragen und Aussparungen), LED-Puck oder LED-Panel mit Einlasstiefe, Auflagekante und Passungsspiel; Diffusor als Platte oder Haube, bündig versenkt, Dichte über eine Wabenstruktur |
| Sockel | Höhe, Überstand, Wand, Deckel, Kabelschlitz, Einstecktiefe der Schirmlippe (1,6–25 mm) |
| Darstellung & Export | Farbe, Auflösung, Umdrehen für den Druck |

Vorlagen: Woven Light (Start), Woven Light · Panel 120×160, Woven Light · Mitte gedreht, Korb-Lampe, Korb · Panel 120×160 · Sockel, Strick-Lampe, Strick · Panel 120×160 · Sockel, Woven Light · Sockel getrennt, Panel 120×160 · Sockel getrennt, Mesh Tischlampe, Kissen-Stapel, Mesh mit LED-Panel, Mesh Kelch, Woven Mesh, Propeller, Diamant, Tulpe, Welle, Käfig, Kugel. „Zufall“ erzeugt Varianten mit druckbarem Überhang.

„Licht an“ zeigt die Lampe im dunklen Raum mit dem Schattenmuster an der Wand, „Zerlegt“ hebt den Schirm vom Sockel ab.

Die Einstellungen stehen in der Adresszeile („Link kopieren“) und lassen sich als JSON speichern und laden. Eine gelernte Form wird in der JSON-Datei mitgespeichert.

## Formen aus STL lernen

In der Gruppe „Grundform“ eine STL hochladen (Vase, Lampe, Flasche …) und die Hochachse wählen. Die App schneidet das Modell in 64 waagerechte Scheiben und misst in jeder Scheibe in 144 Richtungen den äußersten Punkt der Außenhaut. Richtungen ohne Treffer, etwa durch die Löcher eines Gitters, werden aus den Nachbarn ergänzt. Das Ergebnis ist ein Radiusfeld, das als Grundform dient:

- Alle Muster, Drehungen, Kantenrundungen, Wölbungen, Sockel, Fassungen, Panels und Diffusoren funktionieren darauf.
- „Mischung mit parametrischer Form“ blendet zwischen gelernter und eingestellter Form über und erzeugt so neue Formen.
- Die gelernten Formen bleiben im Browser gespeichert („Formbibliothek“) und lassen sich als Datei sichern und laden.

Geeignet sind Formen, die von der Mitte aus gesehen keine Hinterschneidungen haben (jede Richtung trifft die Außenhaut einmal). Innenteile wie Böden oder Fassungsringe stören nicht, es zählt der äußerste Punkt. Bei Gittermodellen liegt die gelernte Fläche auf der Außenseite der Stränge, also etwa 0,5 bis 1 mm außerhalb ihrer Mitte.

## OpenSCAD und MakerWorld

„OpenSCAD für MakerWorld exportieren“ schreibt den aktuellen Entwurf als `.scad`-Datei: alle Werte als Voreinstellungen der Regler, eine gelernte Form als Radiusfeld. Die Datei läuft ab OpenSCAD 2021.01 und im Parametric Model Maker von MakerWorld. Über den Regler `teil` entstehen Schirm, Sockel (kopfüber) oder Diffusor, `ansicht` zeigt alles zusammengebaut.

Die OpenSCAD-Fassung rechnet genau wie die App: Maße, Volumen und Dreieckszahl stimmen bei allen geprüften Vorlagen überein. Jedes Teil ist ein einzelnes Netz ohne Boolesche Vereinigung. Rechenzeit mit OpenSCAD 2021.01 bei Ausgabe als 3MF: Schirm mit 150 Strängen je Richtung 13 s, Sockel 1 s. Als Text-STL braucht OpenSCAD 2021 deutlich länger (rund 100 s für denselben Schirm).

Veröffentlichen: siehe `makerworld/BESCHREIBUNG.md`. Wurde `makerworld/lampenschirm.scad` geändert, danach `node werkzeuge/scad-einbetten.mjs` ausführen, damit der Export der App dieselbe Vorlage benutzt. `node werkzeuge/makerworld-paket.mjs "Vorlagenname"` setzt die Voreinstellungen der Datei auf eine Vorlage der App.

## Prüfen

```
node tests/pruefen.mjs
OPENSCAD="C:/Pfad/zu/openscad.com" node tests/pruefen.mjs
```

Geprüft werden: alle Vorlagen ohne Warnung und mit geschlossenen Teilen; die Passung von Panel, Puck, Diffusor und Schirmlippe im Netz nachgemessen; alle automatischen Korrekturen; das Lernen aus STL (Genauigkeit gegen die bekannte Form); mit gesetztem `OPENSCAD` zusätzlich der Vergleich App ↔ OpenSCAD für zehn Teile.

## Druckhinweise

- Export als binäre STL in Millimetern. Die Stränge durchdringen sich an den Kreuzungen; Bambu Studio, PrusaSlicer und Cura vereinen das beim Slicen.
- Keine Stützen nötig, solange die Anzeige grün ist. Neben jeder roten Warnung steht „Korrigieren“ (bei mehreren „Alles korrigieren“). Die Korrektur ändert nur die verursachenden Werte, so wenig wie nötig, und prüft danach, dass keine neue Warnung entsteht.
- Überhang: gemessen wird der Verlauf der Stränge ohne den Webversatz, Grenze etwa 55°. Beim Strickmuster zählt die Neigung von Reihe zu Reihe. Kantenrundungen sind auf 35° begrenzt, damit diagonale Stränge darauf druckbar bleiben.
- Webmuster gehen nur rundum auf, wenn die Strangzahl passt; die App rundet sie bei Bedarf auf (Leinwand gerade, Köper 2/2 Vielfaches von 4, Köper 2/1 Vielfaches von 3).
- Strickmuster: Nachbarreihen müssen sich mindestens 0,3 mm überlappen. Korbstruktur: zwischen den Stäben höchstens 15 mm freie Brücke.
- Sockel und Schirm sind getrennte Teile. Der Sockel wird kopfüber ausgegeben (Deckel auf dem Druckbett). Die Schirmlippe steckt mit 0,3 mm Spiel je Seite in der Nut.
- Panel- und Puckmaße als Nennmaß eintragen; der Einlass ist genau um das Passungsspiel größer (Standard 0,2 mm, auch an den Ecken), der Diffusor hat exakt das Nennmaß. Dreht man die Unterkante, drehen Leuchtmittel, Einlass und Diffusor mit.
- Diffusor in Weiß oder Natur (PLA/PETG), 0,6–1,2 mm Grundschicht, 100 % Füllung.
- Das Lochmaß für die Fassung mit einem kleinen Probedruck prüfen; Fassungsringe unterscheiden sich je nach Hersteller.
- Nur LED-Leuchtmittel verwenden. PLA wird ab etwa 55 °C weich.
