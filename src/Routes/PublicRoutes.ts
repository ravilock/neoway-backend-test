import express, { NextFunction, Request, Response } from 'express';
import { isAliveController } from '../Home/Index';
import { postTaxIdController } from '../TaxId/Index';

const publicRoutes = express.Router();

publicRoutes.get('/', (request: Request, response: Response, nextFunction: NextFunction) => {
    return isAliveController.handle(request, response, nextFunction);
});

publicRoutes.post('/taxId', (request: Request, response: Response, nextFunction: NextFunction) => {
    return postTaxIdController.handle(request, response, nextFunction);
});

export { publicRoutes };
