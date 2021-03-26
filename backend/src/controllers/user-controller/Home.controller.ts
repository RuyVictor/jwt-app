import { Router, Request, Response } from 'express';

// Middleware
import authenticateToken from '../../middlewares/AuthenticateToken';

const homeRoute = Router();

homeRoute.get('/', authenticateToken, (req: Request, res: Response) => {
    res.status(200).send({ message: 'Esta página ainda é acessível!' });
});

export default homeRoute;
