import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  /**
   * Simula la creación de una partida en el servidor.
   * @param name Nombre de la partida
   * @returns Un Observable que simula la respuesta con un ID falso después de 1 segundo.
   */
  createGame(name: string): Observable<{ id: string, name: string }> {

    const mockResponse = {
      id: '9QdP98VGUrZQLNCqYAF7',
      name: name
    };
    return of(mockResponse).pipe(delay(1000));
  }
}
