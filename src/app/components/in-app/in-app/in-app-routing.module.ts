import {Route} from '@angular/router';
import {InAppComponent} from './in-app.component';
import {AccountReportComponent} from '../account-report/account-report.component';

const router: Route[] = [
  {
    path: '',
    component: InAppComponent,
    children: [
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
