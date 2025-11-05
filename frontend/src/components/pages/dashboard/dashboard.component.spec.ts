import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { ApiService } from '../../../services/api.service';
import { PersonService } from '../../../services/person.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NavigatorService } from '../../../services/navigator.service';
import { LoginService } from '../../../services/login.service';
import { loginServiceMock, navigatorServiceMock, personServiceMock, setDefaultLoginServiceMockValues, setDefaultPersonServiceMockValues } from '../../../shared/mocks';
import { MessageStatus, PageNames } from '../../../model/enum';
import { of } from 'rxjs';
import { Person } from '../../../model/person.model';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PersonService, useValue: personServiceMock },
        { provide: NavigatorService, useValue: navigatorServiceMock },
        { provide: LoginService, useValue: loginServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    setDefaultPersonServiceMockValues();
    setDefaultLoginServiceMockValues();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('createPerson', () => {
    it('should create a person', () => {
      component.form.setValue({
        idNumber: '00000000T',
        name: 'John',
        surname: 'Smith',
        age: 30
      });
      component.createPerson();
      expect(personServiceMock.createPerson).toHaveBeenCalled();
      expect(component.textStatus).toEqual(MessageStatus.CREATED);
    });

    it('should not create a person if person exists', () => {
      component.form.setValue({
        idNumber: '00000000T',
        name: 'John',
        surname: 'Smith',
        age: 30
      });
      personServiceMock.createPerson.and.returnValue(of({ idNumber: null }));
      component.createPerson();
      expect(component.textStatus).toEqual(MessageStatus.NONE);
    });
  });

  describe('updatePerson', () => {
    it('should update a person', () => {
      component.form.get('idNumber')?.setValue('00000000T');
      component.updatePerson();
      expect(personServiceMock.updatePerson).toHaveBeenCalled();
      expect(component.textStatus).toEqual(MessageStatus.UPDATED);
    });

    it('should not update a person if person does not exist', () => {
      component.form.get('idNumber')?.setValue('00000000T');
      personServiceMock.updatePerson.and.returnValue(of({ status: 204 }));
      component.updatePerson();
      expect(component.textStatus).toEqual(MessageStatus.NONE);
    });
  });

  describe('deletePerson', () => {
    it('should delete a person', () => {
      const dni = '00000000T';
      component.form.get('idNumber')?.setValue(dni);
      component.deletePerson();
      expect(personServiceMock.deletePerson).toHaveBeenCalledWith(dni);
      expect(component.textStatus).toEqual(MessageStatus.DELETED);
    });

    it('should not delete a person if person does not exist', () => {
      component.form.get('idNumber')?.setValue('00000000T');
      personServiceMock.deletePerson.and.returnValue(of({ status: 204 }));
      component.deletePerson();
      expect(component.textStatus).toEqual(MessageStatus.NONE);
    });
  });

  describe('goToContracts', () => {
    it('should navigate to contracts page', fakeAsync(() => {
      component.form.setValue({
        idNumber: '00000000T',
        name: 'John',
        surname: 'Smith',
        age: 30
      });
      component.goToContracts();
      tick();
      expect(navigatorServiceMock.navigateToPage).toHaveBeenCalledWith(PageNames.CONTRACT, { queryParams: { personId: 1 } });
    }));

    it('should not navigate if person does not exist', () => {
      component.form.setValue({
        idNumber: '00000001R',
        name: 'John',
        surname: 'Smith',
        age: 30
      });
      personServiceMock.retrievePersonByIdNumber.and.returnValue(of(null));
      component.goToContracts();
      expect(component.textStatus).toEqual(MessageStatus.FAILED);
    });
  });

  describe('populateForm', () => {
    it('should populate form', () => {
      const person: Person = {
        idNumber: '00000001R',
        name: 'John',
        surname: 'Smith',
        age: 30
      };
      component.populateForm(person);
      expect(component.textStatus).toEqual(MessageStatus.EXISTING);
      expect(component.form.value).toEqual(person);
    });
  });
});
