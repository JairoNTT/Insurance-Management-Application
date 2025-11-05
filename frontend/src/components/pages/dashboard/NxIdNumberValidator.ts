export class NxIdNumberValidator {
    public static validateNie(code: string): boolean {
        const NIE_REGEX = /^[XYZ]\d{7,8}[A-Z]$/;
        if (!NIE_REGEX.test(code)) {
            return false;
        }
        return this.validateNifNie(code);
    }
  
    public static validateNif(code: string): boolean {
        const DNI_REGEX = /^(\d{8})([A-Z])$/;
        if (!DNI_REGEX.test(code)) {
            return false;
        }
        return this.validateNifNie(code);
    }

    public static validateNifNie(code: string): boolean {
        const validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
        const REGEX = /^(X(-|\.)?0?\d{7}(-|\.)?[A-Z]|[A-Z](-|\.)?\d{7}(-|\.)?[0-9A-Z]|\d{8}(-|\.)?[A-Z])$/;
        code = code.toUpperCase();
    
        if (!REGEX.test(code)) {
            return false;
        }
    
        const nie = code
            .replace(/^X/, '0')
            .replace(/^Y/, '1')
            .replace(/^Z/, '2');
    
        const letter = code.slice(-1);
        const charIndex = Number(nie.substring(0, 8)) % 23;
    
        return validChars.charAt(charIndex) === letter;
    }
  
    public static isValidCif(cif: string): boolean {
        if (!cif || cif.length !== 9) {
            return false;
        }
    
        const letters = 'JABCDEFGHI';
        const control = cif.charAt(8);
        const letter = cif.charAt(0);
        const digits = cif.substring(1, 8);
    
        if (!letter.match(/[A-Z]/)) {
            return false;
        }
    
        let sum = 0;
        for (let i = 0; i < digits.length; ++i) {
            let digit = parseInt(digits[i], 10);
            if (isNaN(digit)) {
                return false;
            }
            if (i % 2 === 0) {
                digit *= 2;
                if (digit > 9) {
                    digit = Math.trunc(digit / 10) + (digit % 10);
                }
            }
            sum += digit;
        }
    
        const lastDigit = sum % 10 === 0 ? 0 : 10 - (sum % 10);
    
        if (letter.match(/[ABEH]/)) {
            return parseInt(control) === lastDigit;
        }
        if (letter.match(/[NPQRSW]/)) {
            return letters[lastDigit] === control.toUpperCase();
        }
        return parseInt(control) === lastDigit || letters[lastDigit] === control.toUpperCase();
    }
}