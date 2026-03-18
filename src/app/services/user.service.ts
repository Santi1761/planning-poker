import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

export interface UserPayload {
  name: string;
  viewMode: string;
}

export interface UserResponse extends UserPayload {
  id: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  createUser(userData: UserPayload): Observable<UserResponse> {
    const mockResponse: UserResponse = {
      id: 'usr_84729472',
      name: userData.name,
      viewMode: userData.viewMode,
      role: 'propietario'
    };

    return of(mockResponse).pipe(delay(1000));
  }
}
