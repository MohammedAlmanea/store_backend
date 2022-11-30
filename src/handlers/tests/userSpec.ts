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

describe('Test User endpoints ', () => {
  // Before all Create the test user 
  beforeAll(async () => {
    const newUser = await userObj.create(user);
    user.id = newUser.id;
  });
  // After all Delete data from users table and reset id
  // So it doesn't effect other Specs
  afterAll(async () => {
    const conn = await client.connect();
    const sql = 'ALTER SEQUENCE users_id_seq RESTART WITH 1';
    const sql2 = 'DELETE FROM users';
    await conn.query(sql);
    await conn.query(sql2);
    conn.release();
  });

  it('Should return success when trying to authenticate a valid user', async () => {
    const response = await request
      .post('/users/authenticate')
      .set('Content-type', 'application/json')
      .send({
        last_name: user.last_name,
        password: user.password
      });
        // Save the token
      tokenKey = response.body.token;
    expect(response.status).toEqual(200);
  });

  it('Should return success when creating a user ', async () => {
    const response = await request
      .post('/users')
      .set('Content-type', 'application/json')
      .send({
        first_name: 'abdullah',
        last_name: 'test',
        password: '123',
      });
    expect(response.status).toEqual(200);
  });

  it('Should return success when trying to get users with a valid token', async () => {
    const response = await request
      .get('/users')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${tokenKey}`);
    expect(response.status).toEqual(200);
  });

  it('Should return success when trying to get user with a valid token and user.id', async () => {
    const response = await request
      .get(`/users/${user.id}`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${tokenKey}`);
    expect(response.status).toEqual(200);
  });
});
