import { Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";

@Injectable()
export class NavigatorService {

    constructor(private readonly router: Router) {}

    navigateToPage(path: string, params?: NavigationExtras): void {
        this.router.navigate([path], params);
    }
}