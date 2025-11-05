import { Injectable, OnDestroy } from "@angular/core";
import { ApiService } from "./api.service";
import { Person } from "../model/person.model";
import { BehaviorSubject, Observable, Subscription } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class PersonService implements OnDestroy {
    private subscriptions: Subscription = new Subscription();
    private personsSubject$ = new BehaviorSubject<Person[]>([]);

    constructor(private apiService: ApiService) {}

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    createPerson(info: Person) : Observable<Person> {
        return this.apiService.post<Person>("/api/person", info);
    }

    retrieveAllPerson() : void {
        const sub = this.apiService.get<Person[]>("/api/person").subscribe(data => {
            this.personsSubject$.next(data);
        });
        this.subscriptions.add(sub);
    }

    getPersonById(id: number): Person | undefined {
        return this.personsSubject$.getValue().find(person => {
            if (person.id === id) return person;
            return;
          });
    }

    retrievePersonByIdNumber(idNumber: string): Observable<Person> {
        return this.apiService.get<Person>("/api/person/" + idNumber);
    }

    updatePerson(info: Person) : Observable<any> {
        return this.apiService.put("/api/person", info, {observe: 'response'});
    }

    deletePerson(idNumber: string) : Observable<any> {
        return this.apiService.delete("/api/person/" + idNumber, {observe: 'response'});
    }

    getPersonsList() : BehaviorSubject<Person[]> {
        return this.personsSubject$;
    }
}