import { Routes } from '@angular/router';
import { CreateGameComponent } from './pages/create-game/create-game.component';

export const routes: Routes = [
  { path: '', component: CreateGameComponent },
  { path: '**', redirectTo: '' }
];
