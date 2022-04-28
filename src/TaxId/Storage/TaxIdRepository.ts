import ITaxIdRepository from './ITaxIdRepository';
import TaxIdEntity from './TaxIdEntity';
import { KnexInstance } from '../../Database/knex';

export default class TaxIdRepository implements ITaxIdRepository {
    public async findByTaxId(taxId: string, searchDeleted = false): Promise<TaxIdEntity> {
        const [queryResult] = <TaxIdEntity[]>(
            await KnexInstance('taxIds')
                .select('uuid')
                .select('taxId')
                .select('accountName')
                .select('startDate')
                .select('createdAt')
                .select('updatedAt')
                .where('taxId', taxId)
                .andWhere('deleted', searchDeleted)
                .limit(1)
        );

        return queryResult;
    }

    public async save(entity: TaxIdEntity): Promise<TaxIdEntity> {
        await KnexInstance.insert(entity).into('taxIds');
        return Promise.resolve(entity);
    }

    public async update(entity: TaxIdEntity): Promise<TaxIdEntity> {
        throw new Error('Method not implemented.');
    }

    public async delete(uuid: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async findById(uuid: string): Promise<TaxIdEntity> {
        throw new Error('Method not implemented.');
    }

    public async findAll(page?: number, pageSize?: number): Promise<TaxIdEntity[]> {
        throw new Error('Method not implemented.');
    }
}
