import { InsuredObject } from "./insuredobject.model";

export interface Life extends InsuredObject {
    riskType: string;
    diseaseLevel: string;
}