import { BehaviorSubject, of } from "rxjs";
import { Person } from "../model/person.model";
import { ActivatedRoute } from "@angular/router";

export const navigatorServiceMock = jasmine.createSpyObj(["navigateToPage"]);


export const mockPersons: Person[] = [
    { idNumber: '001', name: 'Alice', surname: 'Doe', age: 30 },
    { idNumber: '002', name: 'Bob', surname: 'Smith', age: 35 },
    { id: 1, idNumber: '00000000T', name: 'Charles', surname: 'Smith', age: 29 }
];

export const personServiceMock = jasmine.createSpyObj(['getPersonsList', 'createPerson', 'retrieveAllPerson', 'updatePerson', 'deletePerson', 'retrievePersonByIdNumber']);

export function setDefaultPersonServiceMockValues() {
    personServiceMock.getPersonsList.and.returnValue(of(mockPersons));
    personServiceMock.createPerson.and.returnValue(of({ idNumber: '00000000T' }));
    personServiceMock.updatePerson.and.returnValue(of({ status: 200 }));
    personServiceMock.deletePerson.and.returnValue(of({ status: 200 }));
    personServiceMock.retrievePersonByIdNumber.and.returnValue(of(mockPersons[2]));
}


export const mockBrandList: { [key: string]: string[] } = { 'Toyota': ['Camry', 'Corolla'], 'Ford': ['Focus', 'Fiesta'] };

export const contractServiceMock = jasmine.createSpyObj(['retrieveBrandList', 'quoteContract', 'createContract', 'getQuotedContract']);

export function setDefaultContractServiceMockValues() {
    contractServiceMock.retrieveBrandList.and.returnValue(of(mockBrandList));
    contractServiceMock.createContract.and.returnValue(of(true));
}


export const loginServiceMock = jasmine.createSpyObj(['isUserLogged', 'login']);

export function setDefaultLoginServiceMockValues() {
    loginServiceMock.isUserLogged.and.returnValue(of(true));
}


export const routeStub: Partial<ActivatedRoute> = { queryParams: of({}) };