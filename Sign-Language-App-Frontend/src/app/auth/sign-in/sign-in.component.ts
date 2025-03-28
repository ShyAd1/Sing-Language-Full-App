import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  signIn() {
    // Aquí iría la lógica para enviar los datos al backend
    console.log('Registrando:', { username: this.username, email: this.email, password: this.password });
    alert('Cuenta creada (simulación). Ahora inicia sesión.');
    this.router.navigate(['/log-in']);
  }
}
