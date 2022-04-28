import IDatabaseTransformer from '../../Api/Transformers/IDatabaseTransformer';
import ListTaxIdsDto from '../Dtos/ListTaxIdsDto';
import TaxIdDto from '../Dtos/TaxIdDto';
import TaxIdEntity from '../Storage/TaxIdEntity';
import TaxIdRepository from '../Storage/TaxIdRepository';

export default class ListTaxIdsService {
    constructor(private transformer: IDatabaseTransformer<TaxIdDto, TaxIdEntity>, private readonly repository: TaxIdRepository) {}

    public async invoke(dto: ListTaxIdsDto): Promise<TaxIdDto[]> {
        const entities: TaxIdEntity[] = await this.repository.taxIdSearch(dto);

        return <TaxIdDto[]>await this.transformer.toDto([], entities);
    }
}
