import { Expose } from 'class-transformer';
import { IsDateString, IsOptional } from 'class-validator';

export default class ListTaxIdsRequest {
    @Expose()
    @IsOptional()
    public page?: number;

    @Expose()
    @IsOptional()
    public taxId?: string;

    @Expose()
    @IsOptional()
    public accountName?: string;

    @Expose()
    @IsOptional()
    @IsDateString()
    public startDate: string;

    @Expose()
    @IsOptional()
    @IsDateString()
    public endDate: string;
}
