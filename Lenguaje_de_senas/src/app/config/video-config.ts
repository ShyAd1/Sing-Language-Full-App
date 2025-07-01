// Configuración de URLs de video para la aplicación de Lenguaje de Señas
// Aquí puedes centralizar todas las URLs de tus videos

export const VIDEO_CONFIG = {
  // URLs base para diferentes servicios
  YOUTUBE_EMBED_BASE: 'https://www.youtube.com/embed/',
  VIMEO_EMBED_BASE: 'https://player.vimeo.com/video/',
  LOCAL_VIDEOS_BASE: '/assets/videos/',
  
  // URLs específicas para cada lección
  ABECEDARIO_VIDEOS: {
    a: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    b: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    c: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    d: '/assets/videos/letra-d.mp4',
    e: 'https://vimeo.com/123456789',
    f: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    g: '', // Video próximamente
    h: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    i: 'https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4'
  },
  
  NUMEROS_VIDEOS: {
    0: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    1: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    2: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    3: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    4: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    5: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    6: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    7: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    8: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  
  COLORES_VIDEOS: {
    rojo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    azul: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    verde: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    amarillo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    naranja: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    morado: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rosa: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    negro: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    blanco: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
};

// Función helper para obtener URL de video
export function getVideoUrl(lesson: string, videoId: string): string {
  const config = VIDEO_CONFIG as any;
  const lessonVideos = config[`${lesson.toUpperCase()}_VIDEOS`];
  return lessonVideos ? lessonVideos[videoId] || '' : '';
}

// Tipos de video soportados
export type VideoType = 'youtube' | 'vimeo' | 'mp4' | 'local';

// Función para detectar tipo de video
export function detectVideoType(url: string): VideoType {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  }
  if (url.includes('vimeo.com')) {
    return 'vimeo';
  }
  if (url.toLowerCase().endsWith('.mp4')) {
    return 'mp4';
  }
  if (url.startsWith('/assets/')) {
    return 'local';
  }
  return 'local';
}

// Configuración de duración de videos (en segundos)
export const VIDEO_DURATIONS = {
  ABECEDARIO: {
    a: 150, // 2:30
    b: 105, // 1:45
    c: 135, // 2:15
    d: 90,  // 1:30
    e: 120, // 2:00
    f: 110, // 1:50
    g: 0,   // 0:00
    h: 130, // 2:10
    i: 85   // 1:25
  }
};

// Función para formatear duración
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
