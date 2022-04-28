export default interface ITaxIdBlocklistRepository {
    blockTaxId(taxId: string);
    unblockTaxId(taxId: string);
}
