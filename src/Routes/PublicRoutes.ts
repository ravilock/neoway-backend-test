import express, { NextFunction, Request, Response } from 'express';
import { isAliveController } from '../Home/Index';
import { getTaxIdController, listTaxIdsController, postTaxIdController } from '../TaxId/Index';

const publicRoutes = express.Router();

publicRoutes.get('/', (request: Request, response: Response, nextFunction: NextFunction) => {
    return isAliveController.handle(request, response, nextFunction);
});

publicRoutes.post('/taxId', (request: Request, response: Response, nextFunction: NextFunction) => {
    return postTaxIdController.handle(request, response, nextFunction);
});

publicRoutes.get('/taxId', (request: Request, response: Response, nextFunction: NextFunction) => {
    return listTaxIdsController.handle(request, response, nextFunction);
});

publicRoutes.get('/taxId/:uuid', (request: Request, response: Response, nextFunction: NextFunction) => {
    return getTaxIdController.handle(request, response, nextFunction);
});

export { publicRoutes };
