# MakerWorld-Paket: Parametrischer Lampenschirm

Dieser Ordner enthält alles, was für die Veröffentlichung als parametrisches Modell (OpenSCAD) auf MakerWorld gebraucht wird.

| Datei | Zweck |
|---|---|
| `lampenschirm.scad` | Das parametrische Modell für den MakerWorld Parametric Model Maker. Voreinstellung: Geflecht-Tischlampe mit getrenntem Sockel und E27-Fassung. |
| `bilder/01…06_*.png` | Titel- und Galeriebilder (Renderings aus der App, 1600 × 1200) |
| `BESCHREIBUNG.md` | Diese Datei: Texte für die Modellseite und die Schritte zum Hochladen |

## So wird veröffentlicht

1. Auf makerworld.com anmelden, oben auf „Upload“ und dann „Parametric Model“ (OpenSCAD) wählen.
2. `lampenschirm.scad` hochladen. MakerWorld liest die Regler aus den Kommentaren der Datei; im Vorschaufenster prüfen, dass Schirm, Sockel und Diffusor über den Regler „teil“ erzeugt werden.
3. Die Bilder aus `bilder/` hochladen, `02_woven_light_licht.png` oder `01_woven_light.png` als Titelbild. Sobald eine echte Lampe gedruckt ist, Fotos davon ergänzen: Renderings allein wirken weniger glaubwürdig.
4. Titel, Kurzbeschreibung und Beschreibung aus dem Abschnitt unten übernehmen.
5. Lizenz wählen (Vorschlag: CC BY-NC-SA 4.0 für Privatnutzung mit Namensnennung, oder CC BY 4.0, wenn auch kommerzielle Nutzung erlaubt sein soll).
6. Die Geflecht-Variante ist nach Fotos eines anderen MakerWorld-Modells nachgebaut. Den ursprünglichen Designer in der Beschreibung als Inspiration nennen und prüfen, ob MakerWorld das Modell als Remix verknüpft haben möchte.
7. Veröffentlichen.

Eigene Varianten: In der App (`index.html`) gestalten und mit „OpenSCAD für MakerWorld exportieren“ eine neue `.scad` erzeugen. Deren Voreinstellungen entsprechen dann genau dem Entwurf, auch mit einer aus einer STL gelernten Grundform.

Rechenzeit (gemessen mit OpenSCAD 2021.01 auf einem Windows-PC, Ausgabe als 3MF): Schirm mit 150 Strängen je Richtung 13 s, Sockel 1 s, alles zusammengebaut 13 s. Die Ausgabe als Text-STL ist in OpenSCAD 2021 deutlich langsamer (rund 100 s für den Schirm); MakerWorld erzeugt 3MF.

---

## Texte für die Modellseite

### Titel
Parametrischer Lampenschirm – Geflecht, Strick & Korb (mit Sockel für E27, LED-Puck oder LED-Panel)

### Kurzbeschreibung
Gestalte deinen eigenen Lampenschirm: Form, Querschnitt, Drehung und Muster (gekreuztes Geflecht, Strickmuster oder Korbstruktur) frei einstellen. Mit passendem Sockel für E27/E14/GU10, LED-Puck oder rechteckiges LED-Panel und bündigem Diffusor. Druckt ohne Stützen.

### Beschreibung (Deutsch)

Ein parametrischer Tischlampen-Schirm aus einzelnen Strängen, die sich beim Druck zu einem feinen Geflecht verbinden. Alles lässt sich über die Regler einstellen:

**Form**
- Höhe, Radius unten und oben, Wölbung, Wellen-Rillen oder gestapelte Kissen-Etagen
- Querschnitt rund oder als abgerundetes Drei- bis Achteck, Eckigkeit, Seitenverhältnis
- Unter- und Oberkante einzeln drehen, zusätzliche Verdrehung, auch als Falte in einer Zone

**Muster**
- Gekreuztes Geflecht (Leinwand oder Köper) mit Über-/Unter-Versatz
- Horizontales Strickmuster
- Korbstruktur mit Stäben und Flechtbändern
- Spirale oder senkrechte Rippen

**Licht**
- Sockel als eigenes Teil mit Kabelschlitz; der Schirm steckt mit einer Lippe in einer Nut
- Lampenfassung E27/E14/GU10 mit Aussparungen im Loch, runder LED-Puck oder rechteckiges LED-Panel (z. B. 120 × 160 mm)
- Einlass mit einstellbarem Passungsspiel und Auflagekante
- Diffusor als flache Platte oder Haube, bündig versenkt, Dichte über eine Wabenstruktur einstellbar

**Drucken**
- Teil über den Regler „teil“ wählen: Schirm, Sockel (kommt kopfüber, Deckel auf dem Druckbett) oder Diffusor
- Keine Stützen nötig; die Stränge sind höchstens etwa 55° geneigt
- Empfehlung: 0,4-mm-Düse, 0,2-mm-Schichten, Schirm eher langsam (z. B. 60–80 mm/s Außenwand)
- Diffusor in Weiß oder Natur (PLA/PETG), 100 % Füllung
- Nur LED-Leuchtmittel verwenden; PLA wird ab etwa 55 °C weich

**Maße prüfen**
Panel- und Puckmaße als Nennmaß eintragen, das Spiel (Standard 0,2 mm je Seite) kommt automatisch dazu. Das Lochmaß der Fassung am besten mit einem kleinen Probedruck prüfen.

Erstellt mit „Lampenschirm Studio“, einer Web-App mit 3D-Vorschau, Druckbarkeitsprüfung mit automatischer Korrektur und der Möglichkeit, Grundformen aus eigenen STL-Dateien zu lernen.

### Description (English)

A parametric table-lamp shade made of individual strands that fuse into a fine woven mesh when printed. Everything is adjustable:

- **Shape:** height, bottom/top radius, bulge, ripples or stacked cushion tiers; round or rounded 3- to 8-sided cross-section, aspect ratio; rotate top and bottom edge independently, extra twist or a fold in one zone.
- **Patterns:** crossed weave (plain or twill) with over/under offset, horizontal knit, basket weave with stakes and weavers, spirals or vertical ribs.
- **Light:** separate base with cable slot, the shade plugs in with a lip; E27/E14/GU10 socket, round LED puck or rectangular LED panel (e.g. 120 × 160 mm) with adjustable clearance; flat or hood diffuser, sunk flush, density adjustable via a honeycomb structure.
- **Printing:** choose the part with the "teil" setting (shade, base printed upside down, diffuser). No supports needed. 0.4 mm nozzle, 0.2 mm layers. Diffuser in white or natural at 100 % infill. Use LED bulbs only.

### Tags
Lampenschirm, lampshade, parametric, OpenSCAD, woven, mesh, knit, basket, LED panel, E27, table lamp, Tischlampe, Geflecht
