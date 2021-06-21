import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const loginRoute = Router();

interface UserPayload {
    email: string;
}

function generateAccessToken(userPayload: UserPayload): string {
    return jwt.sign(userPayload, process.env.TOKEN_SECRET as string, {
        expiresIn: process.env.TOKEN_TIME,
    });
}

loginRoute.post('/', (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userPayload: UserPayload = { email };

    if (email === 'test@gmail.com' && password === '123') {
        const token = generateAccessToken(userPayload);

        return res.status(200).send({ auth: true, token });
    }

    res.status(401).send('Login inválido!');
});

export default loginRoute;
