import IApiTransformer from '../../Api/Transformers/IApiTransformer';
import ClassValidator from '../../Api/Utils/ClassValidator';
import TaxIdDto from '../Dtos/TaxIdDto';
import TaxIdEntity from '../Storage/TaxIdEntity';
import CPFValidator from '../../Api/Utils/CPFValidator';
import { InvalidFieldsException } from '../../Api/Exception/InvalidFieldsException';
import { CODE_ERROR_FIELDS_INVALID } from '../../Api/Exception/CodeErrors/CodeErrors';
import IDatabaseTransformer from '../../Api/Transformers/IDatabaseTransformer';
import UpdateTaxIdRequest from '../Requests/UpdateTaxIdRequest';

export default class UpdateTaxIdTransformer implements IApiTransformer<TaxIdDto, any>, IDatabaseTransformer<TaxIdDto, TaxIdEntity> {
    public async fromApi(object: any, headers?: any): Promise<TaxIdDto> {
        const requestObject = <UpdateTaxIdRequest>await ClassValidator.transformerToModel(UpdateTaxIdRequest, object);

        await ClassValidator.validateInput(requestObject);

        const taxId = requestObject.taxId.replace(/[^\d]/g, '');
        const taxIdIsValid = taxId.length > 11 ? true : await CPFValidator.isValid(taxId);

        if (!taxIdIsValid) {
            throw new InvalidFieldsException([
                {
                    code: CODE_ERROR_FIELDS_INVALID.code,
                    message: 'Tax id is invalid',
                },
            ]);
        }

        const dto: TaxIdDto = {
            uuid: requestObject.uuid,
            taxId,
            accountName: requestObject.accountName,
            startDate: new Date(requestObject.startDate),
            updatedAt: new Date(),
        };

        return Promise.resolve(dto);
    }

    public async toApi(dto: TaxIdDto): Promise<any> {
        throw new Error('Method not implemented.');
    }

    public async toDto(dto: TaxIdDto): Promise<TaxIdDto> {
        throw new Error('Method not implemented.');
    }

    public async toEntity(dto: TaxIdDto): Promise<TaxIdEntity> {
        return Promise.resolve({
            uuid: dto.uuid,
            taxId: dto.taxId,
            accountName: dto.accountName,
            startDate: dto.startDate,
            updatedAt: dto.updatedAt,
        });
    }
}
