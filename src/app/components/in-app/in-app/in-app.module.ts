import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InAppComponent} from './in-app.component';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';


@NgModule({
  declarations: [InAppComponent],
  imports: [
    CommonModule,
    RouterModule,
    MenuModule
  ]
})
export class InAppModule {
}
