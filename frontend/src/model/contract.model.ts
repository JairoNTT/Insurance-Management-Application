import { InsuredObject } from "./insuredobject.model";
import { Person } from "./person.model";

export interface Contract {
    id?: number;
    contractNumber: string;
    grossPremium: number;
    paymentFrequency: string;
    startDate: string;
    endDate: string;
    contractState?: string;
    insuredObject: InsuredObject;
    person: Person;
}