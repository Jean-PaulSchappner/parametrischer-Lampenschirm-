// Parametrischer Lampenschirm – Geflecht, Strick, Korb, gelernte Formen
// Gegenstück zur Web-App „Lampenschirm Studio“ (index.html). Alle Maße in mm, Winkel in Grad.
// Jedes Teil wird als ein einziges Netz ausgegeben (keine Boolesche Vereinigung), damit es schnell rechnet.
// Die Stränge durchdringen sich an den Kreuzungen; Bambu Studio, PrusaSlicer und Cura vereinen das beim Slicen.

/* [Teil] */
// Welches Teil erzeugt wird. „Zusammengebaut“ ist nur zum Ansehen, nicht zum Drucken.
teil = "schirm"; // [schirm:Schirm, sockel:Sockel (kopfüber zum Drucken), diffusor:Diffusor, ansicht:Zusammengebaut (Ansicht)]

/* [Grundform] */
// Parametrisch oder die aus einer STL gelernte Form (nur verfügbar, wenn aus der App exportiert)
grundform = "param"; // [param:Parametrisch, stl:Gelernte Form]
// Größe der gelernten Form in Prozent
formSkala = 100; // [30:1:300]
// Mischung der gelernten mit der parametrischen Form in Prozent
formMix = 0; // [0:1:100]

/* [Form] */
hoehe = 240; // [60:1:400]
radiusUnten = 80; // [20:1:200]
radiusOben = 80; // [20:1:200]
// Wölbung nach außen (positiv) oder innen (negativ)
bauch = -3; // [-80:1:80]
bauchPos = 0.4; // [0.1:0.01:0.9]
rillenForm = "welle"; // [welle:Wellen-Rillen, kissen:Kissen-Etagen]
rillenAmp = 0; // [0:0.5:30]
rillenAnzahl = 4; // [1:1:12]
prallheit = 0.55; // [0:0.01:1]
kanteUnten = 3; // [0:0.5:30]
kanteOben = 10; // [0:0.5:30]

/* [Querschnitt und Drehung] */
querschnitt = 4; // [0:Rund, 3:Dreieck, 4:Viereck, 5:Fünfeck, 6:Sechseck, 8:Achteck]
eckigkeit = 4.2; // [2.2:0.1:16]
// Tiefe im Verhältnis zur Breite
seitenVerhaeltnis = 1; // [0.5:0.01:2]
drehUnten = 0; // [-180:1:180]
drehOben = 0; // [-180:1:180]
// Zusätzliche Verdrehung über die Höhe
verdrehung = 30; // [-180:1:180]
verdrehVerlauf = "lokal"; // [linear:Gleichmäßig, s:S-Kurve, welle:Hin und zurück, lokal:Falte]
verdrehMitte = 0.38; // [0.1:0.01:0.9]
verdrehBreite = 0.2; // [0.05:0.01:0.6]

/* [Muster] */
muster = "geflecht"; // [geflecht:Geflecht gekreuzt, rechts:Spirale rechts, links:Spirale links, strick:Strickmuster, korb:Korbstruktur, keine:Kein Geflecht]
// Geflecht: Stränge je Richtung
straenge = 150; // [3:1:220]
// Geflecht: Umdrehungen der Stränge über die Höhe
drehung = 0.36; // [0:0.01:2.5]
strangBreite = 2; // [0.8:0.1:10]
strangTiefe = 1.2; // [0.6:0.1:6]
webart = "leinwand"; // [leinwand:Leinwand, koeper22:Köper 2/2, koeper21:Köper 2/1]
webTiefe = 0.45; // [0:0.05:3]
wellenAmp = 0; // [0:0.5:20]
wellenFreq = 4; // [1:1:16]
maschen = 110; // [20:1:400]
strickReihe = 2.6; // [1.5:0.1:8]
strickHub = 0.7; // [0:0.05:3]
strickTiefe = 0.9; // [0:0.05:3]
strickHoehe = 2; // [0.8:0.1:6]
korbStaebe = 40; // [8:2:160]
korbStabBreite = 2.4; // [1:0.1:8]
korbStabDicke = 2.2; // [1:0.1:6]
korbReihe = 7; // [2:0.1:20]
korbBand = 5; // [1:0.1:18]
korbVersatz = 1; // [0:0.05:3]
korbFolge = "einfach"; // [einfach:Einfach, doppelt:Doppelt]

/* [Stabilität] */
rippen = 0; // [0:1:48]
zwischenRinge = 0; // [0:1:12]
randHoehe = 2.5; // [0:0.5:20]
randDicke = 2.2; // [1:0.1:10]

/* [Leuchtmittel] */
fassung = true;
fassungPos = "sockel"; // [oben:Speichen oben (Pendelleuchte), unten:Speichen unten, boden:Boden fest im Schirm, sockel:Im Sockel]
einsatz = "fassung"; // [fassung:Lampenfassung, puck:LED-Puck rund, panel:LED-Panel rechteckig]
lochD = 42; // [15:0.5:80]
fassRing = 8; // [2:0.5:20]
speichen = 4; // [2:1:12]
speichenBreite = 5; // [2:0.5:15]
speichenHoehe = 4; // [1.5:0.5:12]
bodenDicke = 2.4; // [1.2:0.1:6]
kragen = 6; // [0:0.5:20]
nasen = 4; // [0:1:6]
puckD = 70; // [30:0.5:180]
panelB = 120; // [20:0.5:240]
panelL = 160; // [20:0.5:240]
panelEcke = 3; // [0:0.5:30]
// Dicke von Panel bzw. Puck
einsatzTiefe = 8; // [0:0.5:25]
falz = 3; // [1:0.5:12]
// Passungsspiel je Seite zwischen Leuchtmittel und Einlass
spiel = 0.2; // [0:0.05:1]

/* [Diffusor] */
diffusor = true;
diffusorForm = "flach"; // [flach:Flache Platte, haube:Haube]
diffusorVersenkt = true;
diffusorDicke = 0.8; // [0.4:0.1:3]
diffusorDichte = 0; // [0:5:100]
diffusorNoppe = 0.6; // [0.2:0.1:2]
diffusorRaster = 3; // [1.5:0.5:8]
diffusorHoehe = 20; // [3:0.5:80]
diffusorWand = 1.2; // [0.8:0.1:3]

/* [Sockel] */
sockel = true;
sockelHoehe = 60; // [20:1:150]
sockelUeberstand = 2; // [0:0.5:20]
sockelWand = 2.4; // [1.2:0.1:6]
sockelDeck = 3.2; // [2.5:0.1:6]
kabelD = 8; // [0:0.5:16]
lippe = 10; // [1.6:0.5:25]

/* [Qualität] */
// Mehr = feiner, aber langsamer
aufloesung = 140; // [40:10:400]
// Schirm mit Speichen oben zum Drucken umdrehen
druckUmdrehen = true;

/* [Hidden] */
formName = "";
formFeld = [];

/* ===================================================================== Hilfsfunktionen */
function clamp(x, a, b) = min(b, max(a, x));
function sq(x) = x * x;
function nrm(v) = let(l = norm(v)) l > 0 ? v / l : v;
function lerp(a, b, f) = a + (b - a) * f;
function tanh_(x) = let(e = exp(2 * x)) (e - 1) / (e + 1);
function wrap(a) = a - 360 * floor((a + 180) / 360);
function rot2(v, a) = [v[0] * cos(a) - v[1] * sin(a), v[0] * sin(a) + v[1] * cos(a)];
function qsort(v) = len(v) <= 1 ? v : let(p = v[floor(len(v) / 2)])
  concat(qsort([for (x = v) if (x < p) x]), [for (x = v) if (x == p) x], qsort([for (x = v) if (x > p) x]));
function merge(ms) = let(n = len(ms), offs = [for (i = 0, o = 0; i < n; o = o + len(ms[i][0]), i = i + 1) o])
  [[for (m = ms) each m[0]], [for (i = [0:1:n - 1]) for (f = ms[i][1]) [for (v = f) v + offs[i]]]];
EMPTY = [[], []];

/* ===================================================================== Profil */
H = hoehe;
res = aufloesung;
function edgeIn(z, r) = r <= 0 ? 0 : let(h = r * sin(35)) z >= h ? 0 : r - sqrt(r * r - sq(h - z));
function bump(t) = t < bauchPos ? sq(sin(90 * t / bauchPos)) : sq(sin(90 * (1 - t) / (1 - bauchPos)));
function rillen(t) = rillenForm == "kissen"
  ? rillenAmp * (pow(abs(sin(180 * rillenAnzahl * t)), 1 - 0.85 * prallheit) - 1)
  : rillenAmp * sin(360 * rillenAnzahl * t);
function modR(t) = bauch * bump(t) + rillen(t) - edgeIn(t * H, kanteUnten) - edgeIn((1 - t) * H, kanteOben);
function Rp(t) = max(8, radiusUnten + (radiusOben - radiusUnten) * t + modR(t));

/* ===================================================================== Querschnitt (Superformel) */
function rho(phi) = querschnitt == 0 ? 1
  : pow(pow(abs(cos(querschnitt * phi / 4)), eckigkeit) + pow(abs(sin(querschnitt * phi / 4)), eckigkeit), -1 / eckigkeit);
function loc(phi) = rho(phi) * [cos(phi), seitenVerhaeltnis * sin(phi)];
KA = 1440;
ARC = [for (k = 0, acc = 0; k <= KA; acc = acc + norm(loc(360 * (k + 1) / KA) - loc(360 * k / KA)), k = k + 1) acc];
TOTAL = ARC[KA];
ARCTAB = [for (k = [0:KA]) [ARC[k] / TOTAL, 360 * k / KA]];
KS = 1024;
// Winkel zu gleichmäßig verteilter Bogenlänge, damit die Stränge auch an den Ecken gleich dicht liegen
PHITAB = [for (k = [0:KS]) lookup(k / KS, ARCTAB)];
// k begrenzen: bei knapp negativem s rundet s - floor(s) auf 1, dann läge k hinter dem Tabellenende
function phiOfS(s) = let(u = (s - floor(s)) * KS, k = min(KS - 1, floor(u)), f = u - k) PHITAB[k] + (PHITAB[k + 1] - PHITAB[k]) * f;
function radiusDirP(b) = norm(loc(atan2(sin(b) / seitenVerhaeltnis, cos(b))));

/* ===================================================================== Gelernte Form */
FT = len(formFeld);
FA = FT > 0 ? len(formFeld[0]) : 0;
LEARN = grundform == "stl" && FT > 1;
function F(phi, t) = let(
    u = (phi / 360 - floor(phi / 360)) * FA, j0 = floor(u) % FA, j1 = (j0 + 1) % FA, fu = u - floor(u),
    v = clamp(t * FT - 0.5, 0, FT - 1), i0 = floor(v), i1 = min(FT - 1, i0 + 1), fv = v - i0,
    a = lerp(formFeld[i0][j0], formFeld[i0][j1], fu), b = lerp(formFeld[i1][j0], formFeld[i1][j1], fu))
  lerp(a, b, fv);
function rPolar(phi, t) = let(rl = formSkala / 100 * F(phi, t) + modR(t)) max(4, rl + (Rp(t) * radiusDirP(phi) - rl) * formMix / 100);

/* ===================================================================== Drehung */
function twf(t) =
  verdrehVerlauf == "s" ? (1 - cos(180 * t)) / 2 :
  verdrehVerlauf == "welle" ? sin(180 * t) :
  verdrehVerlauf == "lokal" ? let(g0 = tanh_(-verdrehMitte / verdrehBreite), g1 = tanh_((1 - verdrehMitte) / verdrehBreite))
    (tanh_((t - verdrehMitte) / verdrehBreite) - g0) / (g1 - g0) : t;
function ends(t) = verdrehVerlauf == "welle" ? (1 - cos(180 * t)) / 2 : twf(t);
function tw(t) = drehUnten + (drehOben - drehUnten) * ends(t) + verdrehung * twf(t);

/* ===================================================================== Mantelfläche */
function S(s, t) = LEARN
  ? let(phi = 360 * s, r = rPolar(phi, t), a = phi + tw(t)) [r * cos(a), r * sin(a), t * H]
  : let(q = rot2(Rp(t) * loc(phiOfS(s)), tw(t))) [q[0], q[1], t * H];
function nS(s, t) = let(e = 1e-4, ds = S(s + e, t) - S(s - e, t), dt = S(s, min(1, t + e)) - S(s, max(0, t - e))) nrm(cross(ds, dt));
function hN(s, t) = let(e = 1e-4, ds = S(s + e, t) - S(s - e, t)) nrm([ds[1], -ds[0], 0]);
// Werte, die nur von der Höhe abhängen: Radius, dessen Ableitung, Drehung, deren Ableitung.
// Für alle Stränge einer Familie gleich, deshalb einmal je Höhe berechnet.
function tInfo(t) = let(e = 1e-4, t0 = max(0, t - e), t1 = min(1, t + e))
  [Rp(t), (Rp(t1) - Rp(t0)) / (t1 - t0), tw(t), (tw(t1) - tw(t0)) / (t1 - t0)];
// Punkt und Flächennormale; parametrisch aus den Ableitungen statt aus vier weiteren Flächenpunkten
function SN(s, t, ti) = LEARN ? [S(s, t), nS(s, t)] : let(
    phi = phiOfS(s), L = loc(phi), dL = loc(phi + 0.01) - loc(phi - 0.01), R = ti[0], a = ti[2],
    p2 = rot2(R * L, a), ds2 = rot2(R * dL, a), dt2 = rot2(ti[1] * L + R * ti[3] * PI / 180 * [-L[1], L[0]], a))
  [[p2[0], p2[1], t * H], nrm(cross([ds2[0], ds2[1], 0], [dt2[0], dt2[1], H]))];
function radiusAt(a, t) = LEARN ? rPolar(a - tw(t), t) : Rp(t) * radiusDirP(a - tw(t));
function Rmean(t) = LEARN ? (let(v = [for (j = [0:47]) rPolar(7.5 * j, t)]) (v * [for (x = v) 1]) / 48) : Rp(t);
PERIM_UNIT = LEARN
  ? (let(pts = [for (j = [0:96]) let(a = 360 * j / 96, r = rPolar(a, 0.5)) [r * cos(a), r * sin(a)]])
      [for (j = 0, acc = 0; j <= 96; acc = acc + (j < 96 ? norm(pts[j + 1] - pts[j]) : 0), j = j + 1) acc][96] / Rmean(0.5))
  : TOTAL;

/* ===================================================================== Welche Teile gebraucht werden */
NEED_SHADE = teil == "schirm" || teil == "ansicht";
NEED_BASE = sockel && (teil == "sockel" || teil == "ansicht");
NEED_DIFF = teil == "diffusor" || teil == "ansicht";

/* ===================================================================== Netze */
SN = [1, 1, -1, -1];
SB = [1, -1, -1, 1];
// Rechteckprofil (Breite w entlang B, Tiefe d entlang N) entlang der Punkte C; Nn = Richtung der Flächennormale
function tubeMesh(C, Nn, w, d, closed) = let(
    m = len(C),
    Fr = [for (i = [0:m - 1]) let(
        a = closed ? C[(i + 1) % m] : C[min(m - 1, i + 1)],
        b = closed ? C[(i - 1 + m) % m] : C[max(0, i - 1)],
        T = nrm(a - b), s = Nn[i], N = nrm(s - T * (s * T))) [N, cross(T, N)]],
    pts = [for (i = [0:m - 1]) for (k = [0:3]) C[i] + Fr[i][0] * SN[k] * d / 2 + Fr[i][1] * SB[k] * w / 2],
    segs = closed ? m : m - 1,
    // Dreiecke wie in der App (gleiche Diagonalen), Reihenfolge im Uhrzeigersinn von außen gesehen
    side = [for (i = [0:segs - 1]) let(i2 = (i + 1) % m) for (k = [0:3]) let(k2 = (k + 1) % 4,
      a = 4 * i + k, b = 4 * i + k2, c = 4 * i2 + k2, e = 4 * i2 + k) each [[b, c, a], [c, e, a]]],
    L = 4 * (m - 1),
    caps = closed ? [] : [[2, 1, 0], [3, 2, 0], [L + 1, L + 2, L], [L + 2, L + 3, L]])
  [pts, concat(side, caps)];

// Geschlossener Ringkörper zwischen zwei Umrissen gleicher Punktzahl (gegen den Uhrzeigersinn)
function ringMesh(outer, inner, zb, zt) = let(
    M = len(outer), zB = function(i) is_list(zb) ? zb[i] : zb,
    pts = concat(
      [for (i = [0:M - 1]) [outer[i][0], outer[i][1], zB(i)]], [for (i = [0:M - 1]) [outer[i][0], outer[i][1], zt]],
      [for (i = [0:M - 1]) [inner[i][0], inner[i][1], zB(i)]], [for (i = [0:M - 1]) [inner[i][0], inner[i][1], zt]]),
    faces = [for (i = [0:M - 1]) let(j = (i + 1) % M) each [
      [M + j, j, i], [M + i, M + j, i],
      [2 * M + j, 3 * M + j, 2 * M + i], [3 * M + j, 3 * M + i, 2 * M + i],
      [3 * M + j, M + j, M + i], [3 * M + i, 3 * M + j, M + i],
      [j, 2 * M + j, i], [2 * M + j, 2 * M + i, i]]])
  [pts, faces];

// Volle Platte mit sternförmigem Umriss um den Mittelpunkt c
function plateMesh(loop, zb, zt, c = [0, 0]) = let(
    M = len(loop),
    pts = concat([[c[0], c[1], zt]], [for (p = loop) [p[0], p[1], zt]], [[c[0], c[1], zb]], [for (p = loop) [p[0], p[1], zb]]),
    B = M + 1,
    faces = concat(
      [for (i = [0:M - 1]) [0, 1 + (i + 1) % M, 1 + i]],
      [for (i = [0:M - 1]) [B, B + 1 + i, B + 1 + (i + 1) % M]],
      [for (i = [0:M - 1]) let(j = (i + 1) % M) each [[1 + j, B + 1 + j, B + 1 + i], [1 + i, 1 + j, B + 1 + i]]]))
  [pts, faces];

/* ===================================================================== Geflecht */
PAT = webart == "koeper22" ? [1, 1, -1, -1] : webart == "koeper21" ? [1, 1, -1] : [1, -1];
PER = len(PAT);
WOVEN = muster == "geflecht" && drehung > 0;
WEAVE = WOVEN && webTiefe > 0;
NSTR = WEAVE ? ceil(straenge / PER) * PER : straenge;
function pat(k) = PAT[((k % PER) + PER) % PER];
function webOff(idx, dir, t) = let(
    kf = 2 * drehung * NSTR * t, k0 = floor(kf), fr = kf - k0,
    v0 = dir > 0 ? pat(k0 + 2 * idx) : -pat(2 * idx - k0),
    v1 = dir > 0 ? pat(k0 + 1 + 2 * idx) : -pat(2 * idx - k0 - 1))
  webTiefe * (v0 + (v1 - v0) * (1 - cos(180 * fr)) / 2);
function strandSegs(dir, weave) = min(1600, max(20, round(res * max(1, abs(dir) * drehung * 1.5)), ceil((weave ? 2 * drehung * NSTR : 0) * 3)));
function tTable(segs) = [for (i = [0:segs]) tInfo(i / segs)];
function strandMesh(s0, idx, dir, weave, w, d, TT) = let(
    segs = len(TT) - 1,
    q = [for (i = [0:segs]) let(
        t = i / segs, s = s0 + dir * drehung * t + wellenAmp / 360 * sin(wellenFreq * 360 * t),
        cn = SN(s, t, TT[i]), off = weave ? webOff(idx, dir, t) : 0) [cn[0] + cn[1] * off, cn[1]]])
  tubeMesh([for (x = q) x[0]], [for (x = q) x[1]], w, d, false);

DIRS = muster == "geflecht" ? (drehung > 0 ? [1, -1] : [1]) : muster == "rechts" ? [1] : muster == "links" ? [-1] : [];
TT_STRAND = NEED_SHADE && len(DIRS) > 0 ? tTable(strandSegs(1, WEAVE)) : [];
TT_RIB = NEED_SHADE ? tTable(strandSegs(0, false)) : [];
STRANDS = !NEED_SHADE ? [] : [for (dir = DIRS) for (i = [0:1:NSTR - 1]) strandMesh(i / NSTR, i, dir, WEAVE, strangBreite, strangTiefe, TT_STRAND)];
RIBS = !NEED_SHADE ? [] : [for (i = [0:1:rippen - 1]) strandMesh((i + 0.5) / rippen, 0, 0, false, strangBreite, strangTiefe, TT_RIB)];

/* ===================================================================== Strickmuster */
KROWS = max(2, round(H / strickReihe));
KDZ = H / KROWS;
KM = round(maschen);
function knitPoint(k, s) = let(
    sg = k % 2 == 1 ? -1 : 1, u = KM * s,
    z = clamp((k + 0.5) * KDZ + sg * strickHub * cos(360 * u), 0, H), t = z / H,
    cn = SN(s, t, tInfo(t)), off = sg * strickTiefe * sin(360 * u)) [cn[0] + cn[1] * off, cn[1]];
KNIT = muster != "strick" || !NEED_SHADE ? [] : [for (k = [0:KROWS - 1]) let(segs = KM * 8, q = [for (i = [0:segs - 1]) knitPoint(k, i / segs)])
  tubeMesh([for (x = q) x[0]], [for (x = q) x[1]], strickHoehe, strangTiefe, true)];

/* ===================================================================== Korbstruktur */
BN = max(2, round(korbStaebe / 2) * 2);
BROWS = max(1, round(H / korbReihe));
BDZ = H / BROWS;
function basketPoint(k, s) = let(
    sg = (korbFolge == "doppelt" ? floor(k / 2) : k) % 2 == 1 ? -1 : 1,
    t = (k + 0.5) * BDZ / H, cn = SN(s, t, BTT[k]), off = sg * korbVersatz * sin(180 * BN * s)) [cn[0] + cn[1] * off, cn[1]];
BTT = [for (k = [0:BROWS - 1]) tInfo((k + 0.5) * BDZ / H)];
BASKET = muster != "korb" || !NEED_SHADE ? [] : concat(
  [for (j = [0:BN - 1]) strandMesh((j + 0.5) / BN, 0, 0, false, korbStabBreite, korbStabDicke, TT_RIB)],
  [for (k = [0:BROWS - 1]) let(segs = BN * 12, q = [for (i = [0:segs - 1]) basketPoint(k, i / segs)])
    tubeMesh([for (x = q) x[0]], [for (x = q) x[1]], korbBand, strangTiefe, true)]);

/* ===================================================================== Ränder */
RINGTHICK = max(strangTiefe + (WEAVE ? 2 * webTiefe : 0) + (muster == "strick" ? 2 * strickTiefe : 0) + (muster == "korb" ? 2 * korbVersatz : 0),
  muster == "korb" ? korbStabDicke : 0);
RIMT = max(randDicke, RINGTHICK);
MOUNT = fassung ? fassungPos : "keine";
function ringAt(t, height, thick) = let(segs = max(128, round(res * 1.5)))
  tubeMesh([for (i = [0:segs - 1]) S(i / segs, t)], [for (i = [0:segs - 1]) hN(i / segs, t)], height, thick, true);
RIMB = MOUNT == "unten" ? max(randHoehe, speichenHoehe) : MOUNT == "boden" ? max(randHoehe, bodenDicke) : randHoehe;
RIMO = MOUNT == "oben" ? max(randHoehe, speichenHoehe) : randHoehe;
RIMS = !NEED_SHADE ? [] : concat(
  RIMB > 0 ? [ringAt(RIMB / 2 / H, RIMB, RIMT)] : [],
  RIMO > 0 ? [ringAt(1 - RIMO / 2 / H, RIMO, RIMT)] : [],
  [for (k = [1:1:zwischenRinge]) ringAt(k / (zwischenRinge + 1), strangBreite, RINGTHICK)]);

/* ===================================================================== Speichen im Schirm */
SPOKES = !NEED_SHADE || !(MOUNT == "oben" || MOUNT == "unten") ? [] : let(
    sh = speichenHoehe, zc = MOUNT == "oben" ? H - sh / 2 : sh / 2, holeR = lochD / 2, rm = holeR + fassRing / 2,
    ring = tubeMesh([for (i = [0:95]) [rm * cos(3.75 * i), rm * sin(3.75 * i), zc]], [for (i = [0:95]) [cos(3.75 * i), sin(3.75 * i), 0]], sh, fassRing, true),
    r0 = holeR + fassRing * 0.6)
  concat([ring], [for (i = [0:speichen - 1]) let(a = 360 * (i + 0.5) / speichen, r1 = radiusAt(a, zc / H), dv = [cos(a), sin(a), 0])
    if (r1 - r0 >= 3) tubeMesh([dv * r0 + [0, 0, zc], dv * r1 + [0, 0, zc]], [[0, 0, 1], [0, 0, 1]], speichenBreite, sh, false)]);

/* ===================================================================== Leuchtmittel-Ausschnitt */
function rrect(hx, hy, rr) = [hx, hy, max(0, min(rr, hx, hy))];
function grow(r, d) = rrect(max(0.5, r[0] + d), max(0.5, r[1] + d), r[2] + d);
function rrR(a, r) = let(hx = r[0], hy = r[1], rr = r[2], c = abs(cos(a)), s = abs(sin(a)),
    t0 = min(c > 1e-9 ? hx / c : 1e9, s > 1e-9 ? hy / s : 1e9), cx = hx - rr, cy = hy - rr)
  (rr > 0 && t0 * c > cx + 1e-9 && t0 * s > cy + 1e-9) ? let(b = c * cx + s * cy) b + sqrt(max(0, b * b - (cx * cx + cy * cy - rr * rr))) : t0;
function rectLoop(r, A, rot = 0) = [for (a = A) rrR(a - rot, r) * [cos(a), sin(a)]];

DT = diffusorDicke; DH = diffusorNoppe; DA = diffusorRaster;
DCOV = clamp(diffusorDichte / 100, 0, 1);
DR = DA * sqrt(DCOV / 3);
DNOPPEN = DCOV > 0 && DCOV < 1;
DMEAN = DT + DCOV * DH;
DDEPTH = !diffusorVersenkt ? 0 : diffusorForm == "haube" ? DT + diffusorHoehe : DT + (DCOV > 0 ? DH : 0);

INBASE = fassung && (fassungPos == "sockel" || fassungPos == "boden");
ROT = drehUnten;
KIND = !INBASE ? "kabel" : einsatz;
EXTRA = diffusor ? DDEPTH : 0;
ITEM = KIND == "puck" ? rrect(puckD / 2, puckD / 2, puckD / 2)
  : KIND == "panel" ? rrect(panelB / 2, panelL / 2, panelEcke)
  : KIND == "fassung" ? rrect(lochD / 2, lochD / 2, lochD / 2)
  : let(r = min(15, Rmean(0) * 0.3)) rrect(r, r, r);
LED = KIND == "puck" || KIND == "panel";
CUT = LED ? grow(ITEM, spiel) : ITEM;
LEDGE = grow(ITEM, -falz);
FRAME = grow(CUT, 2.4);
KRAGEN = grow(CUT, fassRing);
IDEPTH = LED ? einsatzTiefe + EXTRA : 0;

// Abtastwinkel: gleichmäßig plus exakte Ecken und Eckbögen aller Rechtecke, damit keine Sehne eine Ecke abschneidet
function cornerAngles(r) = r[2] > 0
  ? [for (k = [0:24]) let(th = 90 * k / 24) atan2(r[1] - r[2] + r[2] * sin(th), r[0] - r[2] + r[2] * cos(th))]
  : [atan2(r[1], r[0])];
function insertAngles(rects, rot, notch) = let(
    base = [for (i = [0:719]) -180 + 0.5 * i],
    corners = [for (r = rects) for (q = cornerAngles(r)) each [wrap(q + rot), wrap(180 - q + rot), wrap(-q + rot), wrap(q - 180 + rot)]],
    half = 3 / CUT[0] * 180 / PI,
    notches = notch ? [for (k = [0:1:nasen - 1]) let(c = 360 * k / nasen + 45 + rot) for (e = [-half, half]) for (s = [-0.0115, 0.0115]) wrap(c + e + s)] : [],
    all = qsort(concat(base, corners, notches)))
  [for (i = [0:len(all) - 1]) if (i == 0 || all[i] - all[i - 1] > 5.7e-6) all[i]];
NOTCH = KIND == "fassung" && nasen > 0;
ANGS = insertAngles([CUT, LEDGE, FRAME, KRAGEN], ROT, NOTCH);
function notchCut(A) = [for (a = A) let(
    half = 3 / CUT[0] * 180 / PI,
    d = min([for (k = [0:nasen - 1]) let(c = 360 * k / nasen + 45 + ROT) abs(wrap(a - c))]),
    r = CUT[0] + (d < half ? 2.5 : 0)) r * [cos(a), sin(a)]];
LCUT = NOTCH ? notchCut(ANGS) : rectLoop(CUT, ANGS, ROT);
LLEDGE = rectLoop(LEDGE, ANGS, ROT);
LFRAME = rectLoop(FRAME, ANGS, ROT);
LKRAGEN = rectLoop(KRAGEN, ANGS, ROT);

// Umriss der Schirm-Unterkante in Richtung a, um u entlang der waagerechten Normale versetzt
function shadeAt(a, u) = let(
    c = radiusAt(a, 0) * [cos(a), sin(a)], c1 = radiusAt(a + 0.05, 0) * [cos(a + 0.05), sin(a + 0.05)],
    c0 = radiusAt(a - 0.05, 0) * [cos(a - 0.05), sin(a - 0.05)], tg = c1 - c0, n = nrm([tg[1], -tg[0]])) c + n * u;
function shadeLoop(A, u) = [for (a = A) shadeAt(a, u)];

/* ===================================================================== Boden im Schirm */
FLOOR = !NEED_SHADE || MOUNT != "boden" ? [] : let(
    outer = shadeLoop(ANGS, RIMT / 2 - 0.1), T = bodenDicke)
  KIND == "fassung"
    ? concat([ringMesh(outer, LCUT, 0, T)], kragen > 0 ? [ringMesh(LKRAGEN, LCUT, 0, T + kragen)] : [])
    : concat([ringMesh(outer, IDEPTH > 0 ? LLEDGE : LCUT, 0, T)], IDEPTH > 0 ? [ringMesh(LFRAME, LCUT, 0, T + IDEPTH)] : []);

/* ===================================================================== Schirm */
LIP = sockel ? lippe : 0;
LIPBAND = LIP <= 0 || !NEED_SHADE ? [] : let(segs = max(128, round(res * 1.5)))
  [tubeMesh([for (i = [0:segs - 1]) let(c = S(i / segs, 0)) [c[0], c[1], (LIP + 0.5) / 2]], [for (i = [0:segs - 1]) hN(i / segs, 0)], LIP + 0.5, RIMT, true)];
SHADEBODY = merge(concat(STRANDS, RIBS, KNIT, BASKET, RIMS, SPOKES, FLOOR));
SHADE = merge(concat([[[for (p = SHADEBODY[0]) [p[0], p[1], clamp(p[2], 0, H) + LIP]], SHADEBODY[1]]], LIPBAND));

/* ===================================================================== Sockel */
BH = sockelHoehe;
BM = max(240, round(res * 1.8));
function offS(u) = [for (i = [0:BM - 1]) let(s = i / BM, c = S(s, 0), n = hN(s, 0)) [c[0] + n[0] * u, c[1] + n[1] * u]];
BELLY = rillenForm == "kissen" && rillenAmp > 0 ? max([for (k = [0:50]) Rmean(k / 50 / rillenAnzahl) - Rmean(0)]) : 0;
GAP = 0.3;
UOUT = RIMT / 2 + GAP + 1.2 + sockelUeberstand + BELLY;
BASE = !NEED_BASE ? EMPTY : let(
    perim = PERIM_UNIT * Rmean(0),
    zb = [for (i = [0:BM - 1]) let(s0 = i / BM, s = s0 > 0.5 ? s0 - 1 : s0) (kabelD > 0 && abs(s) * perim < kabelD / 2) ? min(kabelD, BH - sockelDeck - 1) : 0],
    wall = ringMesh(offS(UOUT), offS(UOUT - sockelWand), zb, BH),
    outerA = shadeLoop(ANGS, UOUT), grooveO = shadeLoop(ANGS, RIMT / 2 + GAP), grooveI = shadeLoop(ANGS, -RIMT / 2 - GAP),
    zDeck = BH - sockelDeck, floorT = 1.6, zBot = max(0.5, min(zDeck, BH - lippe - floorT)), grooveBottom = max(zBot, BH - lippe),
    wallIn = [for (i = [0:len(ANGS) - 1]) let(q = shadeAt(ANGS[i], -RIMT / 2 - GAP - sockelWand)) norm(q) > norm(LFRAME[i]) ? q : LFRAME[i]],
    depth = min(IDEPTH, BH - 1.6 - 0.5))
  merge(concat(
    [wall, ringMesh(outerA, grooveO, zBot, BH), ringMesh(grooveO, grooveI, zBot, grooveBottom), ringMesh(grooveI, LCUT, zDeck, BH)],
    zBot < zDeck ? [ringMesh(grooveI, wallIn, zBot, BH)] : [],
    IDEPTH > 0 ? [ringMesh(LFRAME, LCUT, BH - depth - 1.6, BH), ringMesh(LCUT, LLEDGE, BH - depth - 1.6, BH - depth)] : []));

/* ===================================================================== Diffusor (Druckrichtung: Deckfläche unten) */
DIFFON = diffusor && LED && (MOUNT == "boden" || (MOUNT == "sockel" && sockel));
DIFF = !DIFFON || !NEED_DIFF ? EMPTY : let(
    haube = diffusorForm == "haube", inner = grow(ITEM, -diffusorWand),
    A = insertAngles([ITEM, inner], 0, false), outer = rectLoop(ITEM, A),
    plateT = DCOV >= 1 ? DT + DH : DT,
    area = haube ? inner : ITEM, rowH = DA * sqrt(3) / 2,
    dots = !DNOPPEN ? [] : [for (row = [-ceil(area[1] / rowH):ceil(area[1] / rowH)]) let(cy = row * rowH, shift = abs(row % 2) == 1 ? DA / 2 : 0)
      for (col = [-ceil(area[0] / DA) - 1:ceil(area[0] / DA) + 1]) let(cx = col * DA + shift)
        if (norm([cx, cy]) + DR + 0.6 <= rrR(atan2(cy, cx), area))
          plateMesh([for (k = [0:5]) [cx + DR * cos(30 + 60 * k), cy + DR * sin(30 + 60 * k)]], plateT - 0.01, DT + DH, [cx, cy])])
  merge(concat([plateMesh(outer, 0, plateT)], dots, haube ? [ringMesh(outer, rectLoop(inner, A), 0, DT + diffusorHoehe)] : []));
DIFFH = diffusorForm == "haube" ? DT + diffusorHoehe : (DNOPPEN ? DT + DH : (DCOV >= 1 ? DT + DH : DT));

/* ===================================================================== Ausgabe */
function moveZ(m, dz) = [[for (p = m[0]) [p[0], p[1], p[2] + dz]], m[1]];
function flipX(m, h) = [[for (p = m[0]) [p[0], -p[1], h - p[2]]], m[1]];
LEDTOP = MOUNT == "boden" ? bodenDicke + max(2, einsatzTiefe) : BH - EXTRA;
DIFFPLACED = !DIFFON ? EMPTY : [[for (p = DIFF[0]) let(q = rot2([p[0], -p[1]], ROT)) [q[0], q[1], LEDTOP + DIFFH - p[2]]], DIFF[1]];
ANSICHT = merge([BASE, moveZ(SHADE, sockel ? BH - LIP : 0), DIFFPLACED]);
SHADEOUT = (MOUNT == "oben" && druckUmdrehen) ? flipX(SHADE, H + LIP) : SHADE;
OUT = teil == "schirm" ? SHADEOUT : teil == "sockel" ? (sockel ? flipX(BASE, BH) : EMPTY) : teil == "diffusor" ? DIFF : ANSICHT;

echo(str("Lampenschirm: ", H, " mm hoch, Grundform ", LEARN ? str("gelernt (", formName, ")") : "parametrisch",
  ", Muster ", muster, ", Teil ", teil, ", ", len(OUT[1]), " Flächen"));
if (LED && INBASE) echo(str("Einlass ", 2 * CUT[0], " x ", 2 * CUT[1], " x ", IDEPTH, " mm, Diffusor ", 2 * ITEM[0], " x ", 2 * ITEM[1], " mm"));
if (grundform == "stl" && !LEARN) echo("WARNUNG: Gelernte Form gewählt, aber keine Formdaten enthalten. Es wird die parametrische Form verwendet.");
if (sockel && BH < max(lippe + 1.6, IDEPTH + 1.6) + 3) echo(str("WARNUNG: Sockel zu niedrig, mindestens ", ceil(max(lippe + 1.6, IDEPTH + 1.6) + 3), " mm."));

if (len(OUT[0]) > 0) polyhedron(points = OUT[0], faces = OUT[1], convexity = 10);
else echo("Dieses Teil gibt es mit den aktuellen Einstellungen nicht (z. B. Sockel oder Diffusor ausgeschaltet).");
