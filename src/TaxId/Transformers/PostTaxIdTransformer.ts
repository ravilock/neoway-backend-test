import IApiTransformer from '../../Api/Transformers/IApiTransformer';
import ClassValidator from '../../Api/Utils/ClassValidator';
import TaxIdDto from '../Dtos/TaxIdDto';
import TaxIdEntity from '../Storage/TaxIdEntity';
import PostTaxIdRequest from '../Requests/PostTaxIdRequest';
import { v4 as uuid } from 'uuid';
import CPFValidator from '../../Api/Utils/CPFValidator';
import { InvalidFieldsException } from '../../Api/Exception/InvalidFieldsException';
import { CODE_ERROR_FIELDS_INVALID } from '../../Api/Exception/CodeErrors/CodeErrors';
import IDatabaseTransformer from '../../Api/Transformers/IDatabaseTransformer';

export default class PostTaxIdTransformer implements IApiTransformer<TaxIdDto, any>, IDatabaseTransformer<TaxIdDto, TaxIdEntity> {
    public async fromApi(object: any, headers?: any): Promise<TaxIdDto> {
        const requestObject = <PostTaxIdRequest>await ClassValidator.transformerToModel(PostTaxIdRequest, object);

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
            uuid: uuid(),
            taxId,
            accountName: requestObject.accountName,
            startDate: new Date(requestObject.startDate),
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
        });
    }
}
