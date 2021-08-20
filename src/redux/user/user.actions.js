//functions that return object which the reducer expects it to be in

export const setCurrentUser = user =>({
    type: 'SET_CURRENT_USER',
    payload : user
});