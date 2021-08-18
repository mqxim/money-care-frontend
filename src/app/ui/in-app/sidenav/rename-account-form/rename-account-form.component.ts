import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rename-account-form',
  template: `
    <div>
      <form [formGroup]="form">
        <h1>✍️ Rename account</h1>
        <mat-form-field class="full-width-input">
          <label>
            <input matInput placeholder="New name" formControlName="name" required autocomplete="off">
          </label>
          <mat-error>Name is required</mat-error>
        </mat-form-field>
        <div class="form-controls">
          <button mat-raised-button (click)="onClose()">Cancel</button>
          <button mat-raised-button color="primary" (click)="onSubmit()">Rename</button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./rename-account-form.component.scss']
})
export class RenameAccountFormComponent implements OnInit {
  @Output() whenClose = new EventEmitter();
  @Output() whenSubmit = new EventEmitter();

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required])
  });

  ngOnInit(): void {
  }

  onClose(): void {
    this.whenClose.emit();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.whenSubmit.emit({newName: this.form.controls.name.value});
    }
  }
}
