import express, { Request, Response } from 'express';
import { Product, Product_Class } from '../models/products';
import { verifyAuthToken } from '../middleware/auth-token';

const ProductObj = new Product_Class();

const index = async (_req: Request, res: Response) => {
  try {
    const product = await ProductObj.index();
    res.json(product);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await ProductObj.show(req.params.id);
    if (product !== null) {
      res.json(product);
    } else {
      res.status(404);
      res.json(`There is no product with this id!`);
    }
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };

    const newProduct = await ProductObj.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productsRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
};

export default productsRoutes;
