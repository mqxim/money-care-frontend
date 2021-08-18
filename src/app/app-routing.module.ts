import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './ui/auth/sign-up.component';
import { InAppComponent } from './ui/in-app/in-app/in-app.component';
import { UserAccountComponent } from './ui/in-app/user-account/user-account.component';
import { AccountReportComponent } from './ui/in-app/account-report/account-report.component';
import { SignInComponent } from './ui/auth/sign-in.component';

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
  {
    path: 'sign-in',
    component: SignInComponent,
  },
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
