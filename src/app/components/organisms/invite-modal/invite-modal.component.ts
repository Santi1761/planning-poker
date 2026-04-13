import { Component, computed, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-invite-modal',
  standalone: true,
  imports: [],
  templateUrl: './invite-modal.component.html',
  styleUrl: './invite-modal.component.scss'
})
export class InviteModalComponent {
  gameId = input<string>('');
  close = output<void>();

  isCopied = signal(false);

  inviteLink = computed(() => {
    const baseUrl = globalThis.location.origin;
    return `${baseUrl}/join/${this.gameId()}`;
  });

  copyLink() {
    navigator.clipboard.writeText(this.inviteLink()).then(() => {
      this.isCopied.set(true);
      setTimeout(() => this.isCopied.set(false), 2000);
    });
  }
}
