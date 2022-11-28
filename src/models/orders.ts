import {client} from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export class Order_Class {
  async show(userId: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't get order. ${error}`);
    }
  }
}