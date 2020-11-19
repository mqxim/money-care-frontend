import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-delete-account-form',
  template: `
    <div>
      <h1>Are you sure to delete the account?</h1>
      <span>All account data will be deleted without possibility to restore.</span>
      <div class="form-controls">
        <button mat-raised-button (click)="onClose()">Cancel</button>
        <button mat-raised-button color="warn" (click)="onSubmit()">Delete</button>
      </div>
    </div>`,
  styleUrls: ['./delete-account-form.component.scss']
})
export class DeleteAccountFormComponent implements OnInit {
  @Output() whenClose = new EventEmitter();
  @Output() whenSubmit = new EventEmitter();

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
