import { Product_Class } from '../products';

const productObj = new Product_Class();

describe('Product model', () => {
  describe('Product methods should be defined', () => {
    it('should have an index method', () => {
      expect(productObj.index).toBeDefined();
    });
    it('should have a show method', () => {
      expect(productObj.show).toBeDefined();
    });
    it('should have a create method', () => {
      expect(productObj.create).toBeDefined();
    });
  });

  describe('Product methods should work as expected', () => {
    it('create method should create a product', async () => {
      const result = await productObj.create({
        name: 'Cookies',
        price: 8,
      });
      expect(result).toEqual({
        id: 1,
        name: 'Cookies',
        price: 8,
      });
    });

    it('index method should return all products', async () => {
      const result = await productObj.index();
      expect(result).toEqual([
        {
          id: 1,
          name: 'Cookies',
          price: 8,
        },
      ]);
    });

    it('show method should show the correct product', async () => {
      const result = await productObj.show('1');
      expect(result).toEqual({
        id: 1,
        name: 'Cookies',
        price: 8,
      });
    });
  });
});
