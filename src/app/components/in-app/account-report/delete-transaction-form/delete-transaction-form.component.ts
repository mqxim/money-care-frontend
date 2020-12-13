import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-delete-transaction-form',
  template: `
    <div>
      <h1>🗑️ Are you sure to delete transaction?</h1>
      <div class="form-controls">
        <button mat-raised-button (click)="onClose()">Cancel</button>
        <button mat-raised-button color="warn" (click)="onSubmit()">Delete</button>
      </div>
    </div>
  `,
  styleUrls: ['./delete-transaction-form.component.scss']
})
export class DeleteTransactionFormComponent implements OnInit {
  form: FormGroup;

  @Output() whenSubmit = new EventEmitter();
  @Output() whenClose = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onClose(): void {
    this.whenClose.emit();
  }

  onSubmit(): void {
    this.whenSubmit.emit();
  }
}
