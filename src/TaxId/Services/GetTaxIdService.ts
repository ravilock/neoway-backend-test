import ResourceNotFoundException from '../../Api/Exception/ResourceNotFoundException';
import IDatabaseTransformer from '../../Api/Transformers/IDatabaseTransformer';
import TaxIdDto from '../Dtos/TaxIdDto';
import TaxIdEntity from '../Storage/TaxIdEntity';
import TaxIdRepository from '../Storage/TaxIdRepository';

export default class GetTaxIdService {
    constructor(private transformer: IDatabaseTransformer<TaxIdDto, TaxIdEntity>, private readonly repository: TaxIdRepository) {}

    public async invoke(dto: TaxIdDto): Promise<TaxIdDto> {
        try {
            const entity = <TaxIdEntity>await this.repository.findByUuid(dto.uuid);
            return <TaxIdDto>await this.transformer.toDto(dto, entity);
        } catch (e) {
            throw new ResourceNotFoundException();
        }
    }
}
