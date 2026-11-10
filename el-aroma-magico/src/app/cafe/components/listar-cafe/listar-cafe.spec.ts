
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';

import { ListarCafe } from './listar-cafe';
import { CafeService } from '../../services/cafe.service';
import { Cafe } from '../../models/cafe';

describe('ListarCafe', () => {
  let component: ListarCafe;
  let fixture: ComponentFixture<ListarCafe>;
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
      tipo: 'Café de Origen',
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
    expect(rows[1].textContent).toContain('Café de Origen');
    expect(rows[1].textContent).toContain('Huila');
  });
  it('should use a Bootstrap table with the required headers', () => {
    fixture.detectChanges();
    const table = fixture.nativeElement.querySelector('table.table');
    expect(table).toBeTruthy();
    expect(Array.from(table.querySelectorAll('thead th'), (th: any) => th.textContent.trim()))
      .toEqual(['#', 'Nombre', 'Tipo', 'Región']);
  });

  it('should render asynchronous data and calculate totals by type', async () => {
    const response = new Subject<Cafe[]>();
    obtenerCafes.mockReturnValue(response);
    fixture.detectChanges();
    response.next([...cafesMock, { ...cafesMock[0], id: 3 }]);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(3);
    expect(fixture.nativeElement.textContent).toContain('Total café de origen: 1');
    expect(fixture.nativeElement.textContent).toContain('Total café blend: 2');
    response.complete();
  });

  it('should display zero totals for an empty response', () => {
    obtenerCafes.mockReturnValue(of([]));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(0);
    expect(fixture.nativeElement.textContent).toContain('Total café de origen: 0');
    expect(fixture.nativeElement.textContent).toContain('Total café blend: 0');
  });

});

// Las respuestas HTTP llegan después del primer renderizado.
