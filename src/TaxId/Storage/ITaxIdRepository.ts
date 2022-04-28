import { IRepository } from '../../Api/Storage/IRepository';
import ListTaxIdsDto from '../Dtos/ListTaxIdsDto';
import TaxIdEntity from './TaxIdEntity';

export default interface ITaxIdRepository extends IRepository<TaxIdEntity> {
    findByTaxId(taxId: string, searchDeleted?: boolean): Promise<TaxIdEntity>;
    taxIdSearch(dto: ListTaxIdsDto): Promise<TaxIdEntity[]>;
}
