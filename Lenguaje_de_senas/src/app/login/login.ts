import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  // Datos del formulario de login
  loginData = {
    email: '',
    password: '',
    rememberMe: false
  };

  // Estados del componente
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router) {}

  // Método para volver a la página anterior
  volver() {
    this.router.navigate(['/home']);
  }

  // Método de envío del formulario
  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.isFormValid()) {
      this.authenticateUser();
    }
  }

  // Validación del formulario
  private isFormValid(): boolean {
    if (!this.loginData.email) {
      this.errorMessage = 'El correo electrónico es requerido';
      return false;
    }

    if (!this.isValidEmail(this.loginData.email)) {
      this.errorMessage = 'El formato del correo electrónico no es válido';
      return false;
    }

    if (!this.loginData.password) {
      this.errorMessage = 'La contraseña es requerida';
      return false;
    }

    if (this.loginData.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      return false;
    }

    return true;
  }

  // Validación de email
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Método de autenticación (simulado)
  private authenticateUser() {
    this.isLoading = true;

    // Simulamos una llamada a la API con un delay
    setTimeout(() => {
      this.isLoading = false;

      // Simulamos validación local - en un caso real esto sería una llamada al backend
      if (this.loginData.email === 'usuario@test.com' && this.loginData.password === '123456') {
        this.successMessage = '¡Inicio de sesión exitoso! Bienvenido de vuelta 🎮';

        // Limpiar cualquier sesión anterior
        this.clearPreviousSession();

        // Guardamos info de la nueva sesión
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userEmail', this.loginData.email);
        localStorage.setItem('userName', 'Usuario Demo');

        if (this.loginData.rememberMe) {
          localStorage.setItem('rememberSession', 'true');
        }

        // Redirigimos al selector de dificultad después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/difficulty-selector']);
        }, 2000);

      } else {
        this.errorMessage = 'Credenciales incorrectas. Usa: usuario@test.com / 123456 para probar';
      }
    }, 1500);
  }

  // Limpiar sesión anterior
  private clearPreviousSession() {
    // Obtener todas las claves del localStorage
    const keys = Object.keys(localStorage);

    // Eliminar datos de progreso de usuarios anteriores
    keys.forEach(key => {
      if (key.startsWith('levelProgress_') || key.startsWith('basicLevelProgress_')) {
        // Solo eliminar si no es del usuario actual
        if (!key.includes(this.loginData.email)) {
          localStorage.removeItem(key);
        }
      }
    });

    // Limpiar datos de sesión anterior
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
  }

  // Método para recuperar contraseña
  recuperarPassword(event: Event) {
    event.preventDefault();
    this.errorMessage = '';
    this.successMessage = 'Funcionalidad de recuperación de contraseña disponible próximamente 🔧';

    // Limpiar mensaje después de 3 segundos
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }
}
