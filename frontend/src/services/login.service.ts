import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class LoginService {

    private userLogged$ = new BehaviorSubject<boolean>(false);

    login(): void {
        this.userLogged$.next(true);
    }

    isUserLogged(): boolean {
        return this.userLogged$.getValue();
    }
}