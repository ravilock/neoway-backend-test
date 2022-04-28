import { Expose } from 'class-transformer';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export default class TaxIdBlocklistRequest {
    @Expose()
    @IsNotEmpty()
    @MinLength(11)
    @MaxLength(18)
    public taxId: string;
}
