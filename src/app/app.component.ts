import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthState} from './store/auth/auth.reducer';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'Money Care';

  constructor(
    private store$: Store<AuthState>,
    private router: Router
    ) {
  }

  async ngOnInit(): Promise<void> {
  }
}
