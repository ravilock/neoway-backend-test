import { IRepository } from '../../Api/Storage/IRepository';
import TaxIdEntity from './TaxIdEntity';

export default interface ITaxIdRepository extends IRepository<TaxIdEntity> {
    findByTaxId(taxId: string, searchDeleted?: boolean): Promise<TaxIdEntity>;
}
