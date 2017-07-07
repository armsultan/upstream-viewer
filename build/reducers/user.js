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
            let updatedUserEndpoint = Object.assign({}, state);
            updatedUserEndpoint.endPoints = action.user.endPoint;
            return updatedUserEndpoint;
        default:
        return state;
    }
}

export default user;
