// import { combineReducers } from "redux";
// import auth from "./auth";
// import message from "./message";
// export default combineReducers({
//   auth,
//   message,
// });

import { combineReducers } from 'redux';

import { authentication } from './auth.reducer';
// import { registration } from './registration.reducer';
// import { users } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    authentication,
//   registration,
//   users,
    alert
});

export default rootReducer;