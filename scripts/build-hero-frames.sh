#!/usr/bin/env bash
# Genera las secuencias de frames del hero de CERAMIS a partir del vídeo fuente.
# Uso: bash scripts/build-hero-frames.sh ruta/al/video.mp4 [carpeta_salida]
# Requiere ffmpeg con libwebp y libx264.
set -euo pipefail
SRC="${1:?Indica el vídeo fuente}"
OUT="${2:-public/hero}"
STEP=2            # 1 de cada 2 frames (30fps -> 15 frames/seg de vídeo)
Q=72              # calidad WebP
# El vídeo trae la marca ✦ abajo a la derecha: delogo la borra en 16:9 (el recorte 4:5 ya la excluye).
# Si el vídeo nuevo no la tiene, deja estas dos variables vacías.
DELOGO_D=",delogo=x=1408:y=708:w=84:h=84"
DELOGO_T=",delogo=x=986:y=496:w=58:h=58"
mkdir -p "$OUT/desktop" "$OUT/tablet" "$OUT/mobile"

# Desktop 16:9 (1600x900)
ffmpeg -v error -y -i "$SRC" -an -vf "select='not(mod(n\,$STEP))',scale=1600:900:flags=lanczos$DELOGO_D" \
  -fps_mode vfr -c:v libwebp -quality $Q -compression_level 6 "$OUT/desktop/f_%04d.webp"
# Tablet 16:9 (1120x630)
ffmpeg -v error -y -i "$SRC" -an -vf "select='not(mod(n\,$STEP))',scale=1120:630:flags=lanczos$DELOGO_T" \
  -fps_mode vfr -c:v libwebp -quality $Q -compression_level 6 "$OUT/tablet/f_%04d.webp"
# Mobile 4:5 recorte central (720x900)
ffmpeg -v error -y -i "$SRC" -an -vf "select='not(mod(n\,$STEP))',crop=ih*4/5:ih:(iw-ih*4/5)/2:0,scale=720:900:flags=lanczos" \
  -fps_mode vfr -c:v libwebp -quality $Q -compression_level 6 "$OUT/mobile/f_%04d.webp"

# Posters (primer frame) en AVIF y WebP para el LCP
ffmpeg -v error -y -i "$SRC" -frames:v 1 -vf "scale=1600:900$DELOGO_D" -c:v libwebp -quality 80 "$OUT/poster-desktop.webp"
ffmpeg -v error -y -i "$SRC" -frames:v 1 -vf "crop=ih*4/5:ih:(iw-ih*4/5)/2:0,scale=720:900" -c:v libwebp -quality 80 "$OUT/poster-mobile.webp"

# MP4 sin audio de respaldo (reduced-motion / fallback), keyframe cada frame para scrub fino
ffmpeg -v error -y -i "$SRC" -an -vf "scale=1600:900$DELOGO_D" -c:v libx264 -preset veryfast -crf 26 -g 30 -pix_fmt yuv420p -movflags +faststart "$OUT/hero-fallback.mp4"

N=$(ls "$OUT/desktop" | wc -l)
echo "{\"frames\": $N, \"pattern\": \"f_%04d.webp\", \"sourceFps\": 30, \"step\": $STEP}" > "$OUT/manifest.json"
echo "OK: $N frames por tamaño"; du -sh "$OUT"/*
