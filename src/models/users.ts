import {client} from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  user_name: string;
  password: string;
};

export class UserTable {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get users: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`unable show user ${id}: ${err}`);
    }
  }

  async create(user: User): Promise<User[]> {
    try {
      const sql =
        'INSERT INTO users (first_name,last_name,user_name,password) VALUES($1,$2,$3,$4) RETURNING *';
      const conn = await client.connect();
      const hash = bcrypt.hashSync(
        user.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );

      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        user.user_name,
        hash,
      ]);
      const u = result.rows[0];
      conn.release();
      return u;
    } catch (error) {
      throw new Error(`Can not create user ${error}`);
    }
  }
  
  async authenticate(
    username: string,
    password: string
  ): Promise<User[] | null> {
    try {
      const sql = 'SELECT password FROM users WHERE username=($1)';

      const conn = await client.connect();
      const result = await conn.query(sql, [username]);

      if (result.rows.length) {
        const user = result.rows[0];

        if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
          return user;
        }
      }
      conn.release();
      return null;
    } catch (error) {
      throw new Error(`Can not authenticate user ${error}`);
    }
  }
}
