import { InsuredObject } from "./insuredobject.model";

export interface House extends InsuredObject {
    buildingType: string;
    insideArea: number;
    outsideArea: number;
    contentValue: number;
    city: string;
}