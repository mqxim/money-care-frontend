import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserAccountComponent, ChangePasswordFormComponent, ChangeUserInfoFormComponent} from './user-account.component';
import {AngularMaterialModule} from '../../../angular-material.module';
import {ChangeUserInfoComponent} from './change-user-info/change-user-info.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    UserAccountComponent,
    ChangeUserInfoComponent,
    ChangePasswordComponent,
    ChangePasswordFormComponent,
    ChangeUserInfoFormComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ]
})
export class UserAccountModule {
}
