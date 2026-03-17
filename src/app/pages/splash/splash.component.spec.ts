import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplashComponent } from './splash.component';
import { Router } from '@angular/router';

describe('SplashComponent', () => {
  let component: SplashComponent;
  let fixture: ComponentFixture<SplashComponent>;
  let router: Router;

  beforeEach(async () => {
    const routerMock = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [SplashComponent],
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SplashComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería navegar a /create-game después de 2.5 segundos', () => {
    jest.useFakeTimers();
    component.ngOnInit();
    expect(router.navigate).not.toHaveBeenCalled();
    jest.advanceTimersByTime(2500);
    expect(router.navigate).toHaveBeenCalledWith(['/create-game']);
  });
});
