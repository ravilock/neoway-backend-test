export default interface TaxIdEntity {
    uuid: string;
    taxId: string;
    accountName: string;
    startDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    deleted?: boolean;
}
