export default interface TaxIdDto {
    uuid: string;
    taxId: string;
    accountName: string;
    startDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
