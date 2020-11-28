import {Action} from '@ngrx/store';

enum UIActionTypes {
  BEGIN_LOADING = '[UI] BEGIN_LOADING',
  END_LOADING = '[UI] END_LOADING',
}

class UIBeginLoadingAction implements Action {
  readonly type = UIActionTypes.BEGIN_LOADING;
}

class UIEndLoadingAction implements Action {
  readonly type = UIActionTypes.END_LOADING;
}

type UIActions = UIBeginLoadingAction | UIEndLoadingAction;

export {
  UIActionTypes,
  UIBeginLoadingAction,
  UIEndLoadingAction,
  UIActions
};
