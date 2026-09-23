# Lampenschirm Studio

Parametrischer Geflecht-Lampenschirm für den 3D-Druck. Die Idee stammt vom „Woven Light Mesh“-Modell auf MakerWorld: gekreuzte Spiralstränge, die abwechselnd über- und untereinander laufen, dazu Ränder und ein Fassungshalter.

## Starten

`index.html` im Browser öffnen (Chrome, Edge oder Firefox). Eine Internetverbindung ist nötig, weil Three.js und die Schriften per CDN geladen werden. Eine Installation ist nicht nötig.

## Parameter

| Gruppe | Was sich einstellen lässt |
|---|---|
| Form | Höhe, Radius unten/oben, Wölbung (bauchig oder tailliert) mit Position, Wellen-Rillen oder gestapelte Kissen-Etagen (Tiefe, Anzahl, Prallheit), Kante oben/unten abrunden (höchstens 35° Neigung) |
| Querschnitt & Verdrehung | Rund oder abgerundetes Drei- bis Achteck, Eckigkeit, Seitenverhältnis (rechteckiger Querschnitt), Verdrehung über die Höhe (gleichmäßig, S-Kurve, hin und zurück oder als Falte auf eine Zone konzentriert, mit Höhe und Breite der Falte) |
| Geflecht | Muster (gekreuzt, Spirale rechts/links, keins), Anzahl der Stränge, Drehung in Umdrehungen, Strangbreite und -stärke, Webart (Leinwand, Köper 2/2, Köper 2/1), Webversatz (über/unter), seitliche Wellen |
| Stabilität | Senkrechte Rippen, Zwischenringe, Höhe und Stärke der Ränder |
| Leuchtmittel & Fassung | Speichen oben oder unten im Schirm, Boden im Schirm (Platte mit Kragen um die Fassung und Aussparungen im Loch) oder im Sockel. Bei Boden und Sockel wahlweise Lampenfassung (E27/E14/GU10 oder eigenes Lochmaß), runder LED-Puck (Durchmesser) oder rechteckiges LED-Panel (Breite, Länge, Eckenradius). Puck und Panel liegen in einer Vertiefung mit Auflagekante; Einlasstiefe = Dicke des Leuchtmittels. Im Schirm: Ringbreite, Anzahl, Breite und Höhe der Speichen |
| Sockel | Hohler Sockel mit Fassungsloch im Deckel, Nut für den Schirmrand und Kabelschlitz; Höhe, Überstand, Wand- und Deckelstärke |
| Export | Farbe der Vorschau, Auflösung, Drehen für den Druck |

Vorlagen: Woven Light (Startzustand, nachgebaut nach dem MakerWorld-Modell: dichtes Leinwandgeflecht, Falte im unteren Drittel, abgerundete Kanten, Boden mit E27-Kragen), Woven Light · Panel 120×160 (gleiche Lampe mit gestrecktem Querschnitt, LED-Panel 120 × 160 mm liegt im Rahmen auf dem Boden), Mesh Tischlampe ( feines Geflecht, abgerundetes Viereck, 40° verdreht, mit Sockel), Kissen-Stapel (vier gestapelte Kissen, LED-Puck im Sockel), Mesh mit LED-Panel, Mesh Kelch, Woven Mesh, Propeller, Diamant, Tulpe, Welle, Käfig, Kugel. „Zufall“ erzeugt Varianten, deren Überhang druckbar bleibt.

„Licht an“ zeigt den Schirm in einem dunklen Raum mit Glühbirne und den Schatten des Musters an der Wand.

Die aktuellen Einstellungen stehen in der Adresszeile. Mit „Link kopieren“ lässt sich ein Entwurf weitergeben. Parameter lassen sich außerdem als JSON speichern und wieder laden.

## Druckhinweise

- Der Export ist eine binäre STL in Millimetern. Die Stränge durchdringen sich an den Kreuzungen. Bambu Studio, PrusaSlicer und Cura vereinen das beim Slicen automatisch.
- Schirm und Sockel sind zwei getrennte Druckteile. Bei „Boden fest im Schirm“ ist es ein Teil, bei „Im Sockel (eigenes Teil, getrennt drucken)“ sind es zwei; die Vorlagen „Woven Light · Sockel getrennt“ und „Panel 120×160 · Sockel getrennt“ sind fertig eingestellt. Der Knopf „Zerlegt“ hebt den Schirm in der Vorschau vom Sockel ab. Im hohlen Sockel ist Platz für Fassungskörper, Treiber und Kabel, das Kabel läuft durch den Schlitz in der Sockelwand.
- Schirm und Sockel werden getrennt exportiert („STL Schirm“, „STL Sockel“). Der Sockel wird kopfüber ausgegeben: Der Deckel liegt auf dem Druckbett, die Wand wächst nach oben, so braucht er keine Stützen.
- Die Mesh-Vorlagen haben über 500.000 Dreiecke. Stränge von 1,5 × 1,1 mm mit 0,4-mm-Düse und eher langsam drucken.
- Mit Fassung oben wird die Datei beim Export umgedreht, damit Speichen und Ring flach auf dem Druckbett liegen.
- Die Anzeige unten links warnt, wenn Stränge steiler als etwa 55° geneigt sind, der Webversatz die Stränge trennt oder die Stränge zu dünn für eine 0,4-mm-Düse sind.
- Die Überhangprüfung misst den Verlauf der Stränge ohne den Webversatz. Der Versatz verschiebt jede Schicht nur um Bruchteile eines Millimeters.
- Webmuster gehen nur rundum auf, wenn die Strangzahl zur Webart passt. Das Programm rundet die Strangzahl deshalb bei Bedarf auf (Leinwand: gerade Zahl, Köper 2/2: Vielfaches von 4, Köper 2/1: Vielfaches von 3).
- Puck- und Panelmaße bekommen automatisch 0,2 mm Spiel je Seite. Durch die Öffnung innerhalb der Auflagekante läuft das Kabel nach unten.
- Das Lochmaß für die Fassung erst mit einem kleinen Probedruck prüfen. Fassungsringe unterscheiden sich je nach Hersteller.
- Nur LED-Leuchtmittel verwenden. PLA wird ab etwa 55 °C weich.
