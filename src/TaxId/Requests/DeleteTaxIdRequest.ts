import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export default class DeleteTaxIdRequest {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;
}
