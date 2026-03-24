import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinGame } from './join-game.component';

describe('JoinGame', () => {
  let component: JoinGame;
  let fixture: ComponentFixture<JoinGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinGame],
    }).compileComponents();

    fixture = TestBed.createComponent(JoinGame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
