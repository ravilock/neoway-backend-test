import { NextFunction, Request, Response } from 'express';
import IApiTransformer from '../../Api/Transformers/IApiTransformer';
import DeleteTaxIdDto from '../Dtos/DeleteTaxIdDto';
import GetTaxIdResponse from '../Responses/GetTaxIdResponse';
import DeleteTaxIdService from '../Services/DeleteTaxIdService';

export default class DeleteTaxIdController {
    constructor(private transformer: IApiTransformer<DeleteTaxIdDto, GetTaxIdResponse>, private service: DeleteTaxIdService) {}

    public async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = <DeleteTaxIdDto>await this.transformer.fromApi({ ...req.params });

            await this.service.invoke(dto.uuid);

            return res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}
