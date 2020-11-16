import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthState} from './store/auth/auth.reduces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'Money Care';

  constructor(private store$: Store<AuthState>) {
  }

  ngOnInit(): void {
  }
}
