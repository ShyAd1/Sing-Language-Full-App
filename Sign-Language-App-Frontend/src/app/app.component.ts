import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule], // Solo CommonModule, HttpClientModule ya no va aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Lenguaje de Señas App';
  lessons: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadLessons();
  }

  loadLessons() {
    this.http.get<any[]>('http://localhost:5555/api/lessons').subscribe({
      next: (data) => {
        this.lessons = data;
      },
      error: (error) => {
        console.error('Error cargando lecciones:', error);
        // Datos de ejemplo si el backend no está listo
        this.lessons = [
          { name: 'Saludos', description: 'Aprende a saludar en lenguaje de señas' },
          { name: 'Números', description: 'Cuenta del 1 al 10 con gestos' }
        ];
      }
    });
  }

  startLesson() {
    alert('¡Iniciando tu primera lección! (Funcionalidad en desarrollo)');
  }
}
