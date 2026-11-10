
import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cafe } from '../models/cafe';

const API_URL =
  'https://gist.githubusercontent.com/josejbocanegra/e9d24db370ce95b75555f7d1f8691805/raw/8a26ac2bca4183dc88545e14c45851d698911358/202212_MISW4104_Grupo3.json';

@Service()
export class CafeService {
  private http = inject(HttpClient);

  obtenerCafes(): Observable<Cafe[]> {
    return this.http.get<Cafe[]>(API_URL);
  }
}
