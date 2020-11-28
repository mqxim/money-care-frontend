import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountReportComponent } from './account-report.component';
import {AngularMaterialModule} from '../../../angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [AccountReportComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AccountReportModule { }
