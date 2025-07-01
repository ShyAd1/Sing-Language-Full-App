import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  
  // Marcar una lección como completada
  markLessonAsCompleted(lessonId: string) {
    const currentUser = localStorage.getItem('userEmail') || 'guest';
    
    // Actualizar progreso del basic level
    this.updateBasicLevelProgress(lessonId);
    
    // Actualizar progreso del difficulty selector si todas las lecciones están completas
    this.checkAndUpdateDifficultyProgress();
    
    console.log(`✅ Lección ${lessonId} completada para usuario ${currentUser}`);
  }
  
  private updateBasicLevelProgress(lessonId: string) {
    const currentUser = localStorage.getItem('userEmail') || 'guest';
    const savedProgress = localStorage.getItem(`basicLevelProgress_${currentUser}`);
    
    let progress: any = {};
    if (savedProgress) {
      progress = JSON.parse(savedProgress);
    }
    
    // Marcar la lección específica como completada
    progress[lessonId] = {
      completed: true,
      progress: 100
    };
    
    localStorage.setItem(`basicLevelProgress_${currentUser}`, JSON.stringify(progress));
  }
  
  private checkAndUpdateDifficultyProgress() {
    const currentUser = localStorage.getItem('userEmail') || 'guest';
    const basicProgress = localStorage.getItem(`basicLevelProgress_${currentUser}`);
    
    if (basicProgress) {
      const progress = JSON.parse(basicProgress);
      const basicLessons = ['abecedario', 'numeros', 'colores', 'alimentos', 'pronombres', 'familia'];
      
      // Verificar si todas las lecciones están completadas
      const allCompleted = basicLessons.every(lessonId => 
        progress[lessonId] && progress[lessonId].completed
      );
      
      if (allCompleted) {
        // Marcar el nivel básico como completado en difficulty selector
        const difficultyProgress = localStorage.getItem(`levelProgress_${currentUser}`);
        let levels: any = {};
        
        if (difficultyProgress) {
          levels = JSON.parse(difficultyProgress);
        }
        
        levels['basico'] = {
          completed: true,
          progress: 100,
          unlocked: true
        };
        
        // Desbloquear intermedio
        levels['intermedio'] = {
          completed: levels['intermedio']?.completed || false,
          progress: levels['intermedio']?.progress || 0,
          unlocked: true
        };
        
        localStorage.setItem(`levelProgress_${currentUser}`, JSON.stringify(levels));
        console.log('🎉 ¡Nivel básico completado! Intermedio desbloqueado.');
      }
    }
  }
  
  // Obtener progreso de una lección específica
  getLessonProgress(lessonId: string): { completed: boolean, progress: number } {
    const currentUser = localStorage.getItem('userEmail') || 'guest';
    const savedProgress = localStorage.getItem(`basicLevelProgress_${currentUser}`);
    
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      return progress[lessonId] || { completed: false, progress: 0 };
    }
    
    return { completed: false, progress: 0 };
  }
}
