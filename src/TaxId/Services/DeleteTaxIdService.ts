import ResourceNotFoundException from '../../Api/Exception/ResourceNotFoundException';
import TaxIdRepository from '../Storage/TaxIdRepository';

export default class DeleteTaxIdService {
    constructor(private readonly repository: TaxIdRepository) {}

    public async invoke(uuid: string) {
        const entity = await this.repository.findByUuid(uuid);
        if (!entity || !entity.uuid) {
            throw new ResourceNotFoundException();
        }
        await this.repository.delete(uuid);
    }
}
