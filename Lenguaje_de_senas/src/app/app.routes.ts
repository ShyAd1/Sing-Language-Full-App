import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Register } from './register/register';
import { Login } from './login/login';
import { DifficultySelector } from './difficulty-selector/difficulty-selector';
import { BasicLevel } from './basic-level/basic-level';
import { LessonDetail } from './lesson-detail/lesson-detail';

export const routes: Routes = [
    { path: '', component: Home }, // Ruta principal que muestra el home
    { path: 'home', component: Home },
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    { path: 'difficulty-selector', component: DifficultySelector },
    { path: 'basic-level', component: BasicLevel },
    { path: 'lesson/:id', component: LessonDetail },
    { path: '**', redirectTo: '' } // Redirige rutas no encontradas al home
];
