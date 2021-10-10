import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";

// import { productsReducer } from "./products-state";

// Create an object containing all the reducers: 
const reducers = combineReducers({ authState: authReducer });

// Create the store object:
const store = createStore(reducers); // composeWithDevTools() connects our Redux to Redux DevTool chrome extension

// Export the store:
export default store;