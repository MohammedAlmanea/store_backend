import { client } from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class Product_Class {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';

      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Can't get products. ${error}`);
    }
  }

  async show(id: string): Promise<Product | null> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      if (result.rows.length) {
        const product = result.rows[0];
        return product;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Can't get product. ${error}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';

      const conn = await client.connect();

      const result = await conn.query(sql, [p.name, p.price]);
      conn.release();

      const product = result.rows[0];
      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }
}
