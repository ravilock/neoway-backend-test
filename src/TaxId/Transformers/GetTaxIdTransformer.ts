import IApiTransformer from '../../Api/Transformers/IApiTransformer';
import IDatabaseTransformer from '../../Api/Transformers/IDatabaseTransformer';
import ClassValidator from '../../Api/Utils/ClassValidator';
import TaxIdDto from '../Dtos/TaxIdDto';
import GetTaxIdResponse from '../Responses/GetTaxIdResponse';
import GetTaxIdRequest from '../Requests/GetTaxIdRequest';
import TaxIdEntity from '../Storage/TaxIdEntity';

export default class GetTaxIdTransformer implements IApiTransformer<TaxIdDto, GetTaxIdResponse>, IDatabaseTransformer<TaxIdDto, TaxIdEntity> {
    public async fromApi(object: any, headers?: any): Promise<TaxIdDto> {
        const requestObject = <GetTaxIdRequest>await ClassValidator.transformerToModel(GetTaxIdRequest, object);

        await ClassValidator.validateInput(requestObject);

        const dto: TaxIdDto = {
            uuid: requestObject.uuid,
            taxId: null,
            accountName: null,
            startDate: null,
        };

        return Promise.resolve(dto);
    }

    public async toApi(dto: TaxIdDto): Promise<GetTaxIdResponse> {
        return Promise.resolve({ taxId: dto });
    }

    public async toDto(dto: TaxIdDto, entity: TaxIdEntity): Promise<TaxIdDto> {
        return Promise.resolve({
            uuid: dto.uuid,
            taxId: entity.taxId,
            accountName: entity.accountName,
            startDate: entity.startDate,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }

    public async toEntity(dto: TaxIdDto): Promise<TaxIdEntity> {
        throw new Error('Method not implemented.');
    }
}
