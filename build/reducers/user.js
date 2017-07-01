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
            updatedUser.email = action.email;
            return updatedUser;
        default:
        return state;
    }
}

export default user;

