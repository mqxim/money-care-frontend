import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountReportComponent, CreateTransactionDialogComponent, DeleteTransactionDialogComponent} from './account-report.component';
import {AngularMaterialModule} from '../../../angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateTransactionFormComponent} from './create-transaction-form/create-transaction-form.component';
import {DeleteTransactionFormComponent} from './delete-transaction-form/delete-transaction-form.component';


@NgModule({
  declarations: [
    AccountReportComponent,
    CreateTransactionFormComponent,
    CreateTransactionDialogComponent,
    DeleteTransactionFormComponent,
    DeleteTransactionDialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AccountReportModule {
}
