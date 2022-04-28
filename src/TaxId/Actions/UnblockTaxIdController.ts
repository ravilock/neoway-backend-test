import { NextFunction, Request, Response } from 'express';
import UnblockTaxIdTransformer from '../Transformers/UnblockTaxIdTransformer';
import UnblockTaxIdService from '../Services/UnblockTaxIdService';
import TaxIdBlocklistDto from '../Dtos/TaxIdBlocklistDto';

export default class UnblockTaxIdController {
    constructor(private transformer: UnblockTaxIdTransformer, private service: UnblockTaxIdService) {}

    public async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = <TaxIdBlocklistDto>await this.transformer.fromApi({ ...req.params });

            await this.service.invoke(dto.taxId);

            return res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}
