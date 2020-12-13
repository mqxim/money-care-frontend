import {Route} from '@angular/router';
import {InAppComponent} from './in-app.component';
import {AccountReportComponent} from '../account-report/account-report.component';
import {ChooseAccountComponent} from '../choose-account/choose-account.component';

const router: Route[] = [
  {
    path: '',
    component: InAppComponent,
    children: [
      {
        path: '',
        component: ChooseAccountComponent,
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
