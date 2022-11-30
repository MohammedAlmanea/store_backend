import { client } from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: string;
};

export class Order_Class {
  async create(or: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';

      const conn = await client.connect();

      const result = await conn.query(sql, [or.status, or.user_id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async show(userId: string): Promise<Order[]|null> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [userId]);
      conn.release();
      if (result.rows.length)
      {
      return result.rows;
      }
      else {
        return null
      }
    } catch (error) {
      throw new Error(`Can't get order. ${error}`);
    }
  }
}
