import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./components/authentication/signin";
import Main from "./containers/main";
import RegistrationForm from "./components/authentication/registrationForm/";
import { Provider } from "react-redux";
import createReduxStore from "./store/createReduxStore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import firebase from "firebase";
const store = createReduxStore();

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

const App = () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <div>
        <Router>
          <Switch>
            <Route path="/registration" component={RegistrationForm} />
            <Route path="/signin" component={SignIn} />
            <Route path="/studentapp" component={Main} />
          </Switch>
        </Router>
      </div>
    </ReactReduxFirebaseProvider>
  </Provider>
);

export default App;
