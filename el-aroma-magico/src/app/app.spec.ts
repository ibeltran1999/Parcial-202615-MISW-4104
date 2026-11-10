import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { App } from './app';
import { CafeService } from './cafe/services/cafe.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: CafeService, useValue: { obtenerCafes: () => of([]) } }],
    }).compileComponents();
  });

  it('should render the title, coffee banner and list through its selector', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('h1')?.textContent).toContain('El aroma mágico');
    expect(page.querySelector('img')?.getAttribute('src')).toBe('images/cafe-banner.png');
    expect(page.querySelector('app-listar-cafe table')).toBeTruthy();
    expect(page.querySelector('footer')?.textContent).toContain('info@elaromamagico.com');
  });
});
