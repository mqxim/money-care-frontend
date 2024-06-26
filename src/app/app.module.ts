import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { InAppModule } from './ui/in-app/in-app/in-app.module';

import { CoreUserModule } from '../core/user/core-user.module';
import { CoreSharedModule } from '../core/shared/infrastructure/core-shared.module';
import { CoreAccountModule } from '../core/account/infrastructure/core-account.module';
import { SignInComponent } from './ui/auth/sign-in.component';
import { AngularMaterialModule } from './angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './ui/auth/sign-up.component';

import { accountReportNode, accountReportReduces } from './store/account-report/account-report.reducer';
import { accountNode, accountReducer } from './store/account/account.reducer';
import { authNode, authReducer } from './store/auth/auth.reducer';
import { UINode, UIReducer } from './store/ui/ui.reducer';

import { AccountEffects } from './store/account/account.effects';
import { AccountReportEffects } from './store/account-report/account-report.effects';
import { AuthEffects } from './store/auth/auth.effects';

const effects = [
  AuthEffects,
  AccountEffects,
  AccountReportEffects,
];

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature(authNode, authReducer),
    StoreModule.forFeature(UINode, UIReducer),
    StoreModule.forFeature(accountNode, accountReducer),
    StoreModule.forFeature(accountReportNode, accountReportReduces),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot(),
    RouterModule.forRoot([]),
    InAppModule,
    CoreUserModule,
    CoreSharedModule,
    CoreAccountModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
