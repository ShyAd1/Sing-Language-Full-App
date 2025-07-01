# Script PowerShell para generar configuración automática de videos organizados por carpetas
# Ejecutar desde la carpeta raíz del proyecto

Write-Host "🎬 Generando configuración de videos organizados..." -ForegroundColor Green

# Verificar y crear directorios si no existen
if (-not (Test-Path "public\letras")) {
    Write-Host "📁 Creando directorio public\letras..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path "public\letras" -Force
}

if (-not (Test-Path "public\numeros")) {
    Write-Host "📁 Creando directorio public\numeros..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path "public\numeros" -Force
}

# Listar archivos MP4 en carpetas organizadas
Write-Host "📁 Videos encontrados:" -ForegroundColor Cyan

Write-Host "  Letras:" -ForegroundColor Cyan
$letrasFiles = Get-ChildItem -Path "public\letras" -Filter "*.mp4" -ErrorAction SilentlyContinue
if ($letrasFiles) {
    foreach ($file in $letrasFiles) {
        Write-Host "    ✅ $($file.Name)" -ForegroundColor Green
    }
} else {
    Write-Host "    ⚠️  No se encontraron videos de letras" -ForegroundColor Yellow
}

Write-Host "  Números:" -ForegroundColor Cyan
$numerosFiles = Get-ChildItem -Path "public\numeros" -Filter "*.mp4" -ErrorAction SilentlyContinue
if ($numerosFiles) {
    foreach ($file in $numerosFiles) {
        Write-Host "    ✅ $($file.Name)" -ForegroundColor Green
    }
} else {
    Write-Host "    ⚠️  No se encontraron videos de números" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📝 Configuración TypeScript sugerida:" -ForegroundColor Cyan
Write-Host ""

# Generar configuración para letras
Write-Host "// Configuración automática para videos del abecedario" -ForegroundColor Gray
Write-Host "abecedario: {" -ForegroundColor White
Write-Host "  videos: [" -ForegroundColor White

$letters = 65..90 | ForEach-Object { [char]$_ }  # A-Z

foreach ($letter in $letters) {
    $lowerLetter = $letter.ToLower()
    $fileName = "${letter}.mp4"
    $filePath = "public\letras\${fileName}"
    
    if (Test-Path $filePath) {
        Write-Host "    { id: '$lowerLetter', title: 'Letra $letter', thumbnail: '$letter', videoUrl: '/letras/$fileName', description: 'Seña para la letra $letter - Video real', videoType: 'mp4', duration: '0:03' }," -ForegroundColor Green
    } else {
        Write-Host "    { id: '$lowerLetter', title: 'Letra $letter', thumbnail: '$letter', videoUrl: '', description: 'Seña para la letra $letter - Video próximamente', videoType: 'local', duration: '0:00' }," -ForegroundColor Yellow
    }
}

Write-Host "  ]" -ForegroundColor White
Write-Host "}," -ForegroundColor White
Write-Host ""

# Generar configuración para números
Write-Host "// Configuración automática para videos de números" -ForegroundColor Gray
Write-Host "numeros: {" -ForegroundColor White
Write-Host "  videos: [" -ForegroundColor White

$numerosNombres = @("Uno", "Dos", "Tres", "Cuatro", "Cinco", "Seis", "Siete", "Ocho", "Nueve")
$numerosEmojis = @("1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣")

for ($i = 1; $i -le 9; $i++) {
    $numeroNombre = $numerosNombres[$i-1]
    $emoji = $numerosEmojis[$i-1]
    $fileName = "${numeroNombre}.mp4"
    $filePath = "public\numeros\${fileName}"
    
    if (Test-Path $filePath) {
        Write-Host "    { id: '$i', title: 'Número $i', thumbnail: '$emoji', videoUrl: '/numeros/$fileName', description: 'Seña para el número $i - Video real', videoType: 'mp4', duration: '0:03' }," -ForegroundColor Green
    } else {
        Write-Host "    { id: '$i', title: 'Número $i', thumbnail: '$emoji', videoUrl: '', description: 'Seña para el número $i - Video próximamente', videoType: 'local', duration: '0:00' }," -ForegroundColor Yellow
    }
}

Write-Host "  ]" -ForegroundColor White
Write-Host "}" -ForegroundColor White
Write-Host ""
Write-Host "✅ Configuración generada. Copia y pega en lesson-detail.ts" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Para agregar más videos:" -ForegroundColor Cyan
Write-Host "   1. Coloca los archivos MP4 en la carpeta public\" -ForegroundColor Gray
Write-Host "   2. Nombra los archivos como: A.mp4, B.mp4, etc." -ForegroundColor Gray
Write-Host "   3. Ejecuta este script nuevamente" -ForegroundColor Gray
Write-Host "   4. Actualiza lesson-detail.ts con la nueva configuración" -ForegroundColor Gray
