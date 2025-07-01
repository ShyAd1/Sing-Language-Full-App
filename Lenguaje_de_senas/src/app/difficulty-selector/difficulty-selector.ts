import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Level {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  completed: boolean;
  progress: number;
}

@Component({
  selector: 'app-difficulty-selector',
  imports: [CommonModule],
  templateUrl: './difficulty-selector.html',
  styleUrl: './difficulty-selector.css'
})
export class DifficultySelector implements OnInit {
  playerName = localStorage.getItem('userEmail') || 'JUGADOR';

  levels: Level[] = [
    {
      id: 'basico',
      name: 'BÁSICO',
      description: 'Aprende señas fundamentales y el alfabeto',
      icon: '👋',
      color: 'neon-green',
      unlocked: true,
      completed: false,
      progress: 0
    },
    {
      id: 'intermedio',
      name: 'INTERMEDIO',
      description: 'Palabras comunes y frases básicas',
      icon: '🤟',
      color: 'star-yellow',
      unlocked: false,
      completed: false,
      progress: 0
    },
    {
      id: 'avanzado',
      name: 'AVANZADO',
      description: 'Conversaciones complejas y gramática',
      icon: '🙌',
      color: 'retro-red',
      unlocked: false,
      completed: false,
      progress: 0
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadProgress();
    this.updateUnlockStatus();
  }

  loadProgress() {
    // Cargar progreso específico del usuario actual
    const currentUser = localStorage.getItem('userEmail') || 'guest';
    const savedProgress = localStorage.getItem(`levelProgress_${currentUser}`);

    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      this.levels.forEach(level => {
        if (progress[level.id]) {
          level.completed = progress[level.id].completed;
          level.progress = progress[level.id].progress;
          level.unlocked = progress[level.id].unlocked;
        }
      });
    }

    // Lógica de desbloqueo
    this.updateUnlockStatus();
  }

  updateUnlockStatus() {
    // El básico siempre está desbloqueado
    this.levels[0].unlocked = true;

    // Intermedio se desbloquea si básico está completado
    if (this.levels[0].completed) {
      this.levels[1].unlocked = true;
    }

    // Avanzado se desbloquea si intermedio está completado
    if (this.levels[1].completed) {
      this.levels[2].unlocked = true;
    }
  }

  selectLevel(level: Level) {
    if (!level.unlocked) {
      this.showLockedMessage(level);
      return;
    }

    console.log(`🎮 Seleccionado nivel: ${level.name}`);

    // Navegar al componente específico del nivel
    if (level.id === 'basico') {
      this.router.navigate(['/basic-level']);
    } else {
      // Para otros niveles, mostrar mensaje por ahora
      alert(`🚀 ¡Iniciando nivel ${level.name}!\n\n${level.description}\n\n¡Prepárate para aprender! 🎯`);
      // TODO: Implementar navegación para intermedio y avanzado
      // this.router.navigate(['/intermediate-level']);
      // this.router.navigate(['/advanced-level']);
    }
  }

  showLockedMessage(level: Level) {
    const prevLevel = this.getPreviousLevel(level);
    alert(`🔒 Nivel bloqueado\n\nPrimero debes completar el nivel ${prevLevel?.name} para desbloquear ${level.name}.\n\n¡Sigue practicando! 💪`);
  }

  getPreviousLevel(currentLevel: Level): Level | null {
    const currentIndex = this.levels.findIndex(l => l.id === currentLevel.id);
    return currentIndex > 0 ? this.levels[currentIndex - 1] : null;
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  // Método para simular completar un nivel (para testing)
  completeLevel(levelId: string) {
    const level = this.levels.find(l => l.id === levelId);
    if (level && level.unlocked) {
      level.completed = true;
      level.progress = 100;
      this.updateUnlockStatus();
      this.saveProgress();
      console.log(`✅ Nivel ${level.name} completado!`);
    }
  }

  saveProgress() {
    // Guardar progreso específico del usuario actual
    const currentUser = localStorage.getItem('userEmail') || 'guest';
    const progress: any = {};
    this.levels.forEach(level => {
      progress[level.id] = {
        completed: level.completed,
        progress: level.progress,
        unlocked: level.unlocked
      };
    });
    localStorage.setItem(`levelProgress_${currentUser}`, JSON.stringify(progress));
  }

  // Método para cerrar sesión
  logout() {
    const confirmLogout = confirm('🚪 ¿Estás seguro de que quieres cerrar sesión?\n\nSe guardará tu progreso automáticamente.');

    if (confirmLogout) {
      // Guardar progreso antes de cerrar sesión
      this.saveProgress();

      // Limpiar datos de sesión
      localStorage.removeItem('userLoggedIn');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');

      console.log('👋 Sesión cerrada exitosamente');

      // Redirigir al home
      this.router.navigate(['/']);
    }
  }
}
