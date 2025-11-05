import { Injectable, OnDestroy } from "@angular/core";
import { ApiService } from "./api.service";
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
import { Contract } from "../model/contract.model";

@Injectable({
    providedIn: "root"
})
export class ContractService implements OnDestroy {
    private subscriptions: Subscription = new Subscription();
    private priceOptions$ = new BehaviorSubject<number[]>([]);
    private lastQuoted?: Contract;
    
    constructor(private apiService: ApiService) {}

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    createContract(): Observable<any> {
        if (this.lastQuoted) {
            this.lastQuoted.contractState = "QUOTE";
            return this.apiService.post<Contract>("/api/contract/save", this.lastQuoted);
        }
        return of({});
    }

    quoteContract(contract: Contract): void {
        const sub = this.apiService.post<number[]>("/api/contract/quote", contract).subscribe(data => {
            if (data) {
                this.priceOptions$.next(data);
                this.lastQuoted = contract;
            }
        });
        this.subscriptions.add(sub);
        /*
        this.apiService.post<number[]>("/api/contract/quote", info).subscribe({
            next: () => {
            },
            error: () => {
            },
            complete: () => {
            }
        });
        */
    }

    getPriceOptions(): BehaviorSubject<number[]> {
        return this.priceOptions$;
    }

    getQuotedContract(): Contract | undefined {
        return this.lastQuoted;
    }

    retrieveBrandList(): Observable<{ [key: string]: string[] }> {
        return this.apiService.get<{ [key: string]: string[] }>("/api/carbrand");
    }

    setPriceToQuoted(price: number): void {
        if (this.lastQuoted) this.lastQuoted.grossPremium = price;
        // else maybe return some error
    }
}