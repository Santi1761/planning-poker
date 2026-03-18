import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpectatorBadgeComponent } from './spectator-badge.component';

describe('SpectatorBadgeComponent', () => {
  let component: SpectatorBadgeComponent;
  let fixture: ComponentFixture<SpectatorBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpectatorBadgeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpectatorBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
