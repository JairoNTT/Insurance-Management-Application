import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigatorService } from '../../../services/navigator.service';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ContractService } from '../../../services/contract.service';
import { CommonModule } from '@angular/common';
import { PricesboxComponent } from "../../pricesbox/pricesbox.component";
import { Contract } from '../../../model/contract.model';
import { InsuredObject } from '../../../model/insuredobject.model';
import { Car } from '../../../model/car.model';
import { House } from '../../../model/house.model';
import { Life } from '../../../model/life.model';
import { MessageStatus, ObjectType, PageNames } from '../../../model/enum';
import { LoginService } from '../../../services/login.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { PersonService } from '../../../services/person.service';

@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PricesboxComponent
  ],
  templateUrl: './contract.component.html',
  styleUrl: './contract.component.scss'
})
export class ContractComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private brandModels: { [key: string]: string[] } = {};
  models: string[] = [];
  policyholderId!: number;

  form: FormGroup;
  formCar: FormGroup;
  formHouse: FormGroup;
  formLife: FormGroup;

  showErrors: boolean = false;
  showPrices: boolean = false;

  startStatus: number = MessageStatus.NONE;
  endStatus: number = MessageStatus.NONE;
  licenseStatus: number = MessageStatus.NONE;
  cityStatus: number = MessageStatus.NONE;
  textStatus: number = MessageStatus.NONE;

  constructor(private contractService: ContractService, private navigatorService: NavigatorService, private loginService: LoginService, protected personService: PersonService, private readonly route: ActivatedRoute) {
    this.form = new FormGroup({
      paymentFreq: new FormControl('', Validators.required),
      startDate: new FormControl('', [Validators.required, dateRangeValidator()]),
      endDate: new FormControl('', [Validators.required, dateRangeValidator()]),
      insuredObj: new FormControl('', Validators.required)
    }, { validators: startBeforeEndValidator() });

    this.formCar = new FormGroup({
      registrationNumber: new FormControl('', [Validators.required, plateValidator()]),
      brand: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      power: new FormControl('', Validators.required)
    });

    this.formHouse = new FormGroup({
      buildingType: new FormControl('', Validators.required),
      insideArea: new FormControl('', Validators.required),
      outsideArea: new FormControl('', Validators.required),
      contentValue: new FormControl('', Validators.required),
      city: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZñÑçÇáàéèíïóòúüÁÀÉÈÍÏÓÒÚÜ·\' -]*')])
    });

    this.formLife = new FormGroup({
      riskType: new FormControl('', Validators.required),
      diseaseLevel: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    if (!this.loginService.isUserLogged()) {
      this.navigatorService.navigateToPage('dashboard');
      return; 
    }
    const brandListSubscription = this.contractService.retrieveBrandList().subscribe(brands => {
      if (brands) this.brandModels = brands;
    });
    this.subscriptions.add(brandListSubscription);
    const personIdSubscription = this.route.queryParams.subscribe(params => {
      this.policyholderId = +params['personId']
    });
    this.subscriptions.add(personIdSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  markErrors(): void {
    this.startStatus = this.form.get('startDate')?.invalid ? MessageStatus.MISSING : MessageStatus.NONE;

    this.endStatus = this.form.get('endDate')?.invalid ? MessageStatus.MISSING : MessageStatus.NONE;

    const formErrors = this.form.errors;
    if (formErrors?.['startAfterEnd']) this.startStatus = this.endStatus = MessageStatus.FAILED;

    const licenseErrors = this.formCar.get('registrationNumber')?.errors;
    if (licenseErrors?.['required']) this.licenseStatus = MessageStatus.MISSING;
    else if (licenseErrors?.['invalidPlate']) this.licenseStatus = MessageStatus.FAILED;
    else this.licenseStatus = MessageStatus.NONE;

    const cityErrors = this.formHouse.get('city')?.errors;
    if (cityErrors?.['required']) this.cityStatus = MessageStatus.MISSING;
    else if (cityErrors?.['pattern']) this.cityStatus = MessageStatus.FAILED;
    else this.cityStatus = MessageStatus.NONE;

    this.textStatus = MessageStatus.NONE;
  }

  onBrandChange(brand: string): void {
    this.models = this.brandModels[brand] || [];
    this.formCar.get('model')?.setValue('');
  }

  private clearFields(): void {
    this.form.reset();
    this.formCar.reset();
    this.formHouse.reset();
    this.formLife.reset();
    this.showErrors = this.showPrices = false;
    this.startStatus = this.endStatus = this.licenseStatus = this.cityStatus = MessageStatus.NONE;
  }

  public get messageStatus(): typeof MessageStatus {
    return MessageStatus;
  }

  private buildContract(): Contract {
    let obj: InsuredObject;
    switch (this.form.get('insuredObj')?.value) {
      case ObjectType.CAR:
        obj = this.carInsuredObject;
        break;
      case ObjectType.HOUSE:
        obj = this.houseInsuredObject;
        break;
      default:
        obj = this.lifeInsuredObject;
        break;
    }
    return {
      contractNumber: Math.random().toString(36).slice(2),
      grossPremium: 0,
      paymentFrequency: this.form.get('paymentFreq')?.value,
      startDate: this.form.get('startDate')?.value,
      endDate: this.form.get('endDate')?.value,
      insuredObject: obj,
      person: this.personService.getPersonById(this.policyholderId)
    } as Contract;
  }

  private get carInsuredObject(): InsuredObject {
    return {
      type: 'Car',
      registrationNumber: this.formCar.get('registrationNumber')?.value,
      brand: this.formCar.get('brand')?.value,
      model: this.formCar.get('model')?.value,
      color: this.formCar.get('color')?.value,
      power: this.formCar.get('power')?.value
    } as Car;
  }

  private get houseInsuredObject(): InsuredObject {
    return {
      type: 'House',
      buildingType: this.formHouse.get('buildingType')?.value,
      insideArea: this.formHouse.get('insideArea')?.value,
      outsideArea: this.formHouse.get('outsideArea')?.value,
      contentValue: this.formHouse.get('contentValue')?.value,
      city: this.formHouse.get('city')?.value
    } as House;
  }

  private get lifeInsuredObject(): InsuredObject {
    return {
      type: 'Life',
      riskType: this.formLife.get('riskType')?.value,
      diseaseLevel: this.formLife.get('diseaseLevel')?.value
    } as Life;
  }

  quoteContract(): void {
    this.showErrors = true;
    this.markErrors();
    if (this.form.valid && (this.formCar.valid || this.formHouse.valid || this.formLife.valid)) {
      const contract = this.buildContract();
      this.contractService.quoteContract(contract);
      this.showPrices = true;
    }
  }

  saveAndContinue(): void { // AFEGIR REQUISIT QUE SE SELECCIONI UN PREU
    this.showErrors = true;
    this.markErrors();
    if (this.showPrices && this.form.valid && (this.formCar.valid || this.formHouse.valid || this.formLife.valid)) {
      const sub = this.contractService.createContract().subscribe(response => {
        if (response) {
          const params: NavigationExtras = {
            queryParams: { contractNum: this.contractService.getQuotedContract()?.contractNumber },
            queryParamsHandling: 'merge'
          };
          this.navigatorService.navigateToPage(PageNames.PAYMENT, params);
        }
      });
      this.subscriptions.add(sub);
    }
  }

  goToDashboard(): void {
    this.navigatorService.navigateToPage(PageNames.DASHBOARD);
  }
}

function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const date = new Date(control.value);
    const today = new Date();
    const maxDate = new Date(today.getFullYear() + 100, today.getMonth(), today.getDate());
    return (date < today || date > maxDate) ? { outOfRange: true } : null;
  }
}

function startBeforeEndValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const startDate = formGroup.get('startDate')?.value;
    const endDate = formGroup.get('endDate')?.value;
    return (startDate && endDate && new Date(startDate) >= new Date(endDate)) ? { startAfterEnd: true } : null;
  }
}

function plateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const plate = control.value;
    if (!plate) return null;
    const newPattern = /^[0-9]{4}[BCDFGHJKLMNPRSTVWXYZ]{3}$/;
    const oldPattern = /^[A-Z]{1,2}[0-9]{4}[BCDFGHJKLMNPSTUVWXYZ]{1,2}$/;
    return (newPattern.test(plate) || oldPattern.test(plate)) ? null : { invalidPlate: true };
  }
}