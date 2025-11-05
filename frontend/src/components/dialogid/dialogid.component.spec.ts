import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogidComponent } from './dialogid.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('DialogidComponent', () => {
  let component: DialogidComponent;
  let fixture: ComponentFixture<DialogidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogidComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
