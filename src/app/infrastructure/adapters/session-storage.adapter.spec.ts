import { TestBed } from '@angular/core/testing';
import { SessionStorageAdapter } from './session-storage.adapter';

describe('SessionStorageAdapter', () => {
  let adapter: SessionStorageAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionStorageAdapter]
    });
    adapter = TestBed.inject(SessionStorageAdapter);
    sessionStorage.clear();
  });

  it('debería guardar y obtener el nombre del juego', () => {
    adapter.saveGameName('Sprint Test');
    expect(sessionStorage.getItem('gameName')).toBe('Sprint Test');
    expect(adapter.getGameName()).toBe('Sprint Test');
  });

  it('debería guardar y obtener el usuario', () => {
    adapter.saveUser('Luisa', 'propietario', 'espectador');
    const user = adapter.getUser();
    expect(user).toBeTruthy();
    expect(user?.name).toBe('Luisa');
  });

  it('debería retornar null si no hay usuario guardado', () => {
    expect(adapter.getUser()).toBeNull();
  });
});
