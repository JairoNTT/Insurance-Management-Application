import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PricesboxComponent } from './pricesbox.component';
import { ContractService } from '../../services/contract.service';
import { ApiService } from '../../services/api.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('PricesboxComponent', () => {
  let component: PricesboxComponent;
  let fixture: ComponentFixture<PricesboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricesboxComponent],
      providers: [
        ContractService,
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricesboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
