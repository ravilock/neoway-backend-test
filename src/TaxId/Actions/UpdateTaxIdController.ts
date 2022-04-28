import { NextFunction, Request, Response } from 'express';
import IApiTransformer from '../../Api/Transformers/IApiTransformer';
import TaxIdDto from '../Dtos/TaxIdDto';
import UpdateTaxIdService from '../Services/UpdateTaxIdService';

export default class UpdateTaxIdController {
    constructor(private transformer: IApiTransformer<TaxIdDto, any>, private service: UpdateTaxIdService) {}

    public async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = <TaxIdDto>await this.transformer.fromApi({ ...req.params, ...req.body });

            await this.service.invoke(dto);

            return res.sendStatus(201);
        } catch (error) {
            next(error);
        }
    }
}
