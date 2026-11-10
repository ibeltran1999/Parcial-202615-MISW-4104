import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarCafe } from './components/listar-cafe/listar-cafe';

@NgModule({
  declarations: [ListarCafe],
  imports: [CommonModule],
  exports: [ListarCafe],
})
export class CafeModule {}
