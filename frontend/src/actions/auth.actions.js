import { userConstants } from '../constants';
import { authService } from '../services';
import { alertActions } from '.';

export const authActions = {
    login,
    logout,
    singup,
};
function login(username, password, callback) {
    
    return dispatch => {
        dispatch(request({ username }));

        authService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    callback()
                },
                error => {
                    const message =
                    (error.response && error.response.data.message) ||
                    error.message ||
                    error.toString();
                    dispatch(failure(message));
                    dispatch(alertActions.error(message));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout(callback) {
    authService.logout();
    callback()
    return { type: userConstants.LOGOUT };
}

function singup(user, callback) {
    return dispatch => {
        dispatch(request(user));

        authService.singup(user)
            .then(
                user => { 
                    dispatch(success(user));
                    callback()
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    const message =
                    (error.response && error.response.data.message && error.response.data.message.message) ||
                    error.message ||
                    error.toString();
                    dispatch(failure(message));
                    dispatch(alertActions.error(message));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

// function getAll() {
//     return dispatch => {
//         dispatch(request());

//         userService.getAll()
//             .then(
//                 users => dispatch(success(users)),
//                 error => dispatch(failure(error))
//             );
//     };

//     function request() { return { type: userConstants.GETALL_REQUEST } }
//     function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     return dispatch => {
//         dispatch(request(id));

//         userService.delete(id)
//             .then(
//                 user => { 
//                     dispatch(success(id));
//                 },
//                 error => {
//                     dispatch(failure(id, error));
//                 }
//             );
//     };

//     function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
//     function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
//     function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
// }