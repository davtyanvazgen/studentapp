import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import filterReducer from "./filterReducer";

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  filter: filterReducer
});
