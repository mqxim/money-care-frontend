import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateAccountDialogComponent, DeleteAccountDialogComponent, SidenavComponent} from './sidenav.component';
import {AngularMaterialModule} from '../../../angular-material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CreateAccountModule} from '../create-account/create-account.module';
import {DeleteAccountFormComponent} from './delete-account-form/delete-account-form.component';

@NgModule({
  declarations: [SidenavComponent, CreateAccountDialogComponent, DeleteAccountFormComponent, DeleteAccountDialogComponent],
  exports: [
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    CreateAccountModule,
  ]
})
export class SidenavModule {
}
