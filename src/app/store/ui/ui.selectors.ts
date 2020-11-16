import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UINode, UIState} from './ui.reducer';

const UIFeatureSelector = createFeatureSelector<UIState>(UINode);

const selectLoadingQueue = createSelector(
  UIFeatureSelector,
  (state): number => state.loadingQueue,
);

export {
  selectLoadingQueue
};
