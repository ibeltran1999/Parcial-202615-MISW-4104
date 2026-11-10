
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListarCafe } from './listar-cafe';
import { CafeService } from '../../services/cafe.service';
import { Cafe } from '../../models/cafe';

describe('ListarCafe', () => {
  let component: ListarCafe;
  let fixture: any;
  let obtenerCafes: ReturnType<typeof vi.fn>;

  const cafesMock: Cafe[] = [
    {
      id: 1,
      nombre: 'Café Especial',
      tipo: 'Blend',
      region: 'Antioquia',
      sabor: 'Panela',
      altura: 1920,
      imagen: 'https://example.com/cafe1.jpg',
    },
    {
      id: 2,
      nombre: 'Café de Origen',
      tipo: 'Caturra',
      region: 'Huila',
      sabor: 'Chocolate',
      altura: 1800,
      imagen: 'https://example.com/cafe2.jpg',
    },
  ];

  beforeEach(async () => {
    obtenerCafes = vi.fn().mockReturnValue(of(cafesMock));

    await TestBed.configureTestingModule({
      declarations: [ListarCafe],
      providers: [
        {
          provide: CafeService,
          useValue: { obtenerCafes },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarCafe);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request the coffee list from CafeService', () => {
    fixture.detectChanges();

    expect(obtenerCafes).toHaveBeenCalled();
  });

  it('should display the name, type and region of each coffee', () => {
    fixture.detectChanges();

    const rows: NodeListOf<HTMLTableRowElement> =
      fixture.nativeElement.querySelectorAll('tbody tr');

    expect(rows.length).toBe(2);

    expect(rows[0].textContent).toContain('Café Especial');
    expect(rows[0].textContent).toContain('Blend');
    expect(rows[0].textContent).toContain('Antioquia');

    expect(rows[1].textContent).toContain('Café de Origen');
    expect(rows[1].textContent).toContain('Caturra');
    expect(rows[1].textContent).toContain('Huila');
  });
});
