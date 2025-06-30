import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  constructor(private router: Router) {}

  // Método para usuarios nuevos
  empezarAhora() {
    console.log('🚀 Empezar ahora - Usuario nuevo');
    // Navegar al registro
    this.router.navigate(['/register']);
  }

  // Método para usuarios existentes que van al login
  irALogin() {
    console.log('👤 Ya tengo cuenta - Ir al login');
    this.router.navigate(['/login']);
  }
}
