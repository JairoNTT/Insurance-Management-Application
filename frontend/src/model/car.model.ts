import { InsuredObject } from "./insuredobject.model";

export interface Car extends InsuredObject {
    registrationNumber: string;
    brand: string;
    model: string;
    color: string;
    power: number;
}