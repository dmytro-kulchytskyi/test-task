import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types/AuthRequest";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  (req as AuthRequest).user = {
    id: 'test',
    email: 'mail@test.com',
    name: 'Test Name',
    country: 'Ukraine'
  } 
  next();
}