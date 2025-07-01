import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressService } from '../services/progress.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  videoType?: 'youtube' | 'vimeo' | 'mp4' | 'local'; // Tipo de video
  duration?: string; // Duración del video (opcional)
}

interface LessonData {
  id: string;
  name: string;
  icon: string;
  description: string;
  explanation: string;
  videos: VideoItem[];
}

interface TestQuestion {
  id: string;
  type: 'gesture' | 'multiple-choice' | 'matching' | 'sequence';
  question: string;
  instruction: string;
  options?: string[];
  correctAnswer?: string | number;
  gestureToDetect?: string;
  expectedIcon?: string;
  referenceVideo?: VideoItem; // Video de referencia para mostrar la seña
  points: number;
}

interface TestSession {
  currentQuestionIndex: number;
  totalQuestions: number;
  score: number;
  maxScore: number;
  isActive: boolean;
  isCompleted: boolean;
  questions: TestQuestion[];
}

@Component({
  selector: 'app-lesson-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './lesson-detail.html',
  styleUrl: './lesson-detail.css'
})
export class LessonDetail implements OnInit, OnDestroy {
  // Hacer Math disponible en el template
  Math = Math;
  
  currentLesson: LessonData | null = null;
  selectedVideo: VideoItem | null = null;
  showVideoModal = false;
  playerName = localStorage.getItem('userEmail') || 'JUGADOR';

  // Sistema de pruebas
  testSession: TestSession | null = null;
  showTestModal = false;
  currentQuestion: TestQuestion | null = null;
  selectedAnswer: string | number | null = null;
  showCameraModal = false;
  cameraStream: MediaStream | null = null;
  gestureDetected = false;
  cameraError = '';
  testFeedback = '';
  isAnswerSubmitted = false;
  showInlineVideo = false; // Controla el video inline en las preguntas
  hasViewedReferenceVideo = false; // Controla si el usuario ha visto el video de referencia

  // Datos de las lecciones
  lessonsData: { [key: string]: LessonData } = {
    abecedario: {
      id: 'abecedario',
      name: 'ABECEDARIO',
      icon: '🔤',
      description: 'Aprende las señas del alfabeto',
      explanation: 'En esta lección aprenderás las 27 letras del alfabeto en lengua de señas. Cada letra tiene su propia seña única que se forma con las manos. Practica cada letra hasta que puedas formar palabras completas.',
      videos: [
        { 
          id: 'a', 
          title: 'Letra A', 
          thumbnail: 'A', 
          videoUrl: '/letras/A.mp4', 
          description: 'Seña para la letra A - Video real',
          videoType: 'mp4',
          duration: '0:03'
        },
        { 
          id: 'b', 
          title: 'Letra B', 
          thumbnail: 'B', 
          videoUrl: '/letras/B.mp4', 
          description: 'Seña para la letra B - Video real',
          videoType: 'mp4',
          duration: '0:03'
        },
        { 
          id: 'c', 
          title: 'Letra C', 
          thumbnail: 'C', 
          videoUrl: '/letras/C.mp4', 
          description: 'Seña para la letra C - Video real',
          videoType: 'mp4',
          duration: '0:03'
        },
        { 
          id: 'd', 
          title: 'Letra D', 
          thumbnail: 'D', 
          videoUrl: '/letras/D.mp4', 
          description: 'Seña para la letra D - Video real',
          videoType: 'mp4',
          duration: '0:03'
        },
        { 
          id: 'e', 
          title: 'Letra E', 
          thumbnail: 'E', 
          videoUrl: '/letras/E.mp4', 
          description: 'Seña para la letra E - Video real',
          videoType: 'mp4',
          duration: '0:03'
        },
        { 
          id: 'f', 
          title: 'Letra F', 
          thumbnail: 'F', 
          videoUrl: '/letras/F.mp4', 
          description: 'Seña para la letra F - Video real',
          videoType: 'mp4',
          duration: '0:03'
        },
        { 
          id: 'g', 
          title: 'Letra G', 
          thumbnail: 'G', 
          videoUrl: '/letras/G.mp4', 
          description: 'Seña para la letra G - Video real',
          videoType: 'mp4',
          duration: '0:03'
        },
        { 
          id: 'h', 
          title: 'Letra H', 
          thumbnail: 'H', 
          videoUrl: '/letras/H.mp4', 
          description: 'Seña para la letra H - Video real',
          videoType: 'mp4',
          duration: '0:03'
        },
        { 
          id: 'i', 
          title: 'Letra I', 
          thumbnail: 'I', 
          videoUrl: '/letras/I.mp4', 
          description: 'Seña para la letra I - Video real',
          videoType: 'mp4',
          duration: '0:03'
        }
      ]
    },
    numeros: {
      id: 'numeros',
      name: 'NÚMEROS',
      icon: '🔢',
      description: 'Señas para números del 1 al 9',
      explanation: 'Los números en lengua de señas son fundamentales para la comunicación. Aprenderás a señar del 1 al 9 y cómo combinarlos para formar números más grandes.',
      videos: [
        { 
          id: '1', 
          title: 'Número 1', 
          thumbnail: '1️⃣', 
          videoUrl: '/numeros/Uno.mp4', 
          description: 'Seña para el número 1 - Video real',
          videoType: 'mp4',
          duration: '0:03'
        },
        { 
          id: '2', 
          title: 'Número 2', 
          thumbnail: '2️⃣', 
          videoUrl: '/numeros/Dos.mp4', 
          description: 'Seña para el número 2 - Video real',
          videoType: 'mp4',
          duration: '0:03'
        },
        { 
          id: '3', 
          title: 'Número 3', 
          thumbnail: '3️⃣', 
          videoUrl: '/numeros/Tres.mp4', 
          description: 'Seña para el número 3 - Video real',
          videoType: 'mp4',
          duration: '0:03'
        },
        { 
          id: '4', 
          title: 'Número 4', 
          thumbnail: '4️⃣', 
          videoUrl: '/numeros/Cuatro.mp4', 
          description: 'Seña para el número 4 - Video real',
          videoType: 'mp4',
          duration: '0:03'
        },
        { 
          id: '5', 
          title: 'Número 5', 
          thumbnail: '5️⃣', 
          videoUrl: '/numeros/Cinco.mp4', 
          description: 'Seña para el número 5 - Video real',
          videoType: 'mp4',
          duration: '0:03'
        },
        { 
          id: '6', 
          title: 'Número 6', 
          thumbnail: '6️⃣', 
          videoUrl: '/numeros/Seis.mp4', 
          description: 'Seña para el número 6 - Video real',
          videoType: 'mp4',
          duration: '0:03'
        },
        { 
          id: '7', 
          title: 'Número 7', 
          thumbnail: '7️⃣', 
          videoUrl: '/numeros/Siete.mp4', 
          description: 'Seña para el número 7 - Video real',
          videoType: 'mp4',
          duration: '0:03'
        },
        { 
          id: '8', 
          title: 'Número 8', 
          thumbnail: '8️⃣', 
          videoUrl: '/numeros/Ocho.mp4', 
          description: 'Seña para el número 8 - Video real',
          videoType: 'mp4',
          duration: '0:03'
        },
        { 
          id: '9', 
          title: 'Número 9', 
          thumbnail: '9️⃣', 
          videoUrl: '/numeros/Nueve.mp4', 
          description: 'Seña para el número 9 - Video real',
          videoType: 'mp4',
          duration: '0:03'
        }
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
        { id: 'rosa', title: 'Color Rosa', thumbnail: '', videoUrl: '', description: 'Seña para el color rosa' },
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
    private router: Router,
    private progressService: ProgressService,
    private sanitizer: DomSanitizer
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
      console.log(`🧪 Iniciando prueba para: ${this.currentLesson.id}`);
      this.generateTestQuestions();
      this.showTestModal = true;
      this.startTestSession();
    }
  }

  // Generar preguntas de prueba basadas en la lección
  generateTestQuestions() {
    if (!this.currentLesson) return;

    const questions: TestQuestion[] = [];
    const videos = this.currentLesson.videos;

    // Generar diferentes tipos de preguntas
    for (let i = 0; i < Math.min(videos.length, 6); i++) {
      const video = videos[i];
      
      if (i % 3 === 0) {
        // Pregunta de detección de gesto
        questions.push({
          id: `gesture_${i}`,
          type: 'gesture',
          question: `Realiza la seña para: ${video.title}`,
          instruction: 'Colócate frente a la cámara y realiza la seña correctamente',
          gestureToDetect: video.id,
          expectedIcon: video.thumbnail,
          points: 20
        });
      } else if (i % 3 === 1) {
        // Pregunta de opción múltiple
        const wrongOptions = this.getRandomWrongOptions(video, videos);
        questions.push({
          id: `multiple_${i}`,
          type: 'multiple-choice',
          question: `Observa el video y selecciona la seña correcta`,
          instruction: 'Mira el video de referencia y elige la opción que corresponde',
          options: [video.thumbnail, ...wrongOptions].sort(() => Math.random() - 0.5),
          correctAnswer: video.thumbnail,
          referenceVideo: video, // Agregar el video de referencia
          points: 10
        });
      } else {
        // Pregunta de secuencia o matching
        questions.push({
          id: `matching_${i}`,
          type: 'matching',
          question: `Observa el video y selecciona su significado`,
          instruction: 'Mira el video de referencia y elige el significado correcto',
          options: [video.title, ...this.getRandomWrongTitles(video, videos)].sort(() => Math.random() - 0.5),
          correctAnswer: video.title,
          referenceVideo: video, // Agregar el video de referencia
          points: 15
        });
      }
    }

    this.testSession = {
      currentQuestionIndex: 0,
      totalQuestions: questions.length,
      score: 0,
      maxScore: questions.reduce((sum, q) => sum + q.points, 0),
      isActive: true,
      isCompleted: false,
      questions: questions
    };
  }

  // Obtener opciones incorrectas aleatorias
  getRandomWrongOptions(correctVideo: VideoItem, allVideos: VideoItem[]): string[] {
    const wrongOptions = allVideos
      .filter(v => v.id !== correctVideo.id)
      .map(v => v.thumbnail)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return wrongOptions;
  }

  getRandomWrongTitles(correctVideo: VideoItem, allVideos: VideoItem[]): string[] {
    const wrongTitles = allVideos
      .filter(v => v.id !== correctVideo.id)
      .map(v => v.title)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return wrongTitles;
  }

  // Iniciar sesión de prueba
  startTestSession() {
    if (this.testSession && this.testSession.questions.length > 0) {
      this.currentQuestion = this.testSession.questions[0];
      this.selectedAnswer = null;
      this.isAnswerSubmitted = false;
      this.testFeedback = '';
      this.hasViewedReferenceVideo = false;
      
      // Auto-mostrar video de referencia para preguntas de opción múltiple y matching
      this.autoShowReferenceVideo();
    }
  }

  // Seleccionar respuesta en preguntas de opción múltiple
  selectAnswer(answer: string | number) {
    // Para preguntas de opción múltiple y matching, requerir que se haya visto el video
    if (this.currentQuestion && 
        (this.currentQuestion.type === 'multiple-choice' || this.currentQuestion.type === 'matching') &&
        this.currentQuestion.referenceVideo && 
        !this.hasViewedReferenceVideo) {
      console.log('⚠️ Debes ver el video de referencia antes de responder');
      return;
    }
    
    this.selectedAnswer = answer;
  }

  // Enviar respuesta actual
  submitAnswer() {
    if (!this.testSession || !this.currentQuestion) return;

    this.isAnswerSubmitted = true;
    let isCorrect = false;

    if (this.currentQuestion.type === 'multiple-choice' || this.currentQuestion.type === 'matching') {
      isCorrect = this.selectedAnswer === this.currentQuestion.correctAnswer;
    } else if (this.currentQuestion.type === 'gesture') {
      isCorrect = this.gestureDetected; // Simulado por ahora
    }

    if (isCorrect) {
      this.testSession.score += this.currentQuestion.points;
      this.testFeedback = '✅ ¡Correcto! Excelente trabajo';
    } else {
      this.testFeedback = '❌ Incorrecto. La respuesta correcta era: ' + this.currentQuestion.correctAnswer;
    }

    // Avanzar a la siguiente pregunta después de 2 segundos
    setTimeout(() => {
      this.nextQuestion();
    }, 2000);
  }

  // Avanzar a la siguiente pregunta
  nextQuestion() {
    if (!this.testSession) return;

    // Cerrar video inline antes de cambiar de pregunta
    this.showInlineVideo = false;

    this.testSession.currentQuestionIndex++;
    
    if (this.testSession.currentQuestionIndex >= this.testSession.totalQuestions) {
      this.completeTest();
    } else {
      this.currentQuestion = this.testSession.questions[this.testSession.currentQuestionIndex];
      this.selectedAnswer = null;
      this.isAnswerSubmitted = false;
      this.testFeedback = '';
      this.gestureDetected = false;
      this.hasViewedReferenceVideo = false;
      
      // Auto-mostrar video de referencia para preguntas de opción múltiple y matching
      this.autoShowReferenceVideo();
      
      console.log(`🔄 Avanzando a pregunta ${this.testSession.currentQuestionIndex + 1} de ${this.testSession.totalQuestions}`);
    }
  }

  // Completar la prueba
  completeTest() {
    if (!this.testSession) return;

    this.testSession.isCompleted = true;
    this.testSession.isActive = false;
    
    const percentage = (this.testSession.score / this.testSession.maxScore) * 100;
    let message = '';

    if (percentage >= 80) {
      message = '🏆 ¡Excelente! Has dominado esta lección';
    } else if (percentage >= 60) {
      message = '👍 ¡Bien hecho! Sigue practicando';
    } else {
      message = '💪 Necesitas más práctica. ¡No te rindas!';
    }

    this.testFeedback = `${message}\n\nPuntuación: ${this.testSession.score}/${this.testSession.maxScore} (${percentage.toFixed(0)}%)`;
  }

  // Activar cámara para detección de gestos
  startGestureCapture() {
    this.showCameraModal = true;
    this.cameraError = '';
    this.gestureDetected = false;

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.cameraStream = stream;
        const videoElement = document.getElementById('cameraVideo') as HTMLVideoElement;
        if (videoElement) {
          videoElement.srcObject = stream;
        }
        
        // Simular detección después de 8 segundos (más tiempo para el usuario)
        setTimeout(() => {
          this.simulateGestureDetection();
        }, 8000);
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
        this.cameraError = 'No se pudo acceder a la cámara. Verifica los permisos.';
      });
  }

  // Simular detección de gesto (temporal)
  simulateGestureDetection() {
    this.gestureDetected = true;
    this.testFeedback = '✅ ¡Gesto detectado correctamente!';
    this.stopCamera();
    
    setTimeout(() => {
      this.showCameraModal = false;
      this.submitAnswer();
    }, 2500);
  }

  // Detener cámara
  stopCamera() {
    if (this.cameraStream) {
      this.cameraStream.getTracks().forEach(track => track.stop());
      this.cameraStream = null;
    }
  }

  // Cerrar modal de cámara
  closeCameraModal() {
    this.showCameraModal = false;
    this.stopCamera();
  }

  // Cerrar modal de prueba
  closeTestModal() {
    // Si la prueba está completada y se obtuvo 100%, marcar como completada
    if (this.testSession?.isCompleted && this.currentLesson) {
      const percentage = (this.testSession.score / this.testSession.maxScore) * 100;
      
      if (percentage === 100) {
        console.log(`🎉 ¡Perfecto! Puntuación del 100% en ${this.currentLesson.name}`);
        this.progressService.markLessonAsCompleted(this.currentLesson.id);
        
        // Mostrar mensaje de felicitación
        setTimeout(() => {
          alert(`🏆 ¡EXCELENTE!\n\n¡Has completado perfectamente la lección de ${this.currentLesson?.name}!\n\n✨ Progreso guardado automáticamente\n🔓 Nuevas lecciones pueden estar disponibles`);
        }, 500);
      }
    }
    
    this.showTestModal = false;
    this.testSession = null;
    this.currentQuestion = null;
    this.showInlineVideo = false; // Cerrar video inline
    this.stopCamera();
  }

  // Abrir video inline en la pregunta
  openInlineVideo() {
    this.showInlineVideo = true;
    console.log('📺 Abriendo video inline en la pregunta actual');
    
    // Agregar efecto visual de apertura
    setTimeout(() => {
      if (this.showInlineVideo) {
        console.log('✅ Video inline abierto correctamente');
      }
    }, 100);
  }

  // Cerrar video inline
  closeInlineVideo() {
    this.showInlineVideo = false;
    this.hasViewedReferenceVideo = true; // Marcar que se ha visto el video
    console.log('❌ Cerrando video inline - Video visto correctamente');
  }

  // Auto-mostrar video de referencia para preguntas de opción múltiple y matching
  autoShowReferenceVideo() {
    if (this.currentQuestion && 
        (this.currentQuestion.type === 'multiple-choice' || this.currentQuestion.type === 'matching') &&
        this.currentQuestion.referenceVideo) {
      
      this.showInlineVideo = true;
      console.log('📺 Auto-mostrando video de referencia para la pregunta actual');
      
      // Agregar efecto visual de apertura
      setTimeout(() => {
        if (this.showInlineVideo) {
          console.log('✅ Video de referencia auto-abierto correctamente');
        }
      }, 100);
    }
  }

  // Verificar si se puede responder la pregunta actual
  canAnswerQuestion(): boolean {
    if (!this.currentQuestion) return false;
    
    // Para preguntas de gesto, siempre se puede responder
    if (this.currentQuestion.type === 'gesture') return true;
    
    // Para preguntas de opción múltiple y matching con video de referencia, 
    // se debe haber visto el video primero
    if ((this.currentQuestion.type === 'multiple-choice' || this.currentQuestion.type === 'matching') &&
        this.currentQuestion.referenceVideo) {
      return this.hasViewedReferenceVideo;
    }
    
    // Para preguntas sin video de referencia, siempre se puede responder
    return true;
  }

  // Métodos para manejar diferentes tipos de video
  
  // Verificar si es URL de YouTube
  isYouTubeUrl(url: string): boolean {
    return url.includes('youtube.com') || url.includes('youtu.be');
  }
  
  // Verificar si es URL de MP4 (incluyendo videos locales en public)
  isMp4Url(url: string): boolean {
    return url.toLowerCase().endsWith('.mp4') || url.startsWith('/') && url.includes('.mp4');
  }
  
  // Verificar si es video local en carpeta public
  isLocalPublicVideo(url: string): boolean {
    return url.startsWith('/') && url.endsWith('.mp4') && !url.includes('http');
  }
  
  // Obtener URL segura para iframes
  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
  // Convertir URL de YouTube a formato embed
  getYouTubeEmbedUrl(url: string): string {
    let videoId = '';
    
    // Extraer ID del video de diferentes formatos de URL de YouTube
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      return url; // Ya está en formato embed
    }
    
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  // Determinar el tipo de video automáticamente
  getVideoType(url: string): 'youtube' | 'mp4' | 'other' {
    if (this.isYouTubeUrl(url)) {
      return 'youtube';
    } else if (this.isMp4Url(url)) {
      return 'mp4';
    } else {
      return 'other';
    }
  }

  ngOnDestroy() {
    // Limpiar recursos al destruir el componente
    this.stopCamera();
  }

  goBack() {
    this.router.navigate(['/basic-level']);
  }
}
