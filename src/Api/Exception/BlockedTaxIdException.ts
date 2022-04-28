import BaseErrorException from './BaseErrorException';
import { CODE_ERROR_BLOCKED_TAX_ID } from './CodeErrors/CodeErrors';

export default class BlockedTaxIdException extends BaseErrorException {
    constructor() {
        super(400, [CODE_ERROR_BLOCKED_TAX_ID]);
    }
}
