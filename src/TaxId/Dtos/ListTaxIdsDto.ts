export default interface ListTaxIdsDto {
    page?: number;
    pageSize?: number;
    taxId?: string;
    accountName?: string;
    startRangeDate?: Date;
    endRangeDate?: Date;
}
