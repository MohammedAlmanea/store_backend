import {client} from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  password: string;
};

export class UserTable {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT id,first_name,last_name FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get users: ${err}`);
    }
  }

  async show(id: string): Promise<User|null> {
    try {
      const sql = 'SELECT id,first_name,last_name FROM users WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();
      if(result.rows.length) {
      return result.rows[0];
      }
      else {
        return null
      }
    } catch (err) {
      throw new Error(`unable show user ${id}: ${err}`);
    }
  }

  async create(user: User): Promise<User>{
    try {
      const sql =
        'INSERT INTO users (first_name,last_name,password) VALUES($1,$2,$3) RETURNING id,first_name,last_name';
      const conn = await client.connect();
      const hash = bcrypt.hashSync(
        user.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );

      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
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
    last_name: string,
    password: string
  ): Promise<User[] | null> {
    try {
      const sql = 'SELECT password FROM users WHERE last_name=($1)';

      const conn = await client.connect();
      const result = await conn.query(sql, [last_name]);
      conn.release();
      if (result.rows.length) {
        const user = result.rows[0];

        if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
          return user;
        }
      }
     
      return null;
    } catch (error) {
      throw new Error(`Can not authenticate user ${error}`);
    }
  }
}
