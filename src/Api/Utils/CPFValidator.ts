export default class CPFValidator {
    private static BLOCKED_LIST: string[] = ['00000000000', '11111111111', '22222222222', '33333333333', '44444444444', '55555555555', '66666666666', '77777777777', '88888888888', '99999999999'];

    public static async isValid(document: string): Promise<boolean> {
        // CPF must be defined
        if (!document) {
            return false;
        }

        // CPF must have 11 chars
        if (document.length !== 11) {
            return false;
        }

        // CPF can't be blocked
        if (this.BLOCKED_LIST.includes(document)) {
            return false;
        }

        let numbers: string = document.substring(0, 9);
        numbers += await this.verifierDigit(numbers);
        numbers += await this.verifierDigit(numbers);

        return numbers.substring(-2) === document.substring(-2);
    }

    private static async verifierDigit(digits: string): Promise<number> {
        const numbers: number[] = digits.split('').map(number => {
            return parseInt(number, 10);
        });

        const modulus: number = numbers.length + 1;
        const multiplied: number[] = numbers.map((number, index) => number * (modulus - index));
        const mod: number = multiplied.reduce((buffer, number) => buffer + number) % 11;

        return mod < 2 ? 0 : 11 - mod;
    }
}
