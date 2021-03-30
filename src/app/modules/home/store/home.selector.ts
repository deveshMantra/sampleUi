import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState } from './home.model';

export const getData = createFeatureSelector('homeReducer');

export const getToastDataState = createSelector(getData, (state: any = new HomeState()) => {
    return state.toastData;
});

export const getAppDataState = createSelector(getData, (state: any = new HomeState()) => {
    return state.applicationData;
});

