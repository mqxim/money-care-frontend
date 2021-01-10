import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InAppComponent} from './in-app.component';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import {AngularMaterialModule} from '../../../angular-material.module';
import {SidenavModule} from '../sidenav/sidenav.module';
import {AccountReportModule} from '../account-report/account-report.module';
import {ChooseAccountModule} from '../choose-account/choose-account.module';
import {UserAccountModule} from '../user-account/user-account.module';


@NgModule({
  declarations: [InAppComponent],
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    AccountReportModule,
    AngularMaterialModule,
    SidenavModule,
    ChooseAccountModule,
    UserAccountModule,
  ]
})
export class InAppModule {
}
