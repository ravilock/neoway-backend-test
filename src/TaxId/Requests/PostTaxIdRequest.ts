import { Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export default class PostTaxIdRequest {
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
