import { NextFunction, Request, Response } from 'express';
import BlockTaxIdTransformer from '../Transformers/BlockTaxIdTransformer';
import BlockTaxIdService from '../Services/BlockTaxIdService';
import TaxIdBlocklistDto from '../Dtos/TaxIdBlocklistDto';

export default class BlockTaxIdController {
    constructor(private transformer: BlockTaxIdTransformer, private service: BlockTaxIdService) {}

    public async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = <TaxIdBlocklistDto>await this.transformer.fromApi({ ...req.params });

            await this.service.invoke(dto.taxId);

            return res.sendStatus(201);
        } catch (error) {
            next(error);
        }
    }
}
