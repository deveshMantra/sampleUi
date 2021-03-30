import { HomeActions, HomeActionType } from './home.action';
import { HomeState } from './home.model';


export function homeReducer(state: HomeState = new HomeState(), action: HomeActions):
    HomeState {
    switch (action.type) {
        case HomeActionType.GET_TOAST_DATA:
            return {
                ...state,
                toastData: action.payload
            };
        case HomeActionType.SET_APP_DATA:
            return {
                ...state,
                applicationData: action.payload
            };
        default:
            return state;
    }
}
