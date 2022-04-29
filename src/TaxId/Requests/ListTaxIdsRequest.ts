import { Expose } from 'class-transformer';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { TaxIdSearchOrderParameterEnum } from '../Enums/TaxIdSearchOrderParameterEnum';

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
    public startDate?: string;

    @Expose()
    @IsOptional()
    @IsDateString()
    public endDate?: string;

    @Expose()
    @IsOptional()
    @IsEnum(TaxIdSearchOrderParameterEnum)
    public orderBy?: string;
}
