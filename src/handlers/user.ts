import express, { Request, Response } from 'express';
import { UserTable, User } from '../models/users';
import jwt from 'jsonwebtoken';


const Table = new UserTable();

const index = async (_req: Request, res: Response) => {
  const users = await Table.index();
  res.json(users);
};

const show = async (_req: Request, res: Response) => {
  const user = await Table.show(_req.params.id);
  res.json(user);
};

const create = async (_req: Request, res: Response) => {
  try {
    const user: User = {
      first_name: _req.body.first_name,
      last_name: _req.body.last_name,
      user_name: _req.body.user_name,
      password: _req.body.password,
    };

    const newUser = await Table.create(user);
    var token = jwt.sign(newUser ,process.env.TOKEN as string)
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};


const authenticate = async (_req: Request, res: Response) => {
  try {
    const username = _req.body.user_name;
    const password = _req.body.password;

    const auth = await Table.authenticate(username, password);
    var token = jwt.sign({auth} ,process.env.TOKEN as string)
    res.json(token);
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

const userRoutes = (app: express.Application) => {
  app.post('/users', create);
  app.post('/users/authenticate', authenticate);
  app.get('/users', index);
  app.get('/users/:id', show);
};

export default userRoutes;
