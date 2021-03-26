import { Router } from 'express';

import loginRoute from '../controllers/user-controller/Login.controller';
import logoutRoute from '../controllers/user-controller/Logout.controller';
import homeRoute from '../controllers/user-controller/Home.controller';

const userRoutes = Router();

userRoutes.use('/login', loginRoute);
userRoutes.use('/logout', logoutRoute);
userRoutes.use('/home', homeRoute);

export default userRoutes;
