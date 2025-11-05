import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageNames } from '../../../model/enum';
import { NavigatorService } from '../../../services/navigator.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private policyholderId!: number;

  constructor(private navigatorService: NavigatorService, private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    const sub = this.route.queryParams.subscribe(params => {
      this.policyholderId = +params['personId']
    });
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  goToContracts(): void {
    const params: NavigationExtras = {
      queryParams: { personId: this.policyholderId }
    };
    this.navigatorService.navigateToPage(PageNames.CONTRACT, params);
  }
}
