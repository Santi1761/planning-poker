import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { StoragePort } from './core/ports/storage.port';
import { SessionStorageAdapter } from './infrastructure/adapters/session-storage.adapter';
import { CardPort } from './core/ports/card.port';
import { MockCardAdapter } from './infrastructure/adapters/mock-card.adapter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: StoragePort, useClass: SessionStorageAdapter },
    { provide: CardPort, useClass: MockCardAdapter }
  ]
};
