export default interface ITaxIdBlocklistRepository {
    findByTaxId(taxId: string): Promise<string>;
    blockTaxId(taxId: string);
    unblockTaxId(taxId: string);
}
