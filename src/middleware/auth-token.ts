import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    const decoded = jwt.verify(token as string, process.env.TOKEN as string);
    if (decoded) {
      next();
    } else {
      res.status(401);
      throw new Error(`Not auth`);
    }
  } catch (error) {
    res.status(401);
    next(error);
  }
};
