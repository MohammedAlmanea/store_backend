import express, { Request, Response } from 'express';
import { UserTable, User } from '../models/users';
import jwt from 'jsonwebtoken';
import { verifyAuthToken } from '../middleware/auth-token';


const Table = new UserTable();

const index = async (_req: Request, res: Response) => {
  try {
  const users = await Table.index();
  res.json(users);
  } catch (error) {
    res.status(400);
    res.json(`Can't get users!: ${error}`);
  }
};

const show = async (_req: Request, res: Response) => {
  try {
    const user = await Table.show(_req.params.id);
    if (user !== null) {
    res.json(user);
    }
    else{
      res.status(404);
      res.json(`There is no user with this id!`)
    }
  } catch (error) {
    res.status(400);
    res.json(`Unable to find the user!: ${error}`);
  }
};

const create = async (_req: Request, res: Response) => {
  try {
    const user: User = {
      first_name: _req.body.first_name,
      last_name: _req.body.last_name,
      password: _req.body.password,
    };

    const newUser = await Table.create(user);
    const token = jwt.sign(newUser ,process.env.TOKEN as string)
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};


const authenticate = async (_req: Request, res: Response) => {
  try {
    const last_name = _req.body.last_name;
    const password = _req.body.password;

    const auth = await Table.authenticate(last_name, password);
    if(auth!== null){
    const token = jwt.sign({auth} ,process.env.TOKEN as string)
    res.status(200).json({token})
    }
    else {
      res.status(409);
      res.json('Not auth!!');
    }
  } catch (err) {
    res.status(401);
    res.json(`${err}`);
  }
};

const userRoutes = (app: express.Application) => {
  app.post('/users', create);
  app.post('/users/authenticate', authenticate);
  app.get('/users',verifyAuthToken, index);
  app.get('/users/:id',verifyAuthToken, show);
};

export default userRoutes;
