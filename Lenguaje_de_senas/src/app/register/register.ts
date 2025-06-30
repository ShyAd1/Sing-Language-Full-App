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
           this.userData.edad > 0 &&
           this.userData.genero !== '' &&
           this.userData.experiencia !== '' &&
           this.userData.acceptTerms;
  }

  // Enviar formulario (versión simple sin base de datos)
  onSubmit() {
    if (!this.isFormValid()) {
      this.errorMessage = 'Por favor, completa todos los campos y acepta los términos.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Simular registro exitoso
    setTimeout(() => {
      this.isLoading = false;
      this.successMessage = '¡Registro completado exitosamente!';
      
      console.log('✅ Usuario registrado localmente:', this.userData);
      
      // Mostrar mensaje de éxito
      alert(`🎉 ¡Bienvenido/a ${this.userData.nombre} ${this.userData.apellido}!\n\n` +
            `Tu cuenta ha sido creada exitosamente.\n` +
            `Email: ${this.userData.email}\n` +
            `Experiencia: ${this.userData.experiencia}\n\n` +
            `¡Gracias por unirte a nuestra comunidad! 🎮`);
      
      // Redirigir al home después de 2 segundos
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    }, 1500); // Simular tiempo de procesamiento
  }

  // Limpiar formulario
  limpiarFormulario() {
    this.userData = {
      nombre: '',
      apellido: '',
      email: '',
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
