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

// endPoint list
export let updateEndpoints = (user) => {
    console.log('dispatch addEndPoint');
    return {
        type: 'ADD_ENDPOINT',
        user
    };
}