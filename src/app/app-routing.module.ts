import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { router as signInRouter } from './components/sign-in/sign-in-routing.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { InAppComponent } from './components/in-app/in-app/in-app.component';
import { UserAccountComponent } from './components/in-app/user-account/user-account.component';
import { AccountReportComponent } from './components/in-app/account-report/account-report.component';

const routes: Routes = [
  {
    path: '',
    component: InAppComponent,
    children: [
      {
        path: '',
        component: UserAccountComponent,
      },
      {
        path: 'account/:id',
        component: AccountReportComponent
      }
    ]
  },
  ...signInRouter,
  {
    path: 'sign-up',
    component: SignUpComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
