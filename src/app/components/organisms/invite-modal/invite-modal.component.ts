import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invite-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invite-modal.component.html',
  styleUrl: './invite-modal.component.scss'
})

export class InviteModalComponent {
  @Input() gameId: string = '';
  @Output() close = new EventEmitter<void>();

  isCopied: boolean = false;

  get inviteLink(): string {
    const baseUrl = globalThis.location.origin;
    return `${baseUrl}/join/${this.gameId}`;
  }

  copyLink() {
    navigator.clipboard.writeText(this.inviteLink).then(() => {
      this.isCopied = true;

      setTimeout(() => {

        this.isCopied = false;
      }, 2000);
    });
  }
}
