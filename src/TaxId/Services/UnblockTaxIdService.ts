import BlockTaxIdRepository from '../Storage/TaxIdBlocklistRepository';

export default class UnblockTaxIdService {
    constructor(private readonly repository: BlockTaxIdRepository) {}

    public async invoke(taxId: string) {
        await this.repository.unblockTaxId(taxId);
    }
}
