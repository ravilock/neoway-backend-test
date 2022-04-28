import IApiTransformer from '../../Api/Transformers/IApiTransformer';
import ClassValidator from '../../Api/Utils/ClassValidator';
import TaxIdBlocklistDto from '../Dtos/TaxIdBlocklistDto';
import TaxIdBlocklistRequest from '../Requests/TaxIdBlocklistRequest';

export default class BlockTaxIdTransformer implements IApiTransformer<TaxIdBlocklistDto, any> {
    public async fromApi(object: any, headers?: any): Promise<TaxIdBlocklistDto> {
        const requestObject = <TaxIdBlocklistRequest>await ClassValidator.transformerToModel(TaxIdBlocklistRequest, object);

        await ClassValidator.validateInput(requestObject);

        const dto: TaxIdBlocklistDto = {
            taxId: requestObject.taxId,
        };

        return Promise.resolve(dto);
    }

    public async toApi(dto: TaxIdBlocklistDto): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
