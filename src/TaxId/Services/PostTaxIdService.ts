import IDatabaseTransformer from '../../Api/Transformers/IDatabaseTransformer';
import TaxIdDto from '../Dtos/TaxIdDto';
import TaxIdEntity from '../Storage/TaxIdEntity';
import { KnexInstance } from '../../Database/knex';
import ResourceAlreadyExistsException from '../../Api/Exception/ResourceAlreadyExistsException';

export default class PostTaxIdService {
    constructor(private transformer: IDatabaseTransformer<TaxIdDto, TaxIdEntity>) {}

    public async invoke(dto: TaxIdDto) {
        const entity = <TaxIdEntity>await this.transformer.toEntity(dto);

        try {
            await KnexInstance.insert(entity).into('taxIds');
        } catch (error) {
            if (error.detail.includes('already exists')) {
                throw new ResourceAlreadyExistsException([`TaxId '${dto.taxId}' already exists.`]);
            }
            throw error;
        }
    }
}
