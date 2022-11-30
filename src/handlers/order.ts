import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../middleware/auth-token';
import { Order, Order_Class } from '../models/orders';

const OrderObj = new Order_Class();

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id,
    };

    const newOrder = await OrderObj.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await OrderObj.show(req.params.id);
    if (order!== null) {
    res.json(order);
    }
    else {
      res.status(404);
      res.json(`No orders were found using the given user_id`);
    }
  } catch (error) {
    res.status(400);
    res.json(`${error}`);
  }
};

const OrdersRoutes = (app: express.Application) => {
  app.get('/orders/:id',verifyAuthToken, show);
  app.post('/orders',verifyAuthToken, create);
};

export default OrdersRoutes;
