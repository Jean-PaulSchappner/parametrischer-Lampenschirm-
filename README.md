# Lampenschirm Studio

Parametrischer Geflecht-Lampenschirm für den 3D-Druck. Die Idee stammt vom „Woven Light Mesh“-Modell auf MakerWorld: gekreuzte Spiralstränge, die abwechselnd über- und untereinander laufen, dazu Ränder und ein Fassungshalter.

## Starten

`index.html` im Browser öffnen (Chrome, Edge oder Firefox). Eine Internetverbindung ist nötig, weil Three.js und die Schriften per CDN geladen werden. Eine Installation ist nicht nötig.

## Parameter

| Gruppe | Was sich einstellen lässt |
|---|---|
| Form | Höhe, Radius unten/oben, Wölbung (bauchig oder tailliert) mit Position, umlaufende Rillen |
| Querschnitt & Verdrehung | Rund oder abgerundetes Drei- bis Achteck, Eckigkeit, Verdrehung über die Höhe (gleichmäßig, S-Kurve, hin und zurück) |
| Geflecht | Muster (gekreuzt, Spirale rechts/links, keins), Anzahl der Stränge, Drehung in Umdrehungen, Strangbreite und -stärke, Webversatz (über/unter), seitliche Wellen |
| Stabilität | Senkrechte Rippen, Zwischenringe, Höhe und Stärke der Ränder |
| Fassung | Halter im Schirm oben oder unten oder im Sockel, E27/E14/GU10 oder eigenes Lochmaß, Ringbreite, Anzahl, Breite und Höhe der Speichen |
| Sockel | Hohler Sockel mit Fassungsloch im Deckel, Nut für den Schirmrand und Kabelschlitz; Höhe, Überstand, Wand- und Deckelstärke |
| Export | Farbe der Vorschau, Auflösung, Drehen für den Druck |

Vorlagen: Mesh Tischlampe (Startzustand: feines Geflecht, abgerundetes Viereck, 40° verdreht, mit Sockel), Mesh Kelch, Woven Mesh, Propeller, Diamant, Tulpe, Welle, Käfig, Kugel. „Zufall“ erzeugt Varianten, deren Überhang druckbar bleibt.

„Licht an“ zeigt den Schirm in einem dunklen Raum mit Glühbirne und den Schatten des Musters an der Wand.

Die aktuellen Einstellungen stehen in der Adresszeile. Mit „Link kopieren“ lässt sich ein Entwurf weitergeben. Parameter lassen sich außerdem als JSON speichern und wieder laden.

## Druckhinweise

- Der Export ist eine binäre STL in Millimetern. Die Stränge durchdringen sich an den Kreuzungen. Bambu Studio, PrusaSlicer und Cura vereinen das beim Slicen automatisch.
- Schirm und Sockel werden getrennt exportiert („STL Schirm“, „STL Sockel“). Der Sockel wird kopfüber ausgegeben: Der Deckel liegt auf dem Druckbett, die Wand wächst nach oben, so braucht er keine Stützen.
- Die Mesh-Vorlagen haben über 500.000 Dreiecke. Stränge von 1,5 × 1,1 mm mit 0,4-mm-Düse und eher langsam drucken.
- Mit Fassung oben wird die Datei beim Export umgedreht, damit Speichen und Ring flach auf dem Druckbett liegen.
- Die Anzeige unten links warnt, wenn Stränge steiler als etwa 55° geneigt sind, der Webversatz die Stränge trennt oder die Stränge zu dünn für eine 0,4-mm-Düse sind.
- Das Lochmaß für die Fassung erst mit einem kleinen Probedruck prüfen. Fassungsringe unterscheiden sich je nach Hersteller.
- Nur LED-Leuchtmittel verwenden. PLA wird ab etwa 55 °C weich.
