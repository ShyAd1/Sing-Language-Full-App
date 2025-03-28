import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  logIn() {
    // Aquí iría la lógica para autenticar con el backend
    console.log('Iniciando sesión:', { email: this.email, password: this.password });
    alert('Sesión iniciada (simulación).');
    this.router.navigate(['/lessons']);
  }
}
