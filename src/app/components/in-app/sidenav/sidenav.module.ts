import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateAccountDialogComponent, SidenavComponent} from './sidenav.component';
import {AngularMaterialModule} from '../../../angular-material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CreateAccountModule} from '../create-account/create-account.module';

@NgModule({
  declarations: [SidenavComponent, CreateAccountDialogComponent],
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
