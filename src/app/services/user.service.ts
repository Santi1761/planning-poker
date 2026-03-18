import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { StoragePort } from '../core/ports/storage.port';

export interface UserPayload { name: string; viewMode: string; }
export interface UserResponse extends UserPayload { id: string; role: string; }

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private readonly storage: StoragePort) { }

  createUser(userData: UserPayload): Observable<UserResponse> {
    const mockResponse: UserResponse = {
      id: 'usr_84729472',
      name: userData.name,
      viewMode: userData.viewMode,
      role: 'propietario'
    };

    this.storage.saveUser(mockResponse.name, mockResponse.role, mockResponse.viewMode);

    return of(mockResponse).pipe(delay(1000));
  }
}
