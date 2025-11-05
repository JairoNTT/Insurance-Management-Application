import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonlistComponent } from './personlist.component';
import { PersonService } from '../../services/person.service';
import { ApiService } from '../../services/api.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Sort } from '@angular/material/sort';
import { mockPersons, personServiceMock, setDefaultPersonServiceMockValues } from '../../shared/mocks';

describe('PersonlistComponent', () => {
  let component: PersonlistComponent;
  let fixture: ComponentFixture<PersonlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PersonlistComponent, 
        NoopAnimationsModule
      ],
      providers: [
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting,
        { provide: PersonService, useValue: personServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonlistComponent);
    component = fixture.componentInstance;
    setDefaultPersonServiceMockValues();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('closeTable', () => {
    it('should emit hideTable event', () => {
      spyOn(component.hideTable, 'emit');
      component.closeTable();
      expect(component.hideTable.emit).toHaveBeenCalled();
    });
  });

  describe('sortData', () => {
    it('should sort by name asc', () => {
      const sort: Sort = { active: 'name', direction: 'asc' };
      component.sortData(sort);
      expect(component.persons[0].name).toEqual('Alice');
    });

    it('should sort by age desc', () => {
      const sort: Sort = { active: 'age', direction: 'desc' };
      component.sortData(sort);
      expect(component.persons[0].age).toEqual(35);
    });
  });

  describe('selectPerson', () => {
    it('should emit personSelected event', () => {
      spyOn(component.personSelected, 'emit');
      const person = mockPersons[0];
      component.selectPerson(person);
      expect(component.personSelected.emit).toHaveBeenCalledWith(person);
    });
  });
});
