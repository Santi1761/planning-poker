export abstract class StoragePort {
  abstract saveGameName(name: string): void;
  abstract getGameName(): string | null;
  abstract saveUser(name: string, role: string, viewMode: string): void;
  abstract getUser(): { name: string, role: string, viewMode: string } | null;
}
