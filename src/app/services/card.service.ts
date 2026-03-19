import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardPort } from '../core/ports/card.port';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor(private readonly cardPort: CardPort) { }

  getAvailableCards(): Observable<string[]> {
    return this.cardPort.getCards();
  }
}
