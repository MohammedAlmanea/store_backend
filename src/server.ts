import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import OrdersRoutes from './handlers/order';
import userRoutes from './handlers/user';
import productsRoutes from './handlers/product';



const app: express.Application = express();
const port: string = '3000';

app.use(bodyParser.json());

app.get('/', (_req:Request,res:Response) =>{
  res.send('Welcome')
});

userRoutes(app);
OrdersRoutes(app);
productsRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: http://localhost:${port}`);
});

export default app;