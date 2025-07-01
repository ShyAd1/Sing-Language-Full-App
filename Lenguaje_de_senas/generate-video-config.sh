#!/bin/bash
# Script para generar configuración automática de videos organizados por carpetas
# Ejecutar desde la carpeta raíz del proyecto

echo "🎬 Generando configuración de videos organizados..."

# Crear directorios si no existen
mkdir -p public/letras
mkdir -p public/numeros

# Listar archivos MP4 en carpetas organizadas
echo "📁 Videos encontrados:"
echo "  Letras:"
ls -la public/letras/*.mp4 2>/dev/null | awk '{print "    " $9}' || echo "    No se encontraron videos de letras"
echo "  Números:"
ls -la public/numeros/*.mp4 2>/dev/null | awk '{print "    " $9}' || echo "    No se encontraron videos de números"

echo ""
echo "📝 Configuración TypeScript sugerida:"
echo ""

# Generar configuración para letras
echo "// Configuración automática para videos del abecedario"
echo "abecedario: {"
echo "  videos: ["

for letter in {A..Z}; do
    if [ -f "public/letras/${letter}.mp4" ]; then
        echo "    { id: '${letter,,}', title: 'Letra ${letter}', thumbnail: '${letter}', videoUrl: '/letras/${letter}.mp4', description: 'Seña para la letra ${letter} - Video real', videoType: 'mp4', duration: '0:03' },"
    else
        echo "    { id: '${letter,,}', title: 'Letra ${letter}', thumbnail: '${letter}', videoUrl: '', description: 'Seña para la letra ${letter} - Video próximamente', videoType: 'local', duration: '0:00' },"
    fi
done

echo "  ]"
echo "},"
echo ""

# Generar configuración para números
echo "// Configuración automática para videos de números"
echo "numeros: {"
echo "  videos: ["

# Array de nombres de números en español
declare -a numeros=("Uno" "Dos" "Tres" "Cuatro" "Cinco" "Seis" "Siete" "Ocho" "Nueve")
declare -a emojis=("1️⃣" "2️⃣" "3️⃣" "4️⃣" "5️⃣" "6️⃣" "7️⃣" "8️⃣" "9️⃣")

for i in {1..9}; do
    numero_nombre=${numeros[$((i-1))]}
    emoji=${emojis[$((i-1))]}
    if [ -f "public/numeros/${numero_nombre}.mp4" ]; then
        echo "    { id: '${i}', title: 'Número ${i}', thumbnail: '${emoji}', videoUrl: '/numeros/${numero_nombre}.mp4', description: 'Seña para el número ${i} - Video real', videoType: 'mp4', duration: '0:03' },"
    else
        echo "    { id: '${i}', title: 'Número ${i}', thumbnail: '${emoji}', videoUrl: '', description: 'Seña para el número ${i} - Video próximamente', videoType: 'local', duration: '0:00' },"
    fi
done

echo "  ]"
echo "}"
echo ""
echo "✅ Configuración generada. Copia y pega en lesson-detail.ts"
