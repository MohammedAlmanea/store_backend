import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../middleware/auth-token';
import { Order, Order_Class } from '../models/orders';

const OrderObj = new Order_Class();


const show = async (req: Request, res: Response) => {
  try {
    const order = await OrderObj.show(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const OrdersRoutes = (app: express.Application) => {
  app.get('/orders/:id',verifyAuthToken, show);
};

export default OrdersRoutes;
