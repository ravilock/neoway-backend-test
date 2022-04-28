import IDatabaseTransformer from '../../Api/Transformers/IDatabaseTransformer';
import TaxIdDto from '../Dtos/TaxIdDto';
import TaxIdEntity from '../Storage/TaxIdEntity';
import ResourceAlreadyExistsException from '../../Api/Exception/ResourceAlreadyExistsException';
import ITaxIdRepository from '../Storage/ITaxIdRepository';

export default class PostTaxIdService {
    constructor(private transformer: IDatabaseTransformer<TaxIdDto, TaxIdEntity>, private readonly repository: ITaxIdRepository) {}

    public async invoke(dto: TaxIdDto) {
        const entity = <TaxIdEntity>await this.transformer.toEntity(dto);

        const taxIdEntity = await this.repository.findByTaxId(dto.taxId);
        if (taxIdEntity && taxIdEntity.taxId) {
            throw new ResourceAlreadyExistsException([`TaxId '${dto.taxId}' already exists.`]);
        }

        await this.repository.save(entity);
    }
}
