import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { StoragePort } from '../core/ports/storage.port';

@Injectable({ providedIn: 'root' })
export class GameService {

  constructor(private readonly storage: StoragePort) { }

  createGame(name: string): Observable<{ id: string, name: string }> {
    this.storage.saveGameName(name);

    const mockResponse = { id: '9QdP98VGUrZQLNCqYAF7', name: name };
    return of(mockResponse).pipe(delay(1000));
  }
}
