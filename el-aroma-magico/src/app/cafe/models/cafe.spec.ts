import { Cafe } from './cafe';

describe('Cafe', () => {
  it('should represent all attributes of a coffee variety', () => {
    const cafe = new Cafe();
    cafe.id = 1;
    cafe.nombre = 'Café Especial para tí';
    cafe.tipo = 'Blend';
    cafe.region = 'Angelópolis, Antioquia';
    cafe.sabor = 'Panela, Durazno, Caramelo';
    cafe.altura = 1920;
    cafe.imagen = 'https://example.com/cafe.jpg';

    expect(cafe).toBeInstanceOf(Cafe);
    expect({ ...cafe }).toEqual({
      id: 1,
      nombre: 'Café Especial para tí',
      tipo: 'Blend',
      region: 'Angelópolis, Antioquia',
      sabor: 'Panela, Durazno, Caramelo',
      altura: 1920,
      imagen: 'https://example.com/cafe.jpg',
    });
  });
});
