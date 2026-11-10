
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { CafeService } from './cafe.service';
import { Cafe } from '../models/cafe';

const API_URL =
  'https://gist.githubusercontent.com/josejbocanegra/e9d24db370ce95b75555f7d1f8691805/raw/8a26ac2bca4183dc88545e14c45851d698911358/202212_MISW4104_Grupo3.json';

describe('CafeService', () => {
  let service: CafeService;
  let httpMock: HttpTestingController;

  const cafesMock: Cafe[] = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    nombre: `Café ${index + 1}`,
    tipo: 'Blend',
    region: 'Antioquia',
    sabor: 'Panela',
    altura: 1920,
    imagen: 'https://example.com/cafe.jpg',
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CafeService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(CafeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve the six cafes using an HTTP GET request', () => {
    service.obtenerCafes().subscribe((cafes) => {
      expect(cafes).toEqual(cafesMock);
      expect(cafes.length).toBe(6);
    });

    const request = httpMock.expectOne(API_URL);

    expect(request.request.method).toBe('GET');

    request.flush(cafesMock);
  });
});
