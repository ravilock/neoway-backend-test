import { NextFunction, Request, Response } from 'express';
import ListTaxIdsDto from '../Dtos/ListTaxIdsDto';
import ListTaxIdsService from '../Services/ListTaxIdsService';
import TaxIdDto from '../Dtos/TaxIdDto';
import ListTaxIdsTransformer from '../Transformers/ListTaxIdsTransformer';
import ListTaxIdsResponse from '../Responses/ListTaxIdsResponse';

export default class ListTaxIdsController {
    constructor(private transformer: ListTaxIdsTransformer, private service: ListTaxIdsService) {}

    public async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = <ListTaxIdsDto>await this.transformer.fromApi({ ...req.query });

            const dtos = <TaxIdDto[]>await this.service.invoke(dto);

            const response = <ListTaxIdsResponse>await this.transformer.toApi(dtos);

            return res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    }
}
