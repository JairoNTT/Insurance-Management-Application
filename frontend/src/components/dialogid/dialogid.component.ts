import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageStatus } from '../../model/enum';

@Component({
  selector: 'app-dialogid',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './dialogid.component.html',
  styleUrl: './dialogid.component.scss'
})
export class DialogidComponent {
  constructor(public dialogRef: MatDialogRef<DialogidComponent>, @Inject(MAT_DIALOG_DATA) public data: {name: string}) {}

  formId: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern('[0-9]*')])
  });
  idStatus: number = MessageStatus.NONE;

  public get messageStatus(): typeof MessageStatus {
    return MessageStatus;
  }
  
  checkValidationId(): void {
    const idErrors = this.formId.get('id')?.errors;
    if (idErrors) {
      if (idErrors['required']) this.idStatus = MessageStatus.MISSING;
      else this.idStatus = MessageStatus.FAILED;
    }
    else this.idStatus = MessageStatus.NONE;
  }

  onConfirm(): void {
    if (this.formId.valid) this.dialogRef.close(this.formId.get('id')?.value);
  }
}
