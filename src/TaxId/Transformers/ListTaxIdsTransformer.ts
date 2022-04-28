import { CODE_ERROR_FIELDS_INVALID } from '../../Api/Exception/CodeErrors/CodeErrors';
import { InvalidFieldsException } from '../../Api/Exception/InvalidFieldsException';
import IDatabaseTransformer from '../../Api/Transformers/IDatabaseTransformer';
import ClassValidator from '../../Api/Utils/ClassValidator';
import ListTaxIdsDto from '../Dtos/ListTaxIdsDto';
import TaxIdDto from '../Dtos/TaxIdDto';
import ListTaxIdsRequest from '../Requests/ListTaxIdsRequest';
import ListTaxIdsResponse from '../Responses/ListTaxIdsResponse';
import TaxIdEntity from '../Storage/TaxIdEntity';

const DEFAULT_PAGE = 1;
const PAGE_SIZE = 25;

export default class ListTaxIdsTransformer implements IDatabaseTransformer<TaxIdDto, TaxIdEntity> {
    public async fromApi(object: any, headers?: any): Promise<ListTaxIdsDto> {
        const requestObject = <ListTaxIdsRequest>await ClassValidator.transformerToModel(ListTaxIdsRequest, object);

        await ClassValidator.validateInput(requestObject);

        const { startDate, endDate } = requestObject;
        const [startRangeDate, endRangeDate] = this.getFilterDates(startDate, endDate);

        const dto: ListTaxIdsDto = {
            page: requestObject.page || DEFAULT_PAGE,
            pageSize: PAGE_SIZE,
            taxId: requestObject.taxId,
            accountName: requestObject.accountName,
            startRangeDate,
            endRangeDate,
        };

        return dto;
    }

    private getDefaultDates(): [Date, Date] {
        const today = new Date();
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(today.getMonth() - 3);
        return [threeMonthsAgo, today];
    }

    private validateDateInterval(startRangeDate: Date, endRangeDate: Date): boolean {
        const oneYearAfterStartDate = new Date(startRangeDate);
        oneYearAfterStartDate.setFullYear(startRangeDate.getFullYear() + 1);

        return endRangeDate <= oneYearAfterStartDate;
    }

    private getFilterDates(startDate: string, endDate: string): [Date, Date] {
        if (!startDate || !endDate) {
            return this.getDefaultDates();
        }

        const startRangeDate = new Date(startDate);
        const endRangeDate = new Date(endDate);

        if (!this.validateDateInterval(startRangeDate, endRangeDate)) {
            throw new InvalidFieldsException([
                {
                    code: CODE_ERROR_FIELDS_INVALID.code,
                    message: 'Filter dates must be in 1 year range.',
                },
            ]);
        }

        return [startRangeDate, endRangeDate];
    }

    public async toApi(dtos: TaxIdDto[]): Promise<ListTaxIdsResponse> {
        return Promise.resolve({
            taxIds: dtos,
        });
    }

    public async toEntity(dto: TaxIdDto): Promise<TaxIdEntity> {
        throw new Error('Method not implemented.');
    }

    public async toDto(dto: TaxIdDto[], entities: TaxIdEntity[]): Promise<TaxIdDto[]> {
        for (const entity of entities) {
            dto.push(entity);
        }

        return dto;
    }
}
