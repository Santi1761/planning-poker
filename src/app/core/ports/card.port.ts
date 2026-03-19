import { Observable } from 'rxjs';

export abstract class CardPort {
  abstract getCards(): Observable<string[]>;
}
