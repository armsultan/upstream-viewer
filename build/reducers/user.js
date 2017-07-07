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
        case 'ADD_ENDPOINT':
            let updatedUser1 = Object.assign({}, state);
            updatedUser1.endPoints = action.user.endPoint;
            return updatedUser1;
        case 'REMOVE_ENDPOINT':
            let updatedUser2 = Object.assign({}, state);
            updatedUser2.endPoints.splice(action.endpointIndex, 1); //remove element
            return updatedUser2;
        default:
        return state;
    }
}

export default user;
