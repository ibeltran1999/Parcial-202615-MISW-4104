import { Component } from '@angular/core';
import { CafeModule } from './cafe/cafe-module';

@Component({
  imports: [CafeModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
