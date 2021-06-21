import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express-serve-static-core' {
    interface Request {
        username: string;
    }
}

export default function authenticateToken(req: Request, res: Response, next: NextFunction): any {
    const token = req.headers.authorization;

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).send({
                auth: false,
                message: 'Falha na autenticação com o token, token expirado!',
            });
        }

        req.username = decoded.username; // Decodificação do JWT será transfirida para rotas.

        next();
    });
}
