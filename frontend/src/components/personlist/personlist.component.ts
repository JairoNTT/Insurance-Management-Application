import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Person } from '../../model/person.model';
import { PersonService } from '../../services/person.service';
import { CommonModule } from '@angular/common';
import { MatSortModule, Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-personlist',
  standalone: true,
  imports: [
    CommonModule,
    MatSortModule
  ],
  templateUrl: './personlist.component.html',
  styleUrl: './personlist.component.scss'
})
export class PersonlistComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  persons: Person[] = [];
  @Output() hideTable: EventEmitter<void> = new EventEmitter<void>();
  @Output() personSelected: EventEmitter<Person> = new EventEmitter<Person>();

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    const sub = this.personService.getPersonsList().subscribe(data => {
      this.persons = data;
    });
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  closeTable(): void {
    this.hideTable.emit();
  }

  sortData(sort: Sort) {
    const data = this.persons.slice();
    if (!sort.active || sort.direction === '') {
      this.persons = data;
      return;
    }
    this.persons = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'dni': return compare(a.idNumber, b.idNumber, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'surname': return compare(a.surname, b.surname, isAsc);
        case 'age': return compare(a.age, b.age, isAsc);
        default: return 0;
      }
    });
  }

  selectPerson(person: Person): void {
    this.personSelected.emit(person);
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}