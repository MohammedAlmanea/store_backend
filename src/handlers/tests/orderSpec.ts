import supertest from 'supertest';
import { client } from '../../database';
import { User, UserTable } from '../../models/users';
import app from '../../server';

const request = supertest(app);
const userObj = new UserTable();
// Created a test user to get the token
const user = {
  first_name: 'test',
  last_name: 'yes',
  password: '123',
} as User;
let tokenKey: string;

describe('Test Order endpoints', () => {
  // Before all Create the test user
  beforeAll(async () => {
    const newUser = await userObj.create(user);
    user.id = newUser.id;
  });
  // After all Delete data from users,orders tables and reset id
  // So it doesn't effect other Specs
  afterAll(async () => {
    const conn = await client.connect();
    const sql = 'ALTER SEQUENCE users_id_seq RESTART WITH 1';
    const sql2 = 'DELETE FROM users';
    const sql3 = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1';
    const sql4 = 'DELETE FROM orders';
    await conn.query(sql4);
    await conn.query(sql3);
    await conn.query(sql);
    await conn.query(sql2);
    conn.release();
  });
  // Called to get the token
  it('Should return success when trying to authenticate a valid user', async () => {
    const response = await request
      .post('/users/authenticate')
      .set('Content-type', 'application/json')
      .send({
        last_name: 'yes',
        password: '123',
      });
    // Save the token
    tokenKey = response.body.token;
    expect(response.status).toEqual(200);
  });

  it('Should return success when trying to create an order with a valid order and token', async () => {
    const response = await request
      .post('/orders')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${tokenKey}`)
      .send({
        name: 'open',
        user_id: `${user.id}`,
      });
    expect(response.status).toEqual(200);
  });

  it('Should return success when trying to get all orders made by a valid user.id and token', async () => {
    const response = await request
      .get(`/orders/${user.id}`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${tokenKey}`);
    expect(response.status).toEqual(200);
  });
});
