import { Router, Request, Response } from 'express';

const logoutRoute = Router();

logoutRoute.get('/', (req: Request, res: Response) => {
    res.status(200).send({ auth: false, token: null });
});

export default logoutRoute;
