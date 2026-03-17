import { Routes } from '@angular/router';
import { CreateGameComponent } from './pages/create-game/create-game.component';
import { SplashComponent } from './pages/splash/splash.component';

export const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'create-game', component: CreateGameComponent },
  { path: '**', redirectTo: '' }
];
