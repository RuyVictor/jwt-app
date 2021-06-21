import { Router } from 'express';

import loginRoute from '../controllers/user-controller/Login.controller';
import logoutRoute from '../controllers/user-controller/Logout.controller';
import homeRoute from '../controllers/user-controller/Home.controller';

import authenticateToken from '../middlewares/AuthenticateToken';

const userRoutes = Router();

userRoutes.use('/sign-in', loginRoute);
//userRoutes.use('/sign-up', loginRoute);
userRoutes.use('/logout', logoutRoute);
userRoutes.use('/home', homeRoute);
userRoutes.use('/validate', authenticateToken, (req: any, res: any) => res.send('válido'));

export default userRoutes;
