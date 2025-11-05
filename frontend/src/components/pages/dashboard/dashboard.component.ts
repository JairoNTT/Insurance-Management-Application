import { Component, OnDestroy, OnInit } from '@angular/core';
import { PersonService } from '../../../services/person.service';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PersonlistComponent } from '../../personlist/personlist.component';
import { NxIdNumberValidator } from './NxIdNumberValidator';
import { NavigatorService } from '../../../services/navigator.service';
import { Person } from '../../../model/person.model';
import { MessageStatus, PageNames } from '../../../model/enum';
import { Observable, of, Subscription } from 'rxjs';
import { LoginService } from '../../../services/login.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PersonlistComponent,
    //DialogidComponent,
    //MatDialogModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  form: FormGroup;
  showPersonList: boolean = false;
  
  textStatus: number = MessageStatus.NONE;
  dniStatus: number = MessageStatus.NONE;
  nameStatus: number = MessageStatus.NONE;
  surnameStatus: number = MessageStatus.NONE;
  ageStatus: number = MessageStatus.NONE;

  constructor(private personService: PersonService, private navigatorService: NavigatorService, private loginService: LoginService) {
    this.form = new FormGroup({
      idNumber: new FormControl('', [Validators.required, dniValidator()]),
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZñÑçÇáàéèíïóòúüÁÀÉÈÍÏÓÒÚÜ· ]*')]),
      surname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZñÑçÇáàéèíïóòúüÁÀÉÈÍÏÓÒÚÜ·\' -]*')]),
      age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(200), Validators.pattern('^[1-9][0-9]*')])
    });
  }

  ngOnInit(): void {
    this.loginService.login();
    this.personService.retrieveAllPerson();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private checkValidations(): void {
    const { idNumber, name, surname, age } = this.form.controls;
    this.dniStatus = this.getStatus(idNumber);
    this.nameStatus = this.getStatus(name);
    this.surnameStatus = this.getStatus(surname);
    this.ageStatus = this.getStatus(age);
  }

  private getStatus(control: AbstractControl): number {
    const errors = control.errors;
    if (!errors) return MessageStatus.NONE;
    if (errors['required']) return MessageStatus.MISSING
    return MessageStatus.FAILED;
  }

  private clearFields(): void {
    this.form.reset();
    this.dniStatus = this.nameStatus = this.surnameStatus = this.ageStatus = MessageStatus.NONE;
  }

  private formatName(name: string): string {
    if (name !== null) {
      return name.toLowerCase().split(' ').map(word =>
        word.split("'").map(part =>
          part.charAt(0).toUpperCase() + part.slice(1)
        ).join("'")
      ).join(' ');
    }
    else return "";
  }

  private createPersonPayload(): Person {
    return {
      idNumber: this.form.get("idNumber")?.value,
      name: this.formatName(this.form.get("name")?.value),
      surname: this.formatName(this.form.get("surname")?.value),
      age: this.form.get("age")?.value
    };
  }

  goToContracts(): void {
    this.checkValidations();
    if (this.form.valid) {
      const sub = this.personService.retrievePersonByIdNumber(this.form.get("idNumber")?.value).subscribe(person => {
        if (person && person.idNumber !== null) {
          const params: NavigationExtras = {
            queryParams: {
              personId: this.personService.getPersonsList().getValue().find(personItem => {
                if (personItem.idNumber === this.form.get("idNumber")?.value) return personItem;
                else return;
              })?.id
            }
          };
          this.navigatorService.navigateToPage(PageNames.CONTRACT, params);
        }
        else this.textStatus = MessageStatus.FAILED;
      });
      this.subscriptions.add(sub);
    }
  }

  hidePersonList(): void {
    this.showPersonList = false;
  }

  populateForm(person: Person): void {
    this.textStatus = MessageStatus.EXISTING;
    this.form.setValue({
      idNumber: person.idNumber,
      name: person.name,
      surname: person.surname,
      age: person.age
    });
    this.checkValidations();
  }

  fillFormIfPersonExists(): void {
    const idNumber = this.form.get("idNumber");
    if (idNumber?.valid) {
      const sub = this.personService.retrievePersonByIdNumber(idNumber.value).subscribe(person => {
        if (person && person.idNumber !== null) this.populateForm(person);
        else this.textStatus = MessageStatus.MISSING;
      });
      this.subscriptions.add(sub);
    }
    else this.textStatus = MessageStatus.NONE;
  }

  public get messageStatus(): typeof MessageStatus {
    return MessageStatus;
  }

  // MAIN OPERATIONS FROM HERE

  createPerson(): void {
    this.checkValidations();
    if (this.form.valid && this.textStatus !== MessageStatus.EXISTING) {
      const person: Person = this.createPersonPayload();
      const sub = this.personService.createPerson(person).subscribe(createdPerson => {
        if (createdPerson.idNumber !== null) {
          this.textStatus = MessageStatus.CREATED;
          this.clearFields();
          this.personService.retrieveAllPerson();
        }
        else this.textStatus = MessageStatus.NONE;
      });
      this.subscriptions.add(sub);
    }
  }

  retrieveAllPerson(): void {
    this.showPersonList = true;
    this.personService.retrieveAllPerson();
    this.textStatus = MessageStatus.NONE;
    this.clearFields();
  }

  updatePerson(): void {
    this.dniStatus = this.getStatus(this.form.controls['idNumber']);
    if (this.form.get("idNumber")?.valid && this.textStatus !== MessageStatus.MISSING) {
      const person: Person = this.createPersonPayload();
      const sub = this.personService.updatePerson(person).subscribe(response => {
        if (response.status === 200) {
          this.textStatus = MessageStatus.UPDATED;
          this.clearFields();
          this.personService.retrieveAllPerson();
        }
        else if (response.status === 204) this.textStatus = MessageStatus.NONE;
      });
      this.subscriptions.add(sub);
    }
  }

  deletePerson(): void {
    this.dniStatus = this.getStatus(this.form.controls['idNumber']);
    if (this.form.get("idNumber")?.valid && this.textStatus !== MessageStatus.MISSING) {
      const sub = this.personService.deletePerson(this.form.get("idNumber")?.value).subscribe(response => {
        if (response.status === 200) {
          this.textStatus = MessageStatus.DELETED;
          this.clearFields();
          this.personService.retrieveAllPerson();
        }
        else if (response.status === 204) this.textStatus = MessageStatus.NONE;
      });
      this.subscriptions.add(sub);
    }
  }
}

function dniValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    const isValid = NxIdNumberValidator.validateNif(value) ||
                    NxIdNumberValidator.validateNie(value) ||
                    NxIdNumberValidator.isValidCif(value);
    return isValid ? null : { invalidIdNumber: true };
  }
}