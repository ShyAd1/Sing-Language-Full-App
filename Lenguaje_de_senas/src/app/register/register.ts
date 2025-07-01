import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  userData = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    edad: 0,
    genero: '',
    experiencia: '',
    acceptTerms: false
  };

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router) {}

  // Validar formulario
  isFormValid(): boolean {
    return this.userData.nombre.trim() !== '' &&
           this.userData.apellido.trim() !== '' &&
           this.userData.email.trim() !== '' &&
           this.userData.password.trim() !== '' &&
           this.userData.confirmPassword.trim() !== '' &&
           this.userData.password === this.userData.confirmPassword &&
           this.userData.password.length >= 6 &&
           this.userData.edad > 0 &&
           this.userData.genero !== '' &&
           this.userData.experiencia !== '' &&
           this.userData.acceptTerms;
  }

  // Enviar formulario (versión simple sin base de datos)
  onSubmit() {
    if (!this.isFormValid()) {
      if (this.userData.password !== this.userData.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden.';
      } else if (this.userData.password.length < 6) {
        this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      } else {
        this.errorMessage = 'Por favor, completa todos los campos y acepta los términos.';
      }
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Simular registro exitoso
    setTimeout(() => {
      this.isLoading = false;
      this.successMessage = '¡Registro completado exitosamente!';

      console.log('✅ Usuario registrado localmente:', {
        ...this.userData,
        password: '***', // No mostrar la contraseña en console
        confirmPassword: '***'
      });

      // Guardar datos básicos en localStorage (sin contraseña por seguridad)
      localStorage.setItem('userEmail', this.userData.email);
      localStorage.setItem('userName', `${this.userData.nombre} ${this.userData.apellido}`);
      localStorage.setItem('userLoggedIn', 'true');

      // Mostrar mensaje de éxito
      alert(`🎉 ¡Bienvenido/a ${this.userData.nombre} ${this.userData.apellido}!\n\n` +
            `Tu cuenta ha sido creada exitosamente.\n` +
            `Email: ${this.userData.email}\n` +
            `Experiencia: ${this.userData.experiencia}\n\n` +
            `¡Ahora selecciona tu nivel de dificultad! 🎮`);

      // Redirigir al selector de dificultad después de 2 segundos
      setTimeout(() => {
        this.router.navigate(['/difficulty-selector']);
      }, 2000);
    }, 1500);
  }

  // Limpiar formulario
  limpiarFormulario() {
    this.userData = {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      confirmPassword: '',
      edad: 0,
      genero: '',
      experiencia: '',
      acceptTerms: false
    };
    this.errorMessage = '';
    this.successMessage = '';
    console.log('🗑️ Formulario limpiado');
  }

  // Volver a la página anterior
  volver() {
    console.log('← Volviendo a la página anterior');
    // this.router.navigate(['/']);
    window.history.back();
  }
}
