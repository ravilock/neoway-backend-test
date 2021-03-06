import { KnexInstance } from '../../Database/knex';
import ITaxIdBlocklistRepository from './ITaxIdBlocklistRepository';

export default class TaxIdBlocklistRepository implements ITaxIdBlocklistRepository {
    public async findByTaxId(taxId: string): Promise<string> {
        const [blockedTaxId] = await KnexInstance('taxIdsBlocklist').select('taxId').where('taxId', taxId).limit(1);

        return blockedTaxId?.taxId;
    }

    public async blockTaxId(taxId: string) {
        await KnexInstance.insert({ taxId }).into('taxIdsBlocklist');
    }

    public async unblockTaxId(taxId: string) {
        await KnexInstance('taxIdsBlocklist').where('taxId', taxId).del();
    }
}
