import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu.component';
import {AngularMaterialModule} from '../../../angular-material.module';


@NgModule({
  declarations: [MenuComponent],
  exports: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class MenuModule {
}
