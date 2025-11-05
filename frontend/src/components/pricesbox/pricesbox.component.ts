import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContractService } from '../../services/contract.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pricesbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricesbox.component.html',
  styleUrl: './pricesbox.component.scss'
})
export class PricesboxComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  prices: number[] = [];
  
  constructor(private contractService: ContractService) {}

  ngOnInit(): void {
    const sub = this.contractService.getPriceOptions().subscribe(data => {
      this.prices = data;
    });
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  setPriceToContract(price: number): void {
    this.contractService.setPriceToQuoted(price);
  }
}