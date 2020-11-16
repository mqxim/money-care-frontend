import {UIActions, UIActionTypes} from './ui.actions';

const UINode = 'UINode';

interface UIState {
  loadingQueue: number;
}

const initialState: UIState = {
  loadingQueue: 0,
};

function UIReducer(state = initialState, action: UIActions): UIState {
  switch (action.type) {
    case UIActionTypes.BEGIN_LOADING: {
      return {
        ...state,
        loadingQueue: state.loadingQueue + 1,
      };
    }
    case UIActionTypes.END_LOADING: {
      return {
        ...state,
        loadingQueue: state.loadingQueue > 0 ? state.loadingQueue - 1 : 0
      };
    }
    default: {
      return state;
    }
  }
}

export {
  UINode,
  UIState,
  UIReducer
};
