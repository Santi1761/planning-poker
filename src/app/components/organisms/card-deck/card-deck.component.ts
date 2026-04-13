import { Component, OnInit, output, signal } from '@angular/core';
import { ScoreCardComponent } from '../../atoms/score-card/score-card.component';
import { CardService } from '../../../services/card.service';

@Component({
  selector: 'app-card-deck',
  standalone: true,
  imports: [ScoreCardComponent],
  templateUrl: './card-deck.component.html',
  styleUrl: './card-deck.component.scss'
})
export class CardDeckComponent implements OnInit {
  cards = signal<string[]>([]);
  isLoading = signal(true);
  selectedCard = signal<string | null>(null);

  cardSelected = output<string>();

  constructor(private readonly cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.getAvailableCards().subscribe({
      next: (data) => {
        this.cards.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.cards.set([]);
        this.isLoading.set(false);
      }
    });
  }

  onSelect(cardValue: string) {
    this.selectedCard.set(cardValue);
    this.cardSelected.emit(cardValue);
  }
}
