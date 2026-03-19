import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreCardComponent } from '../../atoms/score-card/score-card.component';
import { CardService } from '../../../services/card.service';

@Component({
  selector: 'app-card-deck',
  standalone: true,
  imports: [CommonModule, ScoreCardComponent],
  templateUrl: './card-deck.component.html',
  styleUrl: './card-deck.component.scss'
})
export class CardDeckComponent implements OnInit {
  cards: string[] = [];
  isLoading: boolean = true;
  selectedCard: string | null = null;

  @Output() cardSelected = new EventEmitter<string>();

  constructor(private readonly cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.getAvailableCards().subscribe({
      next: (data) => {
        this.cards = data;
        this.isLoading = false;
      },
      error: () => {
        this.cards = [];
        this.isLoading = false;
      }
    });
  }

  onSelect(cardValue: string) {
    this.selectedCard = cardValue;
    this.cardSelected.emit(cardValue);
  }
}
