#!/usr/bin/env python3
"""
Mapa estático de contacto a partir de teselas de OpenStreetMap, teñido con la paleta CERAMIS.

Uso:
  python3 scripts/make-static-map.py [lat] [lon] [zoom]
  (por defecto, el centro de Palma; cámbialo cuando haya [DOMICILIO])

- Descarga solo las teselas necesarias, una vez, con User-Agent identificado
  (política de uso de tile.openstreetmap.org). No se usa en tiempo de ejecución.
- Datos © OpenStreetMap contributors (ODbL): la web muestra la atribución junto al mapa.
- Salida: src/assets/contact/mapa-palma.webp (1600×900).
"""
import io
import math
import sys
import time
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps

LAT = float(sys.argv[1]) if len(sys.argv) > 1 else 39.5696
LON = float(sys.argv[2]) if len(sys.argv) > 2 else 2.6502
ZOOM = int(sys.argv[3]) if len(sys.argv) > 3 else 15
W, H = 1600, 900
TILE = 256
UA = "CeramisAgencyStaticMap/1.0 (+https://ceramisagency.com)"
OUT = Path(__file__).resolve().parent.parent / "src/assets/contact/mapa-palma.webp"

# Paleta: de tinta (oscuros) a crema (claros)
DARK = (122, 90, 64)  # --c-accent
LIGHT = (243, 236, 223)  # --c-bg
PIN = (30, 28, 25)  # --c-ink
BRASS = (176, 141, 87)


def to_pixels(lat, lon, z):
    n = 2**z * TILE
    x = (lon + 180) / 360 * n
    y = (1 - math.log(math.tan(math.radians(lat)) + 1 / math.cos(math.radians(lat))) / math.pi) / 2 * n
    return x, y


def fetch(z, x, y):
    req = urllib.request.Request(f"https://tile.openstreetmap.org/{z}/{x}/{y}.png", headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=20) as r:
        return Image.open(io.BytesIO(r.read())).convert("RGB")


def main():
    # Render a escala 1:1 de teselas y luego se amplía ×2 (las teselas son de 256 px).
    half_w, half_h = W // 4, H // 4
    cx, cy = to_pixels(LAT, LON, ZOOM)
    x0, y0 = int(cx - half_w), int(cy - half_h)
    canvas = Image.new("RGB", (half_w * 2, half_h * 2))
    for tx in range(x0 // TILE, (x0 + half_w * 2) // TILE + 1):
        for ty in range(y0 // TILE, (y0 + half_h * 2) // TILE + 1):
            canvas.paste(fetch(ZOOM, tx, ty), (tx * TILE - x0, ty * TILE - y0))
            time.sleep(0.2)

    img = canvas.resize((W, H), Image.LANCZOS)
    img = ImageOps.colorize(ImageOps.autocontrast(img.convert("L"), cutoff=1), black=DARK, white=LIGHT)

    # Pin en el centro
    d = ImageDraw.Draw(img)
    px, py = W // 2, H // 2
    d.ellipse((px - 46, py - 46, px + 46, py + 46), fill=(*BRASS,), outline=None)
    d.ellipse((px - 18, py - 18, px + 18, py + 18), fill=PIN)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, "WEBP", quality=80, method=6)
    print("ok", OUT, OUT.stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
