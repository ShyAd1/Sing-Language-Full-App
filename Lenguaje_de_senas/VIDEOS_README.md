# 🎬 CONFIGURACIÓN DE VIDEOS - LENGUAJE DE SEÑAS

Este documento explica cómo agregar y configurar videos reales para la aplicación de Lenguaje de Señas.

## 📁 ESTRUCTURA DE CARPETAS ORGANIZADAS

Los videos están organizados por categorías en el directorio `public/` para mejor organización:

```
public/
├── favicon.png
├── letras/           # Videos del abecedario (A-Z)
│   ├── A.mp4
│   ├── B.mp4
│   ├── C.mp4
│   ├── D.mp4
│   ├── E.mp4
│   ├── F.mp4
│   ├── G.mp4
│   ├── H.mp4
│   ├── I.mp4
│   └── ... (más letras próximamente)
├── numeros/          # Videos de números (1-9)
│   ├── Uno.mp4
│   ├── Dos.mp4
│   ├── Tres.mp4
│   ├── Cuatro.mp4
│   ├── Cinco.mp4
│   ├── Seis.mp4
│   ├── Siete.mp4
│   ├── Ocho.mp4
│   ├── Nueve.mp4
│   └── ... (más números próximamente)
└── colores/          # Videos de colores (próximamente)
    └── ...
```

## 🎯 VIDEOS ACTUALES

### ✅ LETRAS (Abecedario)

Videos disponibles en `/public/letras/`:

- **A.mp4** ✅ - Seña para la letra A
- **B.mp4** ✅ - Seña para la letra B
- **C.mp4** ✅ - Seña para la letra C
- **D.mp4** ✅ - Seña para la letra D
- **E.mp4** ✅ - Seña para la letra E
- **F.mp4** ✅ - Seña para la letra F
- **G.mp4** ✅ - Seña para la letra G
- **H.mp4** ✅ - Seña para la letra H
- **I.mp4** ✅ - Seña para la letra I

### ✅ NÚMEROS

Videos disponibles en `/public/numeros/`:

- **Uno.mp4** ✅ - Seña para el número 1
- **Dos.mp4** ✅ - Seña para el número 2
- **Tres.mp4** ✅ - Seña para el número 3
- **Cuatro.mp4** ✅ - Seña para el número 4
- **Cinco.mp4** ✅ - Seña para el número 5
- **Seis.mp4** ✅ - Seña para el número 6
- **Siete.mp4** ✅ - Seña para el número 7
- **Ocho.mp4** ✅ - Seña para el número 8
- **Nueve.mp4** ✅ - Seña para el número 9

## 🔧 CÓMO AGREGAR NUEVOS VIDEOS

### 1. Agregar archivo de video

Coloca los archivos `.mp4` en la carpeta correspondiente:

```bash
# Para letras del abecedario (J-Z)
public/letras/J.mp4
public/letras/K.mp4
# ... etc.

# Para números adicionales
public/numeros/Diez.mp4
public/numeros/Cero.mp4

# Para otras categorías
public/colores/Rojo.mp4
public/familia/Mama.mp4
```

### 2. Actualizar configuración automáticamente

Los scripts generan automáticamente la configuración TypeScript basada en los archivos encontrados:

#### Usando Bash (Linux/Mac/Git Bash):

```bash
./generate-video-config.sh
```

#### Usando PowerShell (Windows):

```powershell
.\generate-video-config.ps1
```

### 3. Copiar configuración generada

Los scripts generan la configuración TypeScript completa. Copia y pega en `src/app/lesson-detail/lesson-detail.ts`.
├── letra-b.mp4
└── numero-1.mp4

````

3. **Actualiza las URLs:**
```typescript
videoUrl: "/assets/videos/letra-a.mp4";
````

### 6. **Videos de YouTube**

#### **Opción 1: URL de Embed (Recomendada)**

```typescript
videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ";
```

#### **Opción 2: URL Normal (Se convierte automáticamente)**

```typescript
videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
```

### 7. **Métodos Disponibles**

El componente incluye métodos para manejar diferentes tipos de video:

- `isYouTubeUrl(url)` - Detecta si es YouTube
- `isMp4Url(url)` - Detecta si es MP4
- `getSafeUrl(url)` - Hace la URL segura para iframes
- `getYouTubeEmbedUrl(url)` - Convierte URL de YouTube a embed
- `getVideoType(url)` - Detecta el tipo de video automáticamente

### 8. **Personalización de Estilos**

Los videos se adaptan automáticamente al diseño pixel art/cyberpunk:

- **Videos grandes**: En el modal principal
- **Videos inline**: En las preguntas de prueba
- **Responsive**: Se adaptan a diferentes tamaños de pantalla

### 9. **Fallback para Videos Sin URL**

Si un video no tiene URL, se muestra un placeholder con:

- Thumbnail/emoji
- Título del video
- Descripción
- Mensaje "Video próximamente"

### 10. **Ejemplo Completo**

```typescript
// En lesson-detail.ts
videos: [
  {
    id: "hola",
    title: "Saludo: Hola",
    thumbnail: "👋",
    videoUrl: "https://www.youtube.com/embed/ABC123",
    description: "Aprende a decir hola en lengua de señas",
    videoType: "youtube",
    duration: "1:30",
  },
  {
    id: "gracias",
    title: "Expresión: Gracias",
    thumbnail: "🙏",
    videoUrl: "/assets/videos/gracias.mp4",
    description: "Cómo expresar gratitud",
    videoType: "local",
    duration: "2:00",
  },
];
```

### 11. **Tips y Recomendaciones**

- **YouTube**: Usa URLs de embed para mejor rendimiento
- **Videos locales**: Mantén archivos pequeños (máximo 10MB)
- **Nombres de archivo**: Usa nombres descriptivos sin espacios
- **Formato**: MP4 es el más compatible
- **Resolución**: 720p es suficiente para videos educativos
- **Duración**: Videos cortos (1-3 minutos) son más efectivos

### 12. **Troubleshooting**

#### **Video no se reproduce:**

- Verifica que la URL sea correcta
- Asegúrate de que el video sea público (YouTube)
- Revisa la consola del navegador para errores

#### **Video local no se encuentra:**

- Verifica que el archivo esté en `src/assets/videos/`
- Asegúrate de que la ruta comience con `/assets/`
- Revisa que el nombre del archivo sea exacto

#### **YouTube no se embebe:**

- Usa URLs de embed en lugar de URLs de watch
- Verifica que el video permita embedding
- Algunos videos tienen restricciones por región

## 📁 **Videos en Carpeta Public (Actual)**

### **Cómo agregar videos en la carpeta public:**

1. **Coloca tus videos MP4** en la carpeta:

   ```
   Lenguaje_de_senas/public/
   ├── A.mp4        ✅ (Ya disponible)
   ├── B.mp4        ✅ (Ya disponible)
   ├── C.mp4        (Por agregar)
   ├── D.mp4        (Por agregar)
   └── ...
   ```

2. **Actualiza las URLs** usando la ruta directa:

   ```typescript
   videoUrl: "/A.mp4"; // ✅ Correcto para public/A.mp4
   videoUrl: "/B.mp4"; // ✅ Correcto para public/B.mp4
   ```

3. **Convención de nombres sugerida:**
   - Letras: `A.mp4`, `B.mp4`, `C.mp4`, etc.
   - Números: `0.mp4`, `1.mp4`, `2.mp4`, etc.
   - Colores: `rojo.mp4`, `azul.mp4`, etc.
   - Familia: `mama.mp4`, `papa.mp4`, etc.

### **Estado actual de videos:**

- ✅ **A.mp4** - Letra A (Disponible)
- ✅ **B.mp4** - Letra B (Disponible)
- ⏳ **C.mp4 a I.mp4** - Por agregar
- ⏳ **Números** - Por agregar (0.mp4 a 8.mp4)
- ⏳ **Colores** - Por agregar
- ⏳ **Otros** - Por agregar

¡Ahora puedes agregar videos reales a tu aplicación de lengua de señas! 🎬✨
