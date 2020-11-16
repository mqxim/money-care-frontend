import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {router as signInRouter} from './components/sign-in/sign-in-routing.module';
import {router as signUpRouter} from './components/sign-up/sign-up-routing.module';

const routes: Routes = [
  ...signInRouter,
  ...signUpRouter
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
