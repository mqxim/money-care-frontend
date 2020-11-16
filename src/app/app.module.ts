import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {AuthEffects} from './store/auth/auth.effects';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {SignInModule} from './components/sign-in/sign-in.module';
import {SignUpModule} from './components/sign-up/sign-up.module';
import {InAppModule} from './components/in-app/in-app/in-app.module';

import {UINode, UIReducer} from './store/ui/ui.reducer';
import {authNode, authReducer} from './store/auth/auth.reducer';

const effects = [
  AuthEffects,
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot(),
    RouterModule.forRoot([]),

    StoreModule.forFeature(authNode, authReducer),
    StoreModule.forFeature(UINode, UIReducer),

    SignInModule,
    SignUpModule,
    InAppModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
