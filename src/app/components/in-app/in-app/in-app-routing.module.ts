import {Route} from '@angular/router';
import {InAppComponent} from './in-app.component';
import {AccountReportComponent} from '../account-report/account-report.component';
import {UserAccountComponent} from '../user-account/user-account.component';

const router: Route[] = [
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
  }
];

export {
  router
};
