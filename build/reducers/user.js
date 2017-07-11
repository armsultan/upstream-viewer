// a reducer takes in two things:
// 1. the action
// 2. copy of current state
// and then returns the new state
// it is a pure function

//User
let user = (state = {}, action) => {
    switch(action.type){
        case 'USER_LOGIN':
            let updatedUser = Object.assign({}, state);
            updatedUser.email = action.user.email;
            updatedUser.endPoints = action.user.endPoint;
            return updatedUser;
        case 'USER_LOGOUT':
            let logoutUser = Object.assign({}, state);
            logoutUser.email = ""; //reset element
            logoutUser.endPoints = []; //reset element
            return logoutUser;
        case 'ADD_ENDPOINT':
            let addEndpointUser = Object.assign({}, state);
            addEndpointUser.endPoints = action.user.endPoint;
            return addEndpointUser;
        case 'REMOVE_ENDPOINT':
            let removeEnpointUser = Object.assign({}, state);
            removeEnpointUser.endPoints.splice(action.endpointIndex, 1); //remove element
            return removeEnpointUser;
        default:
        return state;
    }
}

export default user;
