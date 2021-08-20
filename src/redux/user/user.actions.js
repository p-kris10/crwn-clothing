//functions that return object which the reducer expects it to be in
import {UserActionTypes} from './user.types';
export const setCurrentUser = user =>({
    type: UserActionTypes.SET_CURRENT_USER,
    payload : user
});