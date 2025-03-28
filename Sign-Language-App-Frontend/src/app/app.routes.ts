import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { LessonsComponent } from './lessons/lessons.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Página principal (presentación)
  { path: 'sign-in', component: SignInComponent }, // Registro
  { path: 'log-in', component: LogInComponent }, // Inicio de sesión
  { path: 'lessons', component: LessonsComponent }, // Lecciones (segmentadas por niveles)
  { path: '**', redirectTo: '' } // Redirige a la página principal si la ruta no existe
];
