/**
 * actionCreator is the file that gives Redux a blueprint of what each event looks like.
 */

// User Login
export let userLogin = (email) => {
    console.log('dispatch user');
    return {
        type: 'USER_LOGIN',
        email
    };
}