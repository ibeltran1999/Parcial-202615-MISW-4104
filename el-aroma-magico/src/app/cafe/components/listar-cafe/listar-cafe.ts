
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

import { Cafe } from '../../models/cafe';
import { CafeService } from '../../services/cafe.service';

@Component({
  selector: 'app-listar-cafe',
  standalone: false,
  styleUrl: './listar-cafe.css',
  templateUrl: './listar-cafe.html',
})
export class ListarCafe implements OnInit {

  private cafeService = inject(CafeService);
  private changeDetector = inject(ChangeDetectorRef);

  cafes: Cafe[] = [];

  get totalOrigen(): number {
    return this.cafes.filter((cafe) => cafe.tipo === 'Café de Origen').length;
  }

  get totalBlend(): number {
    return this.cafes.filter((cafe) => cafe.tipo === 'Blend').length;
  }

  ngOnInit(): void {
    this.cafeService.obtenerCafes().subscribe({
      next: (cafes) => {
        this.cafes = cafes;
        this.changeDetector.markForCheck();
      },
      error: (error) => {
        console.error('Error al obtener los cafés:', error);
      },
    });
  }
}
