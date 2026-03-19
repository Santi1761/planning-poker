import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CardPort } from '../../core/ports/card.port';

@Injectable({
  providedIn: 'root'
})
export class MockCardAdapter implements CardPort {

  getCards(): Observable<string[]> {
    const mockCards = ['0', '1', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕'];
    return of(mockCards);
  }
}
