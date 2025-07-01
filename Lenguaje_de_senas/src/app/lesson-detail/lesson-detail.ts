import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
}

interface LessonData {
  id: string;
  name: string;
  icon: string;
  description: string;
  explanation: string;
  videos: VideoItem[];
}

@Component({
  selector: 'app-lesson-detail',
  imports: [CommonModule],
  templateUrl: './lesson-detail.html',
  styleUrl: './lesson-detail.css'
})
export class LessonDetail implements OnInit {
  currentLesson: LessonData | null = null;
  selectedVideo: VideoItem | null = null;
  showVideoModal = false;
  playerName = localStorage.getItem('userEmail') || 'JUGADOR';

  // Datos de las lecciones
  lessonsData: { [key: string]: LessonData } = {
    abecedario: {
      id: 'abecedario',
      name: 'ABECEDARIO',
      icon: '🔤',
      description: 'Aprende las señas del alfabeto',
      explanation: 'En esta lección aprenderás las 27 letras del alfabeto en lengua de señas. Cada letra tiene su propia seña única que se forma con las manos. Practica cada letra hasta que puedas formar palabras completas.',
      videos: [
        { id: 'a', title: 'Letra A', thumbnail: 'A', videoUrl: '', description: 'Seña para la letra A' },
        { id: 'b', title: 'Letra B', thumbnail: 'B', videoUrl: '', description: 'Seña para la letra B' },
        { id: 'c', title: 'Letra C', thumbnail: 'C', videoUrl: '', description: 'Seña para la letra C' },
        { id: 'd', title: 'Letra D', thumbnail: '🇩', videoUrl: '', description: 'Seña para la letra D' },
        { id: 'e', title: 'Letra E', thumbnail: '🇪', videoUrl: '', description: 'Seña para la letra E' },
        { id: 'f', title: 'Letra F', thumbnail: '🇫', videoUrl: '', description: 'Seña para la letra F' },
        { id: 'g', title: 'Letra G', thumbnail: '🇬', videoUrl: '', description: 'Seña para la letra G' },
        { id: 'h', title: 'Letra H', thumbnail: '🇭', videoUrl: '', description: 'Seña para la letra H' },
        { id: 'i', title: 'Letra I', thumbnail: '🇮', videoUrl: '', description: 'Seña para la letra I' }
      ]
    },
    numeros: {
      id: 'numeros',
      name: 'NÚMEROS',
      icon: '🔢',
      description: 'Señas para números del 0 al 10',
      explanation: 'Los números en lengua de señas son fundamentales para la comunicación. Aprenderás a señar del 0 al 9 y cómo combinarlos para formar números más grandes.',
      videos: [
        { id: '0', title: 'Número 0', thumbnail: '0️⃣', videoUrl: '', description: 'Seña para el número 0' },
        { id: '1', title: 'Número 1', thumbnail: '1️⃣', videoUrl: '', description: 'Seña para el número 1' },
        { id: '2', title: 'Número 2', thumbnail: '2️⃣', videoUrl: '', description: 'Seña para el número 2' },
        { id: '3', title: 'Número 3', thumbnail: '3️⃣', videoUrl: '', description: 'Seña para el número 3' },
        { id: '4', title: 'Número 4', thumbnail: '4️⃣', videoUrl: '', description: 'Seña para el número 4' },
        { id: '5', title: 'Número 5', thumbnail: '5️⃣', videoUrl: '', description: 'Seña para el número 5' },
        { id: '6', title: 'Número 6', thumbnail: '6️⃣', videoUrl: '', description: 'Seña para el número 6' },
        { id: '7', title: 'Número 7', thumbnail: '7️⃣', videoUrl: '', description: 'Seña para el número 7' },
        { id: '8', title: 'Número 8', thumbnail: '8️⃣', videoUrl: '', description: 'Seña para el número 8' }
      ]
    },
    colores: {
      id: 'colores',
      name: 'COLORES',
      icon: '🎨',
      description: 'Aprende los colores básicos',
      explanation: 'Los colores son esenciales en la comunicación diaria. En esta lección aprenderás las señas para los colores más comunes y cómo usarlos en conversaciones.',
      videos: [
        { id: 'rojo', title: 'Color Rojo', thumbnail: '🔴', videoUrl: '', description: 'Seña para el color rojo' },
        { id: 'azul', title: 'Color Azul', thumbnail: '🔵', videoUrl: '', description: 'Seña para el color azul' },
        { id: 'verde', title: 'Color Verde', thumbnail: '🟢', videoUrl: '', description: 'Seña para el color verde' },
        { id: 'amarillo', title: 'Color Amarillo', thumbnail: '🟡', videoUrl: '', description: 'Seña para el color amarillo' },
        { id: 'naranja', title: 'Color Naranja', thumbnail: '🟠', videoUrl: '', description: 'Seña para el color naranja' },
        { id: 'morado', title: 'Color Morado', thumbnail: '🟣', videoUrl: '', description: 'Seña para el color morado' },
        { id: 'rosa', title: 'Color Rosa', thumbnail: '🩷', videoUrl: '', description: 'Seña para el color rosa' },
        { id: 'negro', title: 'Color Negro', thumbnail: '⚫', videoUrl: '', description: 'Seña para el color negro' },
        { id: 'blanco', title: 'Color Blanco', thumbnail: '⚪', videoUrl: '', description: 'Seña para el color blanco' }
      ]
    },
    alimentos: {
      id: 'alimentos',
      name: 'ALIMENTOS',
      icon: '🍎',
      description: 'Comidas y bebidas comunes',
      explanation: 'La comida es un tema universal de conversación. Aprende las señas para alimentos básicos que usas todos los días y podrás comunicarte sobre tus comidas favoritas.',
      videos: [
        { id: 'agua', title: 'Agua', thumbnail: '💧', videoUrl: '', description: 'Seña para agua' },
        { id: 'pan', title: 'Pan', thumbnail: '🍞', videoUrl: '', description: 'Seña para pan' },
        { id: 'leche', title: 'Leche', thumbnail: '🥛', videoUrl: '', description: 'Seña para leche' },
        { id: 'manzana', title: 'Manzana', thumbnail: '🍎', videoUrl: '', description: 'Seña para manzana' },
        { id: 'cafe', title: 'Café', thumbnail: '☕', videoUrl: '', description: 'Seña para café' },
        { id: 'pizza', title: 'Pizza', thumbnail: '🍕', videoUrl: '', description: 'Seña para pizza' },
        { id: 'pollo', title: 'Pollo', thumbnail: '🍗', videoUrl: '', description: 'Seña para pollo' },
        { id: 'arroz', title: 'Arroz', thumbnail: '🍚', videoUrl: '', description: 'Seña para arroz' },
        { id: 'huevo', title: 'Huevo', thumbnail: '🥚', videoUrl: '', description: 'Seña para huevo' }
      ]
    },
    pronombres: {
      id: 'pronombres',
      name: 'PRONOMBRES',
      icon: '👤',
      description: 'Yo, tú, él, ella, nosotros',
      explanation: 'Los pronombres son la base de cualquier conversación. Son las palabras que usamos para referirnos a personas sin decir sus nombres. Domina estos conceptos básicos.',
      videos: [
        { id: 'yo', title: 'Yo', thumbnail: '👆', videoUrl: '', description: 'Seña para yo' },
        { id: 'tu', title: 'Tú', thumbnail: '👉', videoUrl: '', description: 'Seña para tú' },
        { id: 'el', title: 'Él', thumbnail: '👨', videoUrl: '', description: 'Seña para él' },
        { id: 'ella', title: 'Ella', thumbnail: '👩', videoUrl: '', description: 'Seña para ella' },
        { id: 'nosotros', title: 'Nosotros', thumbnail: '👥', videoUrl: '', description: 'Seña para nosotros' },
        { id: 'ustedes', title: 'Ustedes', thumbnail: '👫', videoUrl: '', description: 'Seña para ustedes' },
        { id: 'ellos', title: 'Ellos', thumbnail: '👨‍👨‍👦', videoUrl: '', description: 'Seña para ellos' },
        { id: 'ellas', title: 'Ellas', thumbnail: '👩‍👩‍👧', videoUrl: '', description: 'Seña para ellas' },
        { id: 'quien', title: '¿Quién?', thumbnail: '❓', videoUrl: '', description: 'Seña para quién' }
      ]
    },
    familia: {
      id: 'familia',
      name: 'FAMILIA',
      icon: '👨‍👩‍👧‍👦',
      description: 'Miembros de la familia',
      explanation: 'La familia es lo más importante. Aprende a señar los diferentes miembros de tu familia para poder hablar sobre las personas que más quieres.',
      videos: [
        { id: 'mama', title: 'Mamá', thumbnail: '👩', videoUrl: '', description: 'Seña para mamá' },
        { id: 'papa', title: 'Papá', thumbnail: '👨', videoUrl: '', description: 'Seña para papá' },
        { id: 'hijo', title: 'Hijo', thumbnail: '👦', videoUrl: '', description: 'Seña para hijo' },
        { id: 'hija', title: 'Hija', thumbnail: '👧', videoUrl: '', description: 'Seña para hija' },
        { id: 'hermano', title: 'Hermano', thumbnail: '👨‍🦱', videoUrl: '', description: 'Seña para hermano' },
        { id: 'hermana', title: 'Hermana', thumbnail: '👩‍🦱', videoUrl: '', description: 'Seña para hermana' },
        { id: 'abuelo', title: 'Abuelo', thumbnail: '👴', videoUrl: '', description: 'Seña para abuelo' },
        { id: 'abuela', title: 'Abuela', thumbnail: '👵', videoUrl: '', description: 'Seña para abuela' },
        { id: 'bebe', title: 'Bebé', thumbnail: '👶', videoUrl: '', description: 'Seña para bebé' }
      ]
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const lessonId = params['id'];
      this.currentLesson = this.lessonsData[lessonId] || null;

      if (!this.currentLesson) {
        // Si la lección no existe, volver al nivel básico
        this.goBack();
      }
    });
  }

  openVideoModal(video: VideoItem) {
    this.selectedVideo = video;
    this.showVideoModal = true;
    console.log(`🎥 Abriendo video: ${video.title}`);
  }

  closeVideoModal() {
    this.showVideoModal = false;
    this.selectedVideo = null;
  }

  startTest() {
    if (this.currentLesson) {
      alert(`🎯 ¡Iniciando prueba de ${this.currentLesson.name}!\n\n` +
            `Vas a ser evaluado en las señas que acabas de aprender.\n\n` +
            `¡Buena suerte! 💪`);

      // TODO: Navegar al componente de prueba
      console.log(`🧪 Iniciando prueba para: ${this.currentLesson.id}`);
    }
  }

  goBack() {
    this.router.navigate(['/basic-level']);
  }
}
