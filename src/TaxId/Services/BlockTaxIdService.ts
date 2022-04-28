import ResourceAlreadyExistsException from '../../Api/Exception/ResourceAlreadyExistsException';
import BlockTaxIdRepository from '../Storage/TaxIdBlocklistRepository';

export default class BlockTaxIdService {
    constructor(private readonly repository: BlockTaxIdRepository) {}

    public async invoke(taxId: string) {
        try {
            await this.repository.blockTaxId(taxId);
        } catch (error) {
            throw new ResourceAlreadyExistsException(['TaxId Already Blocked.']);
        }
    }
}
