import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarCafe } from './listar-cafe';

describe('ListarCafe', () => {
  let component: ListarCafe;
  let fixture: ComponentFixture<ListarCafe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarCafe],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarCafe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
