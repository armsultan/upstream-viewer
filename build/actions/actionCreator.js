/**
 * actionCreator is the file that gives Redux a blueprint of what each event looks like.
 */

// User Login
export let userLogin = (user) => {
    console.log('dispatch userLogin');
    return {
        type: 'USER_LOGIN',
        user
    };
}

export let userLogout = () => {
    console.log('dispatch userLogout');
    return {
        type: 'USER_LOGOUT'
    };
}

// update endPoint list (add)
export let updateEndpoints = (user) => {
    console.log('dispatch ADD_ENDPOINT');
    return {
        type: 'ADD_ENDPOINT',
        user
    };
}

// endPoint list
export let updateEndpointsRemove = (endpointIndex) => {
    console.log('dispatch REMOVE_ENDPOINT');
    return {
        type: 'REMOVE_ENDPOINT',
        endpointIndex
    };
}