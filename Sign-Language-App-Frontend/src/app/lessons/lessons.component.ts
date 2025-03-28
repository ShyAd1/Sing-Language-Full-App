import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {
  basicLessons: any[] = [];
  intermediateLessons: any[] = [];
  advancedLessons: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadLessons();
  }

  loadLessons() {
    this.http.get<any[]>('http://localhost:5555/api/lessons').subscribe({
      next: (data) => {
        // Simulamos segmentación por niveles (esto debería venir del backend)
        this.basicLessons = data.filter(lesson => lesson.level === 'basic') || [
          { name: 'Números', description: 'Cuenta del 1 al 10 con gestos', level: 'basic' },
          { name: 'Alfabeto', description: 'Aprende las letras en lenguaje de señas', level: 'basic' }
        ];
        this.intermediateLessons = data.filter(lesson => lesson.level === 'intermediate') || [
          { name: 'Palabras Cotidianas', description: 'Expresiones de uso diario', level: 'intermediate' }
        ];
        this.advancedLessons = data.filter(lesson => lesson.level === 'advanced') || [
          { name: 'Ideas Complejas', description: 'Expresa ideas complejas con fluidez', level: 'advanced' }
        ];
      },
      error: (error) => {
        console.error('Error cargando lecciones:', error);
        this.basicLessons = [
          { name: 'Números', description: 'Cuenta del 1 al 10 con gestos', level: 'basic' },
          { name: 'Alfabeto', description: 'Aprende las letras en lenguaje de señas', level: 'basic' }
        ];
        this.intermediateLessons = [
          { name: 'Palabras Cotidianas', description: 'Expresiones de uso diario', level: 'intermediate' }
        ];
        this.advancedLessons = [
          { name: 'Ideas Complejas', description: 'Expresa ideas complejas con fluidez', level: 'advanced' }
        ];
      }
    });
  }

  startLesson(lesson: any) {
    alert(`Iniciando lección: ${lesson.name} (Funcionalidad en desarrollo)`);
  }
}
