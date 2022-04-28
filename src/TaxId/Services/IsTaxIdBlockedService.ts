import TaxIdBlocklistRepository from '../Storage/TaxIdBlocklistRepository';

export default class IsTaxIdBlockedService {
    constructor(private readonly repository: TaxIdBlocklistRepository) {}

    public async invoke(taxId: string): Promise<boolean> {
        const blockedTaxId = await this.repository.findByTaxId(taxId);
        return blockedTaxId === taxId;
    }
}
