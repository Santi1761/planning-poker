import { Injectable } from '@angular/core';
import { StoragePort } from '../../core/ports/storage.port';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageAdapter implements StoragePort {

  saveGameName(name: string): void {
    sessionStorage.setItem('gameName', name);
  }

  getGameName(): string | null {
    return sessionStorage.getItem('gameName');
  }

  saveUser(name: string, role: string, viewMode: string): void {
    const user = { name, role, viewMode };
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUser(): { name: string; role: string; viewMode: string; } | null {
    const data = sessionStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
  }
}
