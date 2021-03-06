import ITaxIdRepository from './ITaxIdRepository';
import TaxIdEntity from './TaxIdEntity';
import { KnexInstance } from '../../Database/knex';
import ListTaxIdsDto from '../Dtos/ListTaxIdsDto';
import ResourceAlreadyExistsException from '../../Api/Exception/ResourceAlreadyExistsException';

export default class TaxIdRepository implements ITaxIdRepository {
    public async findByTaxId(taxId: string): Promise<TaxIdEntity> {
        const [queryResult] = <TaxIdEntity[]>(
            await KnexInstance('taxIds')
                .select('uuid')
                .select('taxId')
                .select('accountName')
                .select('startDate')
                .select('createdAt')
                .select('updatedAt')
                .where('taxId', taxId)
                .limit(1)
        );

        return queryResult;
    }

    public async save(entity: TaxIdEntity): Promise<TaxIdEntity> {
        await KnexInstance.insert(entity).into('taxIds');
        return Promise.resolve(entity);
    }

    public async update(entity: TaxIdEntity): Promise<TaxIdEntity> {
        const taxIdEntity = await this.findByTaxId(entity.taxId);
        if (taxIdEntity && taxIdEntity.taxId && taxIdEntity.uuid !== entity.uuid) {
            throw new ResourceAlreadyExistsException([`TaxId '${entity.taxId}' already exists.`]);
        }

        await KnexInstance('taxIds').update(entity).where('uuid', entity.uuid);

        return entity;
    }

    public async delete(uuid: string): Promise<void> {
        await KnexInstance('taxIds').where('uuid', uuid).del();
    }

    public async findByUuid(uuid: string): Promise<TaxIdEntity> {
        const [queryResult] = <TaxIdEntity[]>(
            await KnexInstance('taxIds')
                .select('uuid')
                .select('taxId')
                .select('accountName')
                .select('startDate')
                .select('createdAt')
                .select('updatedAt')
                .where('uuid', uuid)
                .limit(1)
        );

        return queryResult;
    }

    public async findAll(page?: number, pageSize?: number): Promise<TaxIdEntity[]> {
        throw new Error('Method not implemented.');
    }

    public async taxIdSearch(dto: ListTaxIdsDto): Promise<TaxIdEntity[]> {
        const { page, pageSize } = dto;
        const offset = (page - 1) * pageSize;

        // eslint-disable-next-line prettier/prettier
        const query = KnexInstance('taxIds')
            .select('uuid')
            .select('taxId')
            .select('accountName')
            .select('startDate')
            .select('createdAt')
            .select('updatedAt');

        if (dto.accountName && dto.accountName.length) query.whereLike('accountName', `%${dto.accountName}%`);
        if (dto.taxId && dto.taxId.length) query.whereLike('taxId', `%${dto.taxId}%`);

        const { startRangeDate, endRangeDate } = dto;
        if (startRangeDate && endRangeDate) {
            query.whereBetween('createdAt', [startRangeDate, endRangeDate]);
        }

        query.offset(offset).limit(pageSize);

        return await query;
    }
}
