import { NextFunction, Request, Response } from 'express';
import IApiTransformer from '../../Api/Transformers/IApiTransformer';
import TaxIdDto from '../Dtos/TaxIdDto';
import GetTaxIdResponse from '../Responses/GetTaxIdResponse';
import GetTaxIdService from '../Services/GetTaxIdService';

export default class GetTaxIdController {
    constructor(private transformer: IApiTransformer<TaxIdDto, GetTaxIdResponse>, private service: GetTaxIdService) {}

    public async handle(req: Request, res: Response, next: NextFunction) {
        try {
            let dto = <TaxIdDto>await this.transformer.fromApi({ ...req.params });

            dto = await this.service.invoke(dto);

            const response = await this.transformer.toApi(dto);

            return res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    }
}
