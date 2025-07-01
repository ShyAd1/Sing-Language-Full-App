import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface LessonClass {
  id: string;
  name: string;
  icon: string;
  description: string;
  completed: boolean;
  progress: number;
}

@Component({
  selector: 'app-basic-level',
  imports: [CommonModule],
  templateUrl: './basic-level.html',
  styleUrl: './basic-level.css'
})
export class BasicLevel implements OnInit {
  playerName = localStorage.getItem('userEmail') || 'JUGADOR';
  currentLevel = 'BÁSICO';
  playerLives = 5; // Corazones de vida
  progressPercentage = 0; // Barra de progreso general

  classes: LessonClass[] = [
    {
      id: 'abecedario',
      name: 'ABECEDARIO',
      icon: '🔤',
      description: 'Aprende las señas del alfabeto',
      completed: false,
      progress: 0
    },
    {
      id: 'numeros',
      name: 'NÚMEROS',
      icon: '🔢',
      description: 'Señas para números del 0 al 10',
      completed: false,
      progress: 0
    },
    {
      id: 'colores',
      name: 'COLORES',
      icon: '🎨',
      description: 'Aprende los colores básicos',
      completed: false,
      progress: 0
    },
    {
      id: 'alimentos',
      name: 'ALIMENTOS',
      icon: '🍎',
      description: 'Comidas y bebidas comunes',
      completed: false,
      progress: 0
    },
    {
      id: 'pronombres',
      name: 'PRONOMBRES',
      icon: '👤',
      description: 'Yo, tú, él, ella, nosotros',
      completed: false,
      progress: 0
    },
    {
      id: 'familia',
      name: 'FAMILIA',
      icon: '👨‍👩‍👧‍👦',
      description: 'Miembros de la familia',
      completed: false,
      progress: 0
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadProgress();
    this.calculateOverallProgress();
    
    // Escuchar cuando el usuario regresa de una lección
    window.addEventListener('focus', () => {
      this.refreshProgress();
    });
  }

  refreshProgress() {
    this.loadProgress();
    this.calculateOverallProgress();
    console.log('🔄 Progreso actualizado');
  }

  loadProgress() {
    // Cargar progreso específico del usuario actual
    const currentUser = localStorage.getItem('userEmail') || 'guest';
    const savedProgress = localStorage.getItem(`basicLevelProgress_${currentUser}`);

    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      this.classes.forEach(lessonClass => {
        if (progress[lessonClass.id]) {
          lessonClass.completed = progress[lessonClass.id].completed;
          lessonClass.progress = progress[lessonClass.id].progress;
        }
      });
    }
  }

  calculateOverallProgress() {
    const totalClasses = this.classes.length;
    const completedClasses = this.classes.filter(c => c.completed).length;
    this.progressPercentage = Math.round((completedClasses / totalClasses) * 100);
  }

  selectClass(lessonClass: LessonClass) {
    console.log(`🎯 Seleccionada clase: ${lessonClass.name}`);

    // Navegar al detalle de la lección
    this.router.navigate(['/lesson', lessonClass.id]);
  }

  goBackToDifficulty() {
    console.log('← Volviendo al selector de dificultad');
    this.router.navigate(['/difficulty-selector']);
  }

  saveProgress() {
    // Guardar progreso específico del usuario actual
    const currentUser = localStorage.getItem('userEmail') || 'guest';
    const progress: any = {};
    this.classes.forEach(lessonClass => {
      progress[lessonClass.id] = {
        completed: lessonClass.completed,
        progress: lessonClass.progress
      };
    });
    localStorage.setItem(`basicLevelProgress_${currentUser}`, JSON.stringify(progress));
  }

  // Método para mostrar ayuda del robot
  showHelp() {
    alert('🤖 ¡Hola! Soy tu asistente virtual.\n\n' +
          '💡 Consejos:\n' +
          '• Selecciona una lección para empezar\n' +
          '• Completa todas las lecciones para desbloquear el examen\n' +
          '• Usa el botón INICIO para volver al selector de dificultad\n\n' +
          '¡Diviértete aprendiendo! 🎮');
  }
}
