import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInComponent} from './sign-in.component';
import {RouterModule} from '@angular/router';
import {AngularMaterialModule} from '../../angular-material.module';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    RouterModule,
    CommonModule,
    AngularMaterialModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SignInComponent,
  ]
})
export class SignInModule {
}
