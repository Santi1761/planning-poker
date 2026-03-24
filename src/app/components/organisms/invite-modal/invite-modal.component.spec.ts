import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { InviteModalComponent } from './invite-modal.component';

describe('InviteModalComponent', () => {
  let component: InviteModalComponent;
  let fixture: ComponentFixture<InviteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InviteModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(InviteModalComponent);
    component = fixture.componentInstance;
    component.gameId = 'TEST-ID-123';
    fixture.detectChanges();
  });

  it('debería crear el modal', () => {
    expect(component).toBeTruthy();
  });

  it('debería generar el link de invitación correctamente', () => {
    const origin = globalThis.location.origin;
    expect(component.inviteLink).toBe(`${origin}/join/TEST-ID-123`);
  });

  it('debería emitir el evento close al hacer clic en cerrar', () => {
    jest.spyOn(component.close, 'emit');
    const closeBtn = fixture.nativeElement.querySelector('.close-btn');
    closeBtn.click();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('debería copiar el link y cambiar el estado temporalmente', fakeAsync(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    component.copyLink();
    tick();

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(component.inviteLink);
    expect(component.isCopied).toBeTruthy();

    tick(2000);
    expect(component.isCopied).toBeFalsy();
  }));
});
