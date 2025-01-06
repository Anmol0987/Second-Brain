import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from './config';
interface CustomRequest extends Request {
    userId?: string;
}
export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {


    const header = req.headers['authorization'];

    if (!header) {
        res.status(401).json({
            message: 'No token provided'
        });
        return;
    }
    const decoded =jwt.verify(header as string, jwtSecret);
    if(decoded){
        //@ts-ignore
        req.userId =decoded.id;
        next();
    }
    else{
        res.status(401).json({
            message: 'Invalid token'
        });
    }


}


