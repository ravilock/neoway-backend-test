import { Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';

export default class UpdateTaxIdRequest {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @Expose()
    @IsNotEmpty()
    @MinLength(11)
    @MaxLength(18)
    public taxId: string;

    @Expose()
    @IsNotEmpty()
    public accountName: string;

    @Expose()
    @IsNotEmpty()
    @IsDateString()
    public startDate: string;
}
