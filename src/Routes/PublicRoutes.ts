import express, { NextFunction, Request, Response } from 'express';
import { isAliveController } from '../Home/Index';
import {
    blockTaxIdController,
    deleteTaxIdController,
    getTaxIdController,
    listTaxIdsController,
    postTaxIdController,
    unblockTaxIdController,
    updateTaxIdController,
} from '../TaxId/Index';

const publicRoutes = express.Router();

publicRoutes.get('/', (request: Request, response: Response, nextFunction: NextFunction) => {
    return isAliveController.handle(request, response, nextFunction);
});

publicRoutes.post('/taxId/:taxId/block', (request: Request, response: Response, nextFunction: NextFunction) => {
    return blockTaxIdController.handle(request, response, nextFunction);
});

publicRoutes.post('/taxId/:taxId/unblock', (request: Request, response: Response, nextFunction: NextFunction) => {
    return unblockTaxIdController.handle(request, response, nextFunction);
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

publicRoutes.put('/taxId/:uuid', (request: Request, response: Response, nextFunction: NextFunction) => {
    return updateTaxIdController.handle(request, response, nextFunction);
});

publicRoutes.delete('/taxId/:uuid', (request: Request, response: Response, nextFunction: NextFunction) => {
    return deleteTaxIdController.handle(request, response, nextFunction);
});

export { publicRoutes };
