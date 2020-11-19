import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  CreateAccountDialogComponent,
  DeleteAccountDialogComponent,
  RenameAccountDialogComponent,
  SidenavComponent
} from './sidenav.component';
import {AngularMaterialModule} from '../../../angular-material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CreateAccountModule} from '../create-account/create-account.module';
import {DeleteAccountFormComponent} from './delete-account-form/delete-account-form.component';
import {RenameAccountFormComponent} from './rename-account-form/rename-account-form.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    SidenavComponent,
    CreateAccountDialogComponent,
    DeleteAccountFormComponent,
    DeleteAccountDialogComponent,
    RenameAccountFormComponent,
    RenameAccountDialogComponent
  ],
  exports: [
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    CreateAccountModule,
    ReactiveFormsModule,
  ]
})
export class SidenavModule {
}
