import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ContractComponent } from './contract.component';
import { ContractService } from '../../../services/contract.service';
import { ApiService } from '../../../services/api.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NavigatorService } from '../../../services/navigator.service';
import { contractServiceMock, loginServiceMock, navigatorServiceMock, routeStub, setDefaultContractServiceMockValues, setDefaultLoginServiceMockValues } from '../../../shared/mocks';
import { LoginService } from '../../../services/login.service';
import { ActivatedRoute } from '@angular/router';
import { MessageStatus, ObjectType, PageNames } from '../../../model/enum';

describe('ContractComponent', () => {
  let component: ContractComponent;
  let fixture: ComponentFixture<ContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractComponent],
      providers: [
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: NavigatorService, useValue: navigatorServiceMock },
        { provide: ContractService, useValue: contractServiceMock },
        { provide: LoginService, useValue: loginServiceMock },
        { provide: ActivatedRoute, useValue: routeStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractComponent);
    component = fixture.componentInstance;
    setDefaultContractServiceMockValues();
    setDefaultLoginServiceMockValues();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('markErrors', () => {
    it('should mark errors correctly', () => {
      component.form.get('startDate')?.setErrors({ 'invalid': true });
      component.markErrors();
      expect(component.startStatus).toEqual(MessageStatus.MISSING);

      component.formCar.get('registrationNumber')?.setErrors({ 'invalidPlate': true });
      component.markErrors();
      expect(component.licenseStatus).toEqual(MessageStatus.FAILED);

      component.formHouse.get('city')?.setErrors({ 'pattern': true });
      component.markErrors();
      expect(component.cityStatus).toEqual(MessageStatus.FAILED);
    });

    it('should detect wrong dates', () => {
      const today = new Date();
      component.form.get('startDate')?.setValue(today);
      component.form.get('endDate')?.setValue(today);
      component.markErrors();
      expect(component.startStatus).toEqual(MessageStatus.FAILED);
      expect(component.endStatus).toEqual(MessageStatus.FAILED);

      component.formCar.get('registrationNumber')?.setValue('0000BBB');
      component.markErrors();
      expect(component.licenseStatus).toEqual(MessageStatus.NONE);

      component.formHouse.get('city')?.setValue('Barcelona');
      component.markErrors();
      expect(component.cityStatus).toEqual(MessageStatus.NONE);
    });
  });

  describe('onBrandChange', () => {
    it('should update models', () => {
      const brand = 'Toyota';
      component.onBrandChange(brand);
      expect(component.models).toEqual(['Camry', 'Corolla']);
    });
  });

  describe('quoteContract', () => {
    it('should call contract service to quote', () => {
      const today = new Date();
      const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
      const dayAfter = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
      component.form.setValue({
        paymentFreq: 'monthly',
        startDate: tomorrow,
        endDate: dayAfter,
        insuredObj: ObjectType.LIFE
      });
      component.formLife.setValue({
        riskType: 'high',
        diseaseLevel: 'low'
      });
      component.quoteContract();
      expect(contractServiceMock.quoteContract).toHaveBeenCalled();
      expect(component.showPrices).toBeTrue();
    });
  });

  describe('saveAndContinue', () => {
    it('should navigate to payment page', fakeAsync(() => {
      const today = new Date();
      const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
      const dayAfter = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
      component.showPrices = true;
      component.form.setValue({
        paymentFreq: 'monthly',
        startDate: tomorrow,
        endDate: dayAfter,
        insuredObj: ObjectType.LIFE
      });
      component.formLife.setValue({
        riskType: 'high',
        diseaseLevel: 'low'
      });
      component.saveAndContinue();
      tick();
      expect(navigatorServiceMock.navigateToPage).toHaveBeenCalledWith(PageNames.PAYMENT, { queryParams: { contractNum: undefined }, queryParamsHandling: 'merge' });
    }));
  });

  describe('goToDashboard', () => {
    it('should navigate to dashboard', () => {
      component.goToDashboard();
      expect(navigatorServiceMock.navigateToPage).toHaveBeenCalledWith(PageNames.DASHBOARD);
    });
  });
});