import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Register } from './register/register';
import { Login } from './login/login';

export const routes: Routes = [
    { path: '', component: Home }, // Ruta principal que muestra el home
    { path: 'home', component: Home },
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    { path: '**', redirectTo: '' } // Redirige rutas no encontradas al home
];
