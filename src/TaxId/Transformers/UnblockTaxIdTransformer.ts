import { CODE_ERROR_FIELDS_INVALID } from '../../Api/Exception/CodeErrors/CodeErrors';
import { InvalidFieldsException } from '../../Api/Exception/InvalidFieldsException';
import IApiTransformer from '../../Api/Transformers/IApiTransformer';
import ClassValidator from '../../Api/Utils/ClassValidator';
import CPFValidator from '../../Api/Utils/CPFValidator';
import TaxIdBlocklistDto from '../Dtos/TaxIdBlocklistDto';
import TaxIdBlocklistRequest from '../Requests/TaxIdBlocklistRequest';

export default class UnblockTaxIdTransformer implements IApiTransformer<TaxIdBlocklistDto, any> {
    public async fromApi(object: any, headers?: any): Promise<TaxIdBlocklistDto> {
        const requestObject = <TaxIdBlocklistRequest>await ClassValidator.transformerToModel(TaxIdBlocklistRequest, object);

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

        const dto: TaxIdBlocklistDto = {
            taxId: requestObject.taxId,
        };

        return Promise.resolve(dto);
    }

    public async toApi(dto: TaxIdBlocklistDto): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
