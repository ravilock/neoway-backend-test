import IDatabaseTransformer from '../../Api/Transformers/IDatabaseTransformer';
import TaxIdDto from '../Dtos/TaxIdDto';
import TaxIdEntity from '../Storage/TaxIdEntity';
import ITaxIdRepository from '../Storage/ITaxIdRepository';
import ResourceNotFoundException from '../../Api/Exception/ResourceNotFoundException';

export default class UpdateTaxIdService {
    constructor(private transformer: IDatabaseTransformer<TaxIdDto, TaxIdEntity>, private readonly repository: ITaxIdRepository) {}

    public async invoke(dto: TaxIdDto) {
        const entity = <TaxIdEntity>await this.transformer.toEntity(dto);

        const taxIdEntity = await this.repository.findByUuid(entity.uuid);
        if (!taxIdEntity || !taxIdEntity.uuid) {
            throw new ResourceNotFoundException();
        }

        await this.repository.update(entity);
    }
}
