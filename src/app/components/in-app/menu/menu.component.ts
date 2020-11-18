import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {UIState} from '../../../store/ui/ui.reducer';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectLoadingQueue} from '../../../store/ui/ui.selectors';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges {
  @Input() name: string;
  @Input() username: string;
  @Output() whenSignOut = new EventEmitter<void>();

  public loadingType$: Observable<string> = this.storeUI$.pipe(select(selectLoadingQueue)).pipe(map(lq => lq > 0 ? 'intermediate' : ''));
  public userInitials: string;

  constructor(
    private storeUI$: Store<UIState>,
  ) {
  }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {
    const initials = this.username?.split('', 2) ?? [];
    if (initials.length !== 2) {
      this.userInitials = '';
    } else {
      this.userInitials = initials[0].toUpperCase() + initials[1].toUpperCase();
    }
  }

  handleOnSignOut(): void {
    this.whenSignOut.emit();
  }
}