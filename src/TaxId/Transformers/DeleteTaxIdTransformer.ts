import IApiTransformer from '../../Api/Transformers/IApiTransformer';
import DeleteTaxIdDto from '../Dtos/DeleteTaxIdDto';
import ClassValidator from '../../Api/Utils/ClassValidator';
import GetTaxIdResponse from '../Responses/GetTaxIdResponse';
import GetTaxIdRequest from '../Requests/GetTaxIdRequest';

export default class DeleteTaxIdTransformer implements IApiTransformer<DeleteTaxIdDto, GetTaxIdResponse> {
    public async fromApi(object: any, headers?: any): Promise<DeleteTaxIdDto> {
        const requestObject = <GetTaxIdRequest>await ClassValidator.transformerToModel(GetTaxIdRequest, object);

        await ClassValidator.validateInput(requestObject);

        const dto: DeleteTaxIdDto = {
            uuid: requestObject.uuid,
        };

        return Promise.resolve(dto);
    }

    public async toApi(dto: DeleteTaxIdDto | DeleteTaxIdDto[]): Promise<GetTaxIdResponse | GetTaxIdResponse[]> {
        throw new Error('Method not implemented.');
    }
}
