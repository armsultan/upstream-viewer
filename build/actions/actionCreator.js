/**
 * actionCreator is the file that gives Redux a blueprint of what each event looks like.
 */

// User Login
// export let userLogin = (email) => {
//     console.log('dispatch userLogin');
//     return {
//         type: 'USER_LOGIN',
//         email
//     };
// }

export let userLogin = (user) => {
    console.log('dispatch userLogin');
    return {
        type: 'USER_LOGIN',
        user
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