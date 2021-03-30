import { Action } from '@ngrx/store';

export enum HomeActionType {
    GET_TOAST_DATA = 'Home: GET_TOAST_DATA',
    SET_APP_DATA = 'home: SET_APP_DATA'
}

export class SetToastData implements Action {
    readonly type = HomeActionType.GET_TOAST_DATA;
    constructor(public payload: any) { }
}

export class SetApplicationData implements Action {
    readonly type = HomeActionType.SET_APP_DATA;
    constructor(public payload: any) { }
}



export type HomeActions =
    | SetToastData
    | SetApplicationData;